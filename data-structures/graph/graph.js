export class Graph {
    constructor(isDirected = false) {
        this.nodes = [];
        this.edges = [];
        this.isDirected = isDirected;
    }

    addNode(newNode) {
        this.nodes[newNode.getKey()] = newNode;
        return this;
    }

    getNodeByKey(nodeKey) {
        return this.nodes[nodeKey];
    }

    getNeighbors(node) {
        return node.getNeighbors();
    }

    getAllNodes() {
        return Object.values(this.nodes);
    }

    getAllEdges() {
        return Object.values(this.edges);
    }

    addEdge(edge) {
        let start = this.getNodeByKey(edge.start.getKey());
        let end= this.getNodeByKey(edge.end.getKey());

        if (!start) {
            this.addNode(edge.start);
            start = this.getNodeByKey(edge.start.getKey())
        }

        if (!end) {
            this.addNode(edge.end);
            end = this.getNodeByKey(edge.end.getKey());
        }

        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        if (this.isDirected) {
            start.addEdge(edge);
        } else {
            start.addEdge(edge);
            end.addEdge(edge);
        }

        return this;
    }

    deleteEdge(edge) {
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        } else {
            throw new Error("Edge not found in graph");
        }

        const start = this.getNodeByKey(edge.start.getKey());
        const end = this.getNodeByKey(edge.end.getKey());

        start.deleteEdge(edge);
        end.deleteEdge(edge);
    }

    findEdge(start, end) {
        const node = this.getNodeByKey(start.getKey());

        if (!node)
            return null;

        return node.findEdge(end);
    }

    getWeight() {
        return this.getAllEdges().reduce((weight, edge) => {
            return weight + edge.weight;
        }, 0);
    }

    reverse() {
        this.getAllEdges().forEach((edge) => {
            this.deleteEdge(edge);
            edge.reverse();

            this.addEdge(edge);
        });

        return this;
    }

    getNodeIndices() {
        const nodeIndices = {};
        this.getAllNodes.forEach((node, idx) => {
            nodeIndices[node.getKey()] = idx
        });

        return nodeIndices;
    }

    getAdjacencyMatrix() {
        const nodes = this.getAllNodes();
        const nodeIdx = this.getNodeIndices();

        const adj_matrix = Array(nodes.length).fill(null).map(() => {
            return Array(nodes.length).fill(Infinity);
        });

        nodes.forEach((node, nodeIdx) => {
            node.getNeighbors().forEach((neighbor) => {
                const neighborIdx = nodeIdx[neighbor.getKey()];
                adj_matrix[nodeIdx][neighborIdx] = this.findEdge(node, neighbor).weight;
            })
        })

        return adj_matrix;
    }

    toString() {
        return Object.keys(this.nodes).toString();
    }
}