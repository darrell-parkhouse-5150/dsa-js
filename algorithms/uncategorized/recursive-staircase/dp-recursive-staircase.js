const dp_recursive_staircase = (stairsNum) => {
    if (stairsNum < 0)
        return 0;

    const steps = Array(stairsNum + 1).fill(0);

    steps[0] = 0;
    steps[1] = 1;
    steps[2] = 2;

    if (stairsNum <= 2) {
        return steps[stairsNum];
    }

    for (let currStep = 3; currStep <= stairsNum; currStep += 1) {
        steps[currStep] = steps[currStep - 1] + steps[currStep - 2];
    }

    return steps[stairsNum];

}