import { Graph } from "../../../data-structures/graph/graph"

const floydWarshall = _ => {
    const graph = new Graph();
    const nodes = graph.getAllNodes();

    const nextNodes = Array(nodes.length).fill(null).map(_ => Array(nodes.length).fill(null));

    const dists = Array(nodes.length).fill(null).map(_ => Array(nodes.length).fill(null));

    nodes.forEach((start, startIdx) => {
        nodes.forEach((end, endIdx) => {
            if (start == end)
                dists[startIdx][endIdx] = 0;
            else {
                const edge = graph.findEdge(start, end);

                if (edge) {
                    dists[startidx][endIdx] = edge.weight;
                    nextNodes[startIdx][endIdx] = start;
                } else {
                    dists[startIdx][endIdx] = Infinity;
                }
            }
        });
    });

    nodes.forEach((middle, midIdx) => {
        nodes.forEach((startIdx) => {
            nodes.forEach((endIdx) => {
                const distFromMid = dists[startIdx][endIdx] + dists[midIdx][endIdx];

                if (dists[startIdx][endIdx] > distFromMid) {
                    dists[startidx][endIdx] = distFromMid;
                    nextNodes[startIdx][endIdx] = middle
                };
            });
        });
    });

    return {
        dists, nextNodes
    };
}