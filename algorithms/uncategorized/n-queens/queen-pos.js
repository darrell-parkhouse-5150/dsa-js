class QueenPosition {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    get leftDiagonal() {
        return this.row - this.col;
    }

    get rightDiagonal() {
        return this.row + this.col;
    }

    toString() {
        return `${this.row}, ${this.col}`;
    }
}