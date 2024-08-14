const compare = (a, b) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}

const showCompasison = (a, b) => {
    if (a.seasons < b.seasons) {
        return -1;
    } else if (a.seasons > b.seasons) {
        return 1;
    } else {
        0;
    }
}

const shuffle = () => {
    let input = this;

    for (let i = input.length - 1; i >= 0; i--) {
        let randomIdx = Math.floor(Math.random() * (i + 1));
        let itemIdx = input[randomIdx];

        input[randomIdx] = input[i];
        input[i] = itemIdx;
    }

    return input;
}