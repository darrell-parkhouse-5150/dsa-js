import { Graph } from '../../../data-structures/graph/graph';
import { graphBridges } from '../bridges/graph-bridges';

const eulerianPath = _ => {
    const eulerianPathNodes = [];
    const evenRankNodes = {};
    const oddRankNodes = {};
    const notVisitedEdges = {};

    const graph = new Graph();

    graph.getAllEdges().forEach((node) => {
        notVisitedEdges[node.getKey()] = node;
    });

    graph.getAllNodes().forEach((node) => {
        if (node.getDegrees() % 2) {
            oddRankNodes[node.getKey()] = node;
        } else {
            evenRankNodes[node.getKey()] = node;
        }
    });

    const isCircuit = !Object.values(oddRankNodes).length;

    if (!isCircuit && Object.values(oddRankNodes).length !== 2) {
        throw new Error("Eulerian path must contain two odd-ranked nodes");
    }

    let start = null;

    if (isCircuit) {
        const evenNodeKey = Object.keys(evenRankNodes)[0];
        start = evenRankNodes[evenNodeKey];
    } else {
        const oddNodeKey = Object.keys(oddRankNodes)[0];
        start = oddRankNodes[oddNodeKey];
    }

    let curr = start;

    while (Object.values(notVisitedEdges).length) {
        eulerianPathNodes.push(curr);
        const bridges = graphBridges(graph);

        const currEdges = curr.getEdges();
        let edgeToDelete = null;

        if (currEdges.length === 1) {
            [edgeToDelete] = currEdges;
        } else {
            [edgeToDelete] = currEdges.filter((edge) => !bridges[edge.getKey()]);
        }

        if (curr.getKey() == edgeToDelete.start.getKey()) {
            curr = edgeToDelete.end;
        } else {
            curr = edgeToDelete.start;
        }

        delete notVisitedEdges[edgeToDelete.getKey()];

        if (Object.values(notVisitedEdges).length === 0) {
            eulerianPathNodes.push(curr);
        }

        graph.deleteEdge(edgeToDelete);
    }

    return eulerianPathNodes;
}

eulerianPath();