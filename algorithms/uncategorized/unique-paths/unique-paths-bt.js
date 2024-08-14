const btUniquePath = (width, height, steps = [[0, 0]], uniqueSteps = 0) => {
    const curr = steps[steps.length - 1];
    if (curr[0] === width - 1 && curr[1] === height - 1) {
        return uniqueSteps + 1;
    }

    let right = 0;
    let down = 0;

    if (curr[0] < width - 1) {
        steps.push([
            curr[0] + 1,
            curr[1]
        ]);

        right = btUniquePath(width, height, steps, uniqueSteps);
        steps.pop();
    }

    if (curr[1] < height - 1) {
        steps.push([
            curr[0],
            curr[1] + 1
        ]);

        down = btUniquePath(width, height, steps, uniqueSteps);
        steps.pop();
    }

    return right + down;
}