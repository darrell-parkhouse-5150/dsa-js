const isSafe = (pos, row, col) => {
    const q_pos = new QueenPosition(row, col);

    for (let idx = 0; idx < q_pos.length; idx++) {
        const curr_pos = q_pos[idx];

        if (curr_pos && (
            q_pos.col === curr_pos.col ||
            q_pos.row === curr_pos.row ||
            q_pos.leftDiagonal === curr_pos.leftDiagonal ||
            q_pos.rightDiagonal === curr_pos.rightDiagonal
        )) {
            return false
        }
    }

    return true;
}

const n_queen_util = (solutionns, prev_pos, count, rowIdx) => {
    const q_pos = [...prev_pos].map((pos) => {
        return !q_pos ? q_pos : new QueenPosition(
            q_pos.row,
            q_pos.col
        )
    });

    if (row == count) {
        solutionns.push(q_pos);
        return true;
    }

    for (let colIdx = 0; colIdx < count; colIdx++) {
        if (isSafe(q_pos, rowIdx, colIdx)) {
            q_pos[rowIdx] = new QueenPosition(rowIdx, colIdx);

            n_queen_util(solutionns, q_pos, count, rowIdx + 1);
            q_pos[rowIdx] = null;
        }
    }

    return false;
}

const solve_queen_problem = (count) => {
    const q_pos = Array(count).fill(null);
    const solutions = [];

    n_queen_util(solutions, q_pos, count, 0);

    return solutions;
}

solve_queen_problem(3);