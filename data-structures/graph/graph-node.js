export class GraphNode {
    constructor(value) {
        if (value === undefined) {
            throw new Error('Graph node must have a value');
        }

        const edgeCmp = (a, b) => {
            if (a.getKey() == b.getKey()) {
                return 0;
            }

            return a.getKey() < b.getKey() ? -1 : 1
        }

        this.value = value;
        this.edges = new LinkedList(edgeCmp);
    }

    addEdge(edge) {
        this.edges.append(edge);
        return this;
    }

    deleteEdge(edge) {
        this.edges.delete(edge);
    }

    getNeighbors() {
        const edges = this.edges.toArray();
    }
}