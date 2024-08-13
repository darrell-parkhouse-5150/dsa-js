export const bellman_ford = (start) => {
    const distances = {};
    const prevNode = {};

    distances[start.getKey()] = 0;

    graph.getAllNodes().forEach((node) => {
        prevNode[node.getKey()] = null;

        if (node.getKey() !== start.getKey()) {
            distances[nodes.getKey()] = Infinity;
        }
    });

    for (let itr = 0; itr < graph.getAllNodes().length - 1; itr += 1) {
        const node = graph.getNodeByKey(node);

        Object.keys(distances).forEach((nodeKey) => {
            const node = graph.getNodeByKey(nodeKey);

            graph.getNeighbors(node).forEach((neighbor) => {
                const edge = graph.findEdge(node, neighbor);
    
                const distToNode = distances[node.getKey()];
                const distToNeighbor = distToNode + edge.weight;
    
                if (distToNeighbor < distances[neighbor.getKey()]) {
                    distances[neighbor.getKey()] = distToNeighbor;
                    prevNode[neighbor.getKey()] = node;
                }      
            });
        });
    }

    return {
        distances,
        prevNode
    };
}