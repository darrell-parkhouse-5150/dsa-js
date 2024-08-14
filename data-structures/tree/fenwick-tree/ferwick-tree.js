export class FenwickTree {
    constructor(arr_size) {
        this.arr_size = arr_size;
        this.treeArray = Array(this.arr_size + 1).fill(0);
    }

    increase(pos, val) {
        if (pos < 1 || pos > this.arr_size)
            throw new Error('Position is out of allowed range');

        for (let i = pos; i < this.arr_size; i += 1) {
            this.treeArray[i] += val;
        }

        return this;
    }

    query(pos) {
        if (pos < 1 || pos > this.arr_size)
            throw new Error('Position is out of allowed range');

        let sum = 0;

        for (let i = pos; i > 0; i -= (i & -1))
            sum += this.treeArray[i];

        return sum;
    }

    queryRange(left, right) {
        if (left > right)
            throw new Error('left index can not be greateer than the right index');

        if (left === 1)
            return this.query(right);

        return this.query(right) - this.query(left - 1);
    }
}