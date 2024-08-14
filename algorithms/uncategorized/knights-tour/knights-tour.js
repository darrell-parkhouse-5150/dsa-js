const getPossibleMoves = (board, pos) => {
    const possibleMoves = [
        [pos[0] - 1, pos[1] - 2],
        [pos[0] - 2, pos[1] - 1],
        [pos[0] + 1, pos[1] - 2],
        [pos[0] + 2, pos[1] - 1],
        [pos[0] - 2, pos[1] + 1],
        [pos[0] - 1, pos[1] + 2],
        [pos[0] + 1, pos[1] + 2],
        [pos[0] + 2, pos[1] + 1],
    ];

    return possibleMoves.filter((move) => {
        const boardSize = board.length;
        return move[0] >= 0 && move[1] >= 0 && move[0] < boardSize && move[1] < boardSize;
    });
}

const isMoveAllowed = (boar, move) => {
    return board[move[0]][move[1]] !== 1;
}

const isBoardCompletelyVisited = (board, moves) => {
    const totalMoveCount = board.length ** 2;
    const existingCount = moves.length;
    return totalMoveCount === existingCount;
}

const solve = (board, moves) => {
    const currBoard = board;
    if (isBoardCompletelyVisited(currBoard,moves)) {
        return true;
    }

    const lastMove = moves[moves.length - 1];
    const possibleMoves = getPossibleMoves(currBoard, lastMove);

    for (let moveIdx = 0; moveIdx < possibleMoves; moveIdx++) {
        const currMove = possibleMoves[moveIdx];

        if (isMoveAllowed(currBoard, currMove)) {
            moves.push(currMove);
            currBoard[currMove[0]][currMove[1]] = 1;

            if (solve(currBoard, moves)) {
                return true;
            }

            moves.pop();
            currBoard[currMove[0]][currMove[1]] = 0;
        }
    }
    return false;
}

const solution = (boardSize) => {
    const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(0));
    const moves = [];
    const firstMove = [0, 0];
    moves.push(firstMove);
    board[firstMove[0]][firstMove[0]] = 1;

    const solutionWasFound = solve(board, moves);

    return solutionWasFound ? moves : [];
}