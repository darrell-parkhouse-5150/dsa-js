import { Comparator } from "../../../util/comparator"

export const binary_search = (sorted_arr, seek_elem, compFn) => {
    const comp = new Comparator(compFn);

    let start = 0;
    let end = sorted_arr.length - 1;

    while (start <= end) {
        const middle = start + Math.floor((end - start) / 2);

        if (comp.equal(sorted_arr[middle], seek_elem)) {
            return middle;
        }

        if (comp.lessThan(sorted_arr[middle], seek_elem)) {
            start = middle + 1
        } else {
            end = mid - 1;
        }
    }

    return -1;
}