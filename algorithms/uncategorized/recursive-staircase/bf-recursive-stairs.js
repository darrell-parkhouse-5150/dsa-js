const bf_recursive_stairs = (stairNum) => {
    if (stairNum <= 0) {
        return 0;
    }

    if (stairNum === 2) {
        return 2;
    }

    return bf_recursive_stairs(stairNum - 1) + bf_recursive_stairs(stairNum - 2)
}