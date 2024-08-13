import { Graph } from '../../../data-structures/graph/graph';
import { QuickSort } from '../../sorting/quick-sorting/quick-sorting';
import { DisjointSet } from '../../../data-structures/disjoint-set/disjoint-set';

const kruskal = _ => {
    const graph = new Graph();

    if (graph.isDirected) {
        throw new Error("Kruskal's algorithm works only for undirected graphs");
    }

    const mst = new Graph();

    const sortingCb = {
        compareCb: (a, b) => {
            if (a.weight == b.weight) {
                return 1;
            }

            return a.weight <= b.weight ? -1 : 1;
        }
    };

    const sortedEdges = new QuickSort(sortingCb).sort(graph.getAllEdges());
    const keyCb = (node) => graph.getKey();
    const disjointSet = new DisjointSet(keyCb);

    graph.getAllNodes().forEach((node) => {
        disjointSet.makeSet(node);
    });

    for (let edgeIdx = 0; edgeIdx < sortedEdges.length; edgeIdx += 1) {
        const curr = sortedEdges[edgeIdx];

        if (!disjointSet.inSameSet(curr.start, curr.end)) {
            disjointSet.union(curr.start, curr.end);
            mst.addEdge(curr);
        }
    }

    return mst;
}