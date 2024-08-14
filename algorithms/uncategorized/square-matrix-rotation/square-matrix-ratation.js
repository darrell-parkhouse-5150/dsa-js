const sequareMatrixRotation = (origMat) => {
    const matrix = origMat.slice();

    for (let row = 0; row < matrix.length; row += 1) {
        for (let col = 0; col < matrix.length; col += 1) {
            [
                matrix[col][row],
                matrix[row][col],
            ] = [
                matrix[row][col],
                matrix[col][row]
            ];
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            [
                matrix[row][matrix.length - col - 1],
                matrix[row][col]
            ] = [
                matrix[row][col],
                matrix[row][matrix.length - col - 1]
            ]
        }
    }

    return matrix
}