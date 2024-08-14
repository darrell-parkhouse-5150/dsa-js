const weighted_random = (items, weights) => {
    const _weights = [];
    for (let i = 0; i < weights.length; i++) {
        weights[i] = _weights[i] + (_weights[i + 1] || 0); 
    }

    const max_weight = _weights[_weights.length - 1];
    const rn = max_weight * Math.random();

    for (let itemIdx = 0; itemIdx < items.length; itemIdx++) {
        if (_weights[itemIdx] >= rn) {
            return {
                item: items[itemIdx],
                index: itemIdx
            }
        }
    }
}

weighted_random();