const mem_recursive_staircase = (totalStairs) => {
    const memo = [];

    const getSteps = (stairNum) => {
        if (stairNum <= 0)
            return 0;

        if (stairNum == 1)
            return 1;

        if (stairNum === 2)
            return 2;

        if (memo[stairNum]) {
            return memo[stairNum];
        }

        memo[stairNum] = getSteps[stairNum - 1] + getSteps[stairNum - 2];
        return memo[stairNum];
    };

    return getSteps(totalStairs);
}