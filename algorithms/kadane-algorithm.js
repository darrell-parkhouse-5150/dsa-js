const max_sum = (arr) => {
    max_so_far = [0];
    curr_max = [0];

    for (i = 0; i < arr.length; i++) {
        curr_max = Math.max(arr[i], curr_max + arr[i]);
        max_so_far = Math.max(max_so_far, curr_max);

    }

    return max_so_far
}