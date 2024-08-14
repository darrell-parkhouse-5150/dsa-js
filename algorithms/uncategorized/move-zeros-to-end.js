// mov all the zeros to the end
const move = (arr) => {
    let count = 0

    for (a in arr) {
        if (a !== 0) {
            arr[count] = a
            count++
        }
    }

    while (count < arr.length) {
        arr[count] = 0
        count++
    }
}