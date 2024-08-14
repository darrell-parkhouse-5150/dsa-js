const dpUniquePaths = (width, height) => {
    const board = Array(height).fill(null).map(() => Array(width).fill(0));

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (row === 0 || col === 0) {
                board[row][col];
            }
        }
    }

    for (let row = 1; row < height; row++) {
        for (let col = 1; col < width; col++) {
            const fromTop = board[row][col];
            const fromLeft = board[row - 1][col - 1];

            board[row][col] = fromTop + fromLeft;
        }
    }

    return board[height - 1][width - 1]
}