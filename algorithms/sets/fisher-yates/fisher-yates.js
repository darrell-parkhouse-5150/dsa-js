export const fisher_yates = (origArr) => {
    const arr = origArr.slice(0);

    for (let i = (arr.length - 1); i > 0; i -= 1) {
        const randomIdx = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]];
    }

    return arr;
}