export const findAllPaths = (start, paths = [], path = []) => {
    const curr = [...path];
    curr.push(start);

    const visitedSet = curr.reduce((acc, node) => {
        const updatedAcc = { ...acc };
        updatedAcc[node.getKey()] = node;
        return updatedAcc;
    }, {});

    const unvisitedNeighbors = start.getNeigbors().filter((neighbor) => {
        return !visitedSet[neighbor.getKey()];
    })

    if (!unvisitedNeighbors.length) {
        paths.push(curr);
        return paths;
    }

    for (let n_idx = 0; n_idx < unvisitedNeighbors.length; n_idx += 1) {
        const currUnvisitedNeighbor = unvisitedNeighbors[n_idx];
        findAllPaths(currUnvisitedNeighbor, paths, curr);
    }

    return paths;
}

export function getCycleWeight(adj_mat, nodeIdx, cycle) {
    let weight = 0;

    for (let c_idx = 1; c_idx < cycle.length; c_idx += 1) {
        const fromNode = cycle[c_idx - 1];
        const toNode = cycle[c_idx];
        const fromNodeIdx = nodeIdx[fromNode.getKey()];
        const toNodeIdx = nodeIdx[toNode.getKey()];

        weight += adj_mat[fromNodeIdx][toNodeIdx];
    }

    return weight;
}

export const bf_tsp = (graph) => {
    const start = graph.getAllNodes()[0];
    const allPossiblePaths = findAllPaths(start);

    const allPossibleCycles = allPossiblePaths.filter((path) => {
        const lastNode = path[path.length - 1];
        const lastNodeNeighbors = lastNode.getNeigbors();

        return lastNodeNeighbors.includes(start);
    });

    const adj_mat = graph.getAdjMat();
    const nodesIdx = graph.getNodeIndices();

    let salesPath = [];
    let salePathWeight = null;

    for (let c_idx = 0; c_idx < allPossibleCycles.length; c_idx++) {
        const curr = allPossibleCycles[c_idx];
        const currWeight = getCycleWeight(adj_mat, nodeIdx, curr);

        if (salePathWeight === null || curr < salePathWeight) {
            salesPath = curr;
            salePathWeight = currWeight;
        }
    }

    return salesPath;
}