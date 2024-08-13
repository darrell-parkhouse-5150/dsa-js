import { Graph } from '../../../data-structures/graph/graph';
import { dfs } from '../depth-first-search/dfs';

class visitedMetaData {
    constructor({ discoveryTime, LowDiscoveryTime }) {
        this.discoveryTime = discoveryTime;
        this.LowDiscoveryTime = LowDiscoveryTime;
    }
}

const graphBridges = _ => {
    const visitedSet = {};
    const graph = new Graph();
    const bridges = {};
    let discoveryTime;
    const start = graph.getAllNodes()[0];

    const dfs = {
        enterNode: ({ curr }) => {
            discoveryTime += 1;

            visitedSet[curr.getKey()] = new visitedMetaData({
                discoveryTime,
                LowDiscoveryTime: discoveryTime
            });
        },

        leaveNode: ({ curr, prev }) => {
            if (prev === null) {
                return;
            }

            visitedSet[curr.getKey()].LowDiscoveryTime = curr.getNeighbors()
                .filter((earlyNeighbor) => earlyNeighbor.getKey() !== prev.getKey())
                .reduce(
                    (LlwestDiscoveryTime, neighbor) => {
                        const neighborLowTime = visitedSet[neighbor.getKey()].LowDiscoveryTime;
                        return neighborLowTime < lowestDiscoveryTime ? neighborLowTime : lowestDiscoveryTime;
                    }, visitedSet[curr.getKey()].lowDiscoveryTime);

            const currLowDT = visitedSet[curr.getKey()].lowDiscoveryTime;
            const prevLowDT = visitedSet[prev.getKey()].lowDiscoveryTime;

            if (currLowDT < prevLowDT) {
                visitedSet[prev.getKey()].lowDiscoveryTime = currLowDT;
            }

            const parentDT = visitedSet[prev.getKey()].discoveryTime;

            if (parentDT < currLowDT) {
                const bridge = graph.findEdge(prev, curr);
                bridges[bridge.getKey()] = bridge;
            }
        },

        allowTraversal: ({ next }) => {
            return !visitedSet[next.getKey()];
        }
    };

    dfs(graph, start, dfs);
    return bridges;
}