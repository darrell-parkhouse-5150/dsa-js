const min_swaps = (arr, k) => {
    /**
     * first find out how many elements in the array that are less than or equal to k
     */
    let count = 0

    for (let i = 0; i < arr.length; i++) {
        if (i < k)
            count++
    }

    /**
     * this count defines a window = inside this window all our elements should be placed
     * find the count of bad elements, these elements are more than k and that will be our
     * starting answer as we will have to swap them out
     */
    let bad = 0

    for (let i = 0; i < count; i++) {
        if (arr[i] > k) {
            bad++
        }
    }

    let ans = bad
    let c = count

    for (let i = 0; i < arr.length; i++) {
        if (c === arr.length) {
            break
        }

        if (arr[i] > k) {
            bad-- // because we have moved the bad element out of the window
        }

        if (a[c] > k) {
            bad++
        }

        ans = Math.min(bad, ans)
    }

    console.log('answer: ', ans)
}

let _arr = [2, 7, 8, 5, 8, 9, 7, 5]
console.log(min_swaps(_arr))