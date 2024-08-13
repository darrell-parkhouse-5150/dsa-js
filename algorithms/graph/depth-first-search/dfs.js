export const initCallbacks = (cbs = {}) => {
    const initialCallback = cbs;
    const stubCb = () => {};

    const allowTraversalCb = (() => {
        const seen = {};

        return ({ nextNode }) => {
            if (!seen[nextNode.getKey()]) {
                seen[nextNode.getKey()] = true;
                return true;
            }

            return false;
        }
    })();

    initialCallback.allowTraversal = cbs.allowTraversal || allowTraversalCb;
    initialCallback.enterNode = cbs.enterNode || stubCb;
    initialCallback.leaveNode = cbs.leaveNode || stubCb;

    return initialCallback;
}

export const dfs_util = (graph, currNode, prevNode, cbs) => {
    cbs.enterNode({ currNode, prevNode });

    graph.getNeighbors(currNode).forEach((nextNode) => {
        if (cbs.allowTraversal({ prevNode, currNode, nextNode})) {
            dfs(graph, nextNode, currNode, cbs);
        }
    });

    cbs.leaveNode({ currNode, prevNode });
}

export const dfs = (graph, start, cbs) => {
    const prevNode = null;
    dfs_util(graph, start, prevNode, initCallbacks(cbs));
}