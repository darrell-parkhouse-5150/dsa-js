export const isPowerOfTwo = (number) => {
    if (number < 1)
        return false;

    let divided = number;

    while (divided !== 1) {
        if (divided % 2 !== 0) 
            return false;

        divided /= 2;
    }

    return true;
}