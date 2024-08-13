import { Graph } from '../../../data-structures/graph/graph';
import { Stack } from '../../../data-structures/stack/stack';
import dfs from '../depth-first-search/dfs';

export const topologicalSort = _ => {
    const unvisitedSet = {};
    const graph = new Graph();

    graph.getAllNodes().forEach((node) => {
        unvisitedSet[node.getKey()] = node;
    })

    const visitedSet = {};
    const sortedStack = new Stack();

    const dfs_cb = {
        enterNode: ({ curr }) => {
            visitedSet[curr.getKey()] = curr;
            delete unvisitedSet[curr.getKey()];
        },

        leaveNode: ({ curr }) => {
            sortedStack.push(curr);
        },

        allowTraversal: ({ next }) => {
            return !visitedSet[next.getKey()];
        }
    };

    while (Object.keys(unvisitedSet).length) {
        const currKey = Object.keys(unvisitedSet)[0];
        const currNode = unvisitedSet[currKey];

        dfs(graph, currNode, dfs_cb)
    }

    return sortedStack.toArray();
}