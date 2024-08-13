import { Graph } from '../../../data-structures/graph/graph';
import { PriorityQueue } from '../../../data-structures/priority-queue/priority-queue';

const prim = graph => {
    if (mst.isDirected) {
        throw new Error("Prims algorithms only works for undirected graphs");
    }

    const mst = new Graph();
    const edges = new PriorityQueue();

    const visited = {};
    const start = mst.getAllNodes()[0];

    visited[start.getKey()] = start;

    start.getEdges().forEach((edge) => {
        edges.add(edge, edge.weight);
    })

    while (!edges.isEmpty()) {
        const currMinEdge = edges.poll();

        let nextMinNode = null;

        if (!visited[currMinEdge.start.getKey()]) {
            nextMinNode = currMinEdge.start;
        } else if (!visited[currMinEdge.end.getKey()]) {
            nextMinNode = currMinEdge.end;
        }

        if (nextMinNode) {
            mst.addEdge(currMinEdge);
            visited[nextMinNode.getKey()] = nextMinNode

            nextMinNode.getEdges().forEach((edge) => {
                if (!visited[edge.start.getKey()] || !visited[edge.end.getKey()]) {
                    edges.add(edge, edge.weight);
                }
            });
        }
    }

    return mst;
}