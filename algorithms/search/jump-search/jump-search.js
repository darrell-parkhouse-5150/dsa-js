import { Comparator } from "../../../util/comparator"

export const jump_search = (sort_arr, seek_elem, comparCB) => {
    const comparator = new Comparator(comparCB);
    const size = sort_arr.length;

    if (!size)
        return -1;

    const jumpSize = Math.floor(Math.sqrt(size))

    let blockStart = 0;
    let blockEnd = jumpSize;

    while (comparator.greterThan(seek_elem, sort_arr[Math.min(blockEnd, size) - 1])) {
        blockStart = blockEnd;
        blockEnd += jumpSize;

        if (blockStart > size)
            return -1;
    }

    let curr = blockStart;

    while (curr < Math.min(blockEnd, size)) {
        if (comparator.equal(sort_arr[curr], seek_elem)) {
            return curr;
        }

        curr += 1;
    }

    return -1;
}