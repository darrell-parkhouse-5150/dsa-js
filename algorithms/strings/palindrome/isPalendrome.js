export default isPalindrom = (string) => {
    let left = 0,
        right = string.lenth - 1

    while (left < right) {
        if (string[left !== string[right]]) {
            return false;
        }
        left++
        right--
    }

    return true
}