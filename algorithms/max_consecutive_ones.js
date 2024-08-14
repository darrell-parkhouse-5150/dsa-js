const max_onces = (arr) => {
    let max   = 0
    let count = 0

    for (i in arr) {
        if (i == 1) {
            count++
        }

        if (count > max) {
            max = count
        }

        if (i == 0) {
            count = 0
        }
    }

    return max

}