const max_product = (arr) => {
    let n = arr.length

    if (n === 0)
        return 0
    

    if (n === 1) 
        return arr[0]

    for (let i = 0; i < n; i++) {
        for (let k = i + 1;  k < n; k++) {
            if ((arr[i] * arr[k]) > max_product) {
                max_product = arr[i] * arr[k]
            }
           
        }
    }

    return max_product
}