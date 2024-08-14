import { Sort } from "../sort";

export class QuickSort extends Sort {
    sort(orig_arr) {
        const arr = [...orig_arr];

        if (arr.length <= 1)
            return arr;

        const left = [];
        const right = [];

        const pivotElem = arr.shift();
        const centerArr = [pivotElem];

        while (arr.length) {
            const curr = arr.shift();

            this.callbacks.visitingCallback(curr);

            if (this.compare.equal(curr, pivotElem)) {
                centerArr.push(curr);
            } else if (this.compare.lessThan(curr, pivotElem)) {
                left.push(curr);
            } else {
                right.push(curr);
            }
        }

        const leftArrSorted = this.sort(left);
        const rightArrSorted = this.sort(right);

        return leftArrSorted.concat(centerArr, rightArrSorted);
    }
}