import {Graph} from '../../../data-structures/graph/graph';
import {GraphNode} from "../../../data-structures/graph/graph-node";

const isSafe = (adj_matrix, nodeIdx, cycle, nodeCandidate) => {
    const endNode = cycle[cycle.length - 1];
    const candidateNodeAdjIdx = nodeIdx[nodeCandidate.getKey()];
    const endNodeAdjIdx = nodeIdx[endNode.getKey()];

    if (adj_matrix[endNodeAdjIdx][candidateNodeAdjIdx] === Infinity)
        return false;

    const candidateDup = cycle.find((node) => node.getKey() === nodeCandidate.getKey());
    return !candidateDup;
}

const isCycle = (adj_mat, nodeIdx, cycle) => {
    const start = cycle[0];
    const end = cycle[cycle.length - 1];
    const startNodeAdjIdx = nodeIdx[start.getKey()];
    const endNodeAdjIdx = nodeIdx[end.getKey()];

    return adj_mat[endNodeAdjIdx][startNodeAdjIdx] !== Infinity;
}

const hamiltonian_cycle_util = ({ adj_mat, nodes, nodeIdx, cycles, cycle }) => {
    const currCycle = [...cycle].map((node) => new GraphNode((node.value)));

    if (nodes.length === currCycle.length) {
        if (isCycle(adj_mat, nodeIdx, currCycle)) {
            cycles.push(currCycle);
        }

        return;
    }

    for (let nodeIdx = 0; nodeIdx < nodes.length; nodeIdx += 1) {
        const nodeCandidate = nodes[nodeIdx];

        if (isSafe(adj_mat, nodeIdx, currCycle, nodeCandidate)) {
            currCycle.push(nodeCandidate);

            hamiltonian_cycle_util({
                adj_mat,
                nodes,
                nodeIdx,
                cycles,
                cycle: currCycle
            });

            currCycle.pop();
        }
    }
}

const HamiltonianCycle = (graph = new Graph()) => {
    const nodeIdx = graph.getNodeIndices();
    const adj_mat = graph.getAdjacencyMatrix();
    const nodes = graph.getAllNodes();
    const start = nodes[0];
    const cycles = [];
    const cycle = [start];

    hamiltonian_cycle_util({
        adj_mat,
        nodes,
        nodeIdx,
        cycles,
        cycle
    });

    return cycles;
}

HamiltonianCycle()