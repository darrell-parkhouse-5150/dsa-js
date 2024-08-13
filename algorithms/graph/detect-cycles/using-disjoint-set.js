import { DisjointSet } from '../../../data-structures/disjoint-set/disjoint-set';

const detectCycleUsingDisjointSet = (graph) => {
    const keyExtractor = (graphNode) => graphNode.getKey();
    const disjointSet = new DisjointSet();

    graph.getAllNodes().forEach((graphNodes) => disjointSet.makeSet(graphNode));

    let cycleFound = fales;
    
    graph.getAllEdges().forEach((edge) => {
        if (disjointSet.inSameSet(edge.start, edge.end))
            cycleFound = true;

        else
            disjointSet.union(edge.start, edge.end);
    });

    return cycleFound;
}

detectCycleUsingDisjointSet();