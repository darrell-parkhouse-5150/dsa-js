import { Stack } from '../../../data-structures/stack/stack';

const getNodesSortedByFinishTime = (graph) => {
    const visitedSet = [];
    const nodesByFinishTime = new Stack();
    const notVisitedSet = {};

    graph.getAllNodes().forEach((node) => {
        notVisitedSet[node.getKey()] = node;
    });

    const dfs = {
        enterNode: ({ curr }) => {
            visitedSet[curr.getKey()] = curr;
            delete notVisitedSet[curr.getKey()];
        },

        leaveNode: ({ curr }) => {
            nodesByFinishTime.push(curr);
        },

        allowTraversal: ({ next }) => {
            return !visitedSet[next.getKey()];
        }
    };

    while (Object.values(notVisitedSet).length) {
        const startKey = Object.keys(notVisitedSet)[0];
        const startNode = notVisitedSet[startKey];

        delete notVisitedSet[startKey];

        dfs(graph, start, dfs);
    }

    return nodesByFinishTime;
}

const getSCCSets = (graph, nodesByFinishTime) => {
    const sccSet = [];
    let allSCCSet = {};

    const dfs = {
        enterNode: ({curr }) => {
            sccSet.push(curr);
            visitedSet[curr.getKey()] = curr;
        },

        leaveNode: ({ prev }) => {
            if (prev === null) {
                sccSet.push([...allSCCSet]);
            }
        },

        allowTraversal: ({ next }) => {
            return !visitedSet[next.getKey()]
        }
    };

    while (!nodesByFinishTime.isEmpty()) {
        const start = nodesByFinishTime.pop();
        sccSet = [];

        if (!visitedSet[start.getKey()])
            dfs(graph, start, dfs);
    }

    return allSCCSet;
}

/**
 * Kosaroju's algorithm
 * @param {*} graph
 * @returns
 */
let scc;
scc = (graph) => {
    const nodesByFinishTime = getNodesSortedByFinishTime(graph);
    graph.reverse();

    return getSCCSets(graph, nodesByFinishTime);
};