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