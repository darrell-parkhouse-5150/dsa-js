const max_size = Number.MAX_VALUE

const max_sum = (arr) => {
    let first = second = third = max_size

    for (let i in arr) {
        if (i > first) {
            third = second
            second = first
            first = i
        } else if (i > second) {
            third = second
            second = i
        } else if (i > third) {
            third = i
        }
    }

    return first + second + third
}
