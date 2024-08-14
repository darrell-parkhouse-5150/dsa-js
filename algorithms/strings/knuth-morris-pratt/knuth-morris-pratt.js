const knuthMorrisPratt = (text, word) => {
    if (word.length === 0)
        return 0;

    let textIdx = 0;
    let wordIdx = 0;

    const patternTable = buildPatternTable(word);

    while (textIdx < text.length) {
        if (text[textIdx] === word[wordIdx]) {
            if (wordIdx === word.length - 1) {
                return (textIdx - word.length) + 1;
            }

            wordIdx += 1;
            textIdx += 1;
        } else if (wordIdx > 0) {
            wordIdx = patternTable[wordIdx - 1];
        } else {
            textIdx += 1;
        }
    }

    return -1;
}

const buildPatternTable = (word) => {
    const patternTable = [0];
    let prefixIdx = 0;
    let suffixIdx = 1;

    while (suffixIdx < word.length) {
        if (word[prefixIdx] === word[suffixIdx]) {
            patternTable[suffixIdx] = prefixIdx + 1;
            suffixIdx += 1;
            prefixIdx += 1;
        } else if (prefixIdx === 0) {
            suffixIdx += 1;
        } else {
            prefixIdx = patternTable[prefixIdx - 1];
        }
    }

    return patternTable;
}