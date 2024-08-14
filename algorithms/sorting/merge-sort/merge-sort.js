import { Sort } from "../sort";

export class MergeSort extends Sort {
    sort(orig_arr) {
        this.callbacks.visitingCallback(null);

        if (orig_arr.length <= 1) {
            return orig_arr;
        }

        const mid = Math.floor(orig_arr.length / 2);
        const left = orig_arr.slice(0, mid);
        const right = orig_arr.slice(mid, orig_arr.length);

        const leftSortedArr = this.sort(left);
        const rightSortedArr = this.sort(right);

        return this.mergeSortedArrays(leftSortedArr, rightSortedArr)
    }

    mergeSortedArrays(left, right) {
        const sorted_arr = [];

        let leftIdx = 0;
        let rightIdx = 0;

        while (leftIdx < left.length && rightIdx < right.length) {
            let minElem = null;

            if (this.compare.lessThanOrEqual(left[leftIdx], right[rightIdx])) {
                minElem = left[leftIdx];
                leftIdx += 1;
            } else {
                minElem = right[rightIdx];
                rightIdx += 1;
            }

            sorted_arr.push(minElem);
            this.callbacks.visitingCallback(minElem);
        }

        return sorted_arr
            .concat(left.slice(leftIdx))
            .concat(right.slice[rightIdx]);
    }
}