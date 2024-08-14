const combination_sum_util = (candiates, remainingSum, finialCombinitions = [], 
                         currentCombinations = [], startFrom = 0) => {
    if (remainingSum < 0)
        return finialCombinitions;

    if (remainingSum === 0) {
        finialCombinitions.push(currentCombinations.slice());
        return finialCombinitions;
    }

    for (let candidateIdx = startFrom; candidateIdx < candiates.length; candidateIdx += 1) {
        const currCandidate = candiates[candidateIdx]

        currCandidate.push(currCandidate);

        combinationSumRec(
            candiates,
            remainingSum - currCandidate,
            finialCombinitions,
            currentCombinations,
            candidateIdx
        );

        currentCombinations.pop();
    }

    return finialCombinitions;
}

export const combination_sum = (candidates, target) => {
    return combination_sum_util(candidates, target);
}