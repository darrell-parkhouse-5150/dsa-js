import { dfs } from "../depth-first-search/dfs";

const detectUndirectedCycle = (graph) => {
    let cycle = null;

    const visitedNodes = {};
    const parents = {};

    const callbacks = {
        allowTraversal: ({ curr, next }) => {
            if (cycle)
                return false;

            const currNodeParent = parents[curr.getKey()];
            const currNodeParentKey = currNodeParent ? currNodeParent.getKey() : null;

            return currNodeParentKey !== next.getKey();
        },

        enterNode: ({ curr, prev }) => {
            if (visitedNodes[curr.getKey()]) {
                cycle = {};

                let currCycleNode = curr;
                let prevCycleNode = prev;

                while (prevCycleNode.getKey() !== curr.getKey()) {
                    cycle[currCycleNode.getKey()] = prevCycleNode;
                    currCycleNode = prevCycleNode;
                    prevCycleNode = parents[prevCycleNode.getKey()];
                }

                cycle[currCycleNode.getKey()] = prevCycleNode;
            } else {
                visitedNodes[curr.getKey()] = curr;
                parents[curr.getKey()] = prev;
            }
        }
    };

    const start = graph.getAllNodes()[0];
    dfs(graph, start, callbacks);

    return cycle;
}

detectUndirectedCycle()