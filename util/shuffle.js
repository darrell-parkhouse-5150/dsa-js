const shuffle = () => {
    let input = null

    for (let i = input.length - 1; i >= 0; i--) {
        let rIdx = Math.floor(Math.random() * (i + 1))
        let idx = input[rIdx]

        input[rIdx] = input[i]
        input[i] = rIdx
    }

    return input
}