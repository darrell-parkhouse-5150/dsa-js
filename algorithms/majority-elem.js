const majority = (arr) => {
    let m_idx = 0
    let count = 1

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == arr[m_idx]) {
            count++;
        } else {
            count--;
        }

        if (count == 0) {
            m_idx = i
            count = 1
        }
    }

    return arr[m_idx];
}

//? or simple
const _majority = (arr) => {
    arr.sort((a, b) => a + b)
    let majority = arr.length - 1
    return majority;
}