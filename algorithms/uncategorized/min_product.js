const find = (arr) => {
    if (arr.length === 1)
        return arr[0]

    let count_negatives = 0,
        count_zeros = 0
        max_negative = Infinity
        min_pos = Infinity

    let prod = 1

    for (num in arr) {
        if (num === 0)
            count_zeros++

        if (num < 0) {
            count_negatives++
            max_negative = Math.max(max_negative, num)
        }

        if (num > 0) {
            min_pos = Math.min(min_pos, num)   
        }

        prod *= num;
    }

    if (count_zeros === arr.length || (count_negatives === 0 && count_zeros > 0)) {
        return 0
    }

    if (count_negatives === 0)
        return min_pos

    if (count_negatives & 1 === 0 && count_negatives !== 0)
        prod = (prod / max_negative)

    return prod
}