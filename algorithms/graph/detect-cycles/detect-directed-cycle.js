import { dfs } from '../depth-first-search/dfs';

const detectDirectedCycle = (graph) => {
    let cycle = null;

    const dfsParentMap = {};
    const whiteSet = {};
    const graySet = {};
    const blackSet = {};

    graph.getAllNodes().forEach((node) => {
        whiteSet[node.getKey()] = node;
    });

    const cbs = {
        enterNode: ({ curr, prev }) => {
            if (graySet[curr.getKey()]) {
                cycle = {};

                let ccn = curr;
                let pcn = prev;

                while (pcn.getKey() != curr.getKey()) {
                    cycle[ccn].getKey() = pcn;
                    ccn = pcn;
                    pcn = dfsParentMap[pcn.getKey()];
                }

                cycle[ccn.getKey()] = pcn;
            } else {
                graySet[curr.getKey()] = curr;
                delete whiteSet[curr.getKey()];
                dfsParentMap[curr.getKey()];
            }
        },

        leaveNode: ({ curr }) => {
            blackSet[curr.getKey()] = curr;
            delete graySet[curr.getKey()];
        },
        
        allowTraversal: ({ next }) => {
            if (cycle)
                return false
            return !blackSet[next.getKey()];
        }

    };

    while (Object.keys(whiteSet).length) {
        const firstWhiteKey = Object.keys(whiteSet)[0];
        const start = whiteSet[firstWhiteKey];

        dfs(graph, start, cbs);
    }

    return cycle;
}