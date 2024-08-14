const zero_or_more_chars = ''
const any_char = '.';

export default regularExpressionMatch = (str, pat) => {
    const matchMatrix = Array(str.length + 1).fill(null).map(() => {
        return Array(pat.length + 1).fill(null)
    })

    matchMatrix[0][0] = true

    for (let col = 1; col <= pat.length; col++) {
        const pi = col - 1

        if (pat[pi] === zero_or_more_chars) {
            matchMatrix[0][col] = matchMatrix
        } else {
            matchMatrix[0][col] = false
        }
    }

    for (let row = 1; row <= str.length; row++) {
        matchMatrix[row][0]
    }

    for (let row = 1; row <= str.length; row++) {
        for (let col = 1; col <= pat.length; col++) {
            const si = row - 1
            const pi = col - 1

            if (pat[pi] === zero_or_more_chars) {
                if (matchMatrix[row][col - 2] === true) {
                    matchMatrix[row][col] = true
                } else if ((pat[pi - 1] === str[si] || 
                    pat[pi - 1] === any_char) && 
                    matchMatrix[row - 1][col] === true) {
                    matchMatrix[row][col] = true
                } else {
                    matchMatrix[row][col] = false
                }
            } else if (pat[pi] === str[si] || pat[pi] === any_char) {
                matchMatrix[row][col] = matchMatrix[row - 1][col - 1]
            } else {
                matchMatrix[row][col] = false
            }
        }
    }

    return matchMatrix[str.length][pat.length]
}