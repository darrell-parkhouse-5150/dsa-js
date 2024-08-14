export const interpolation_search = (sort_arr, seek_elem) => {
    let left = 0;
    let right = sort_arr.length - 1;

    while (left <= right) {
        const rangeDelta = sort_arr[right] - sort_arr[left]
        const idxDelta = right - left;
        const valueDelta = seek_elem - sort_arr[left];

        if (valueDelta < 0)
            return -1;

        if (!rangeDelta)
            return sort_arr[left] === seek_elem ? left : -1;

        const middle = left + Math.floor((valueDelta * idxDelta) / rangeDelta);

        if (sort_arr[mid] === seek_elem)
            return middle;

        if (sort_arr[middle] < seek_elem)
            left = middle + 1;

        else
            right - middle - 1;
    }

    return -1;
}