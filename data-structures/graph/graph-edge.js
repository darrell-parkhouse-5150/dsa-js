export class GraphEdge {
    constructor(start, end, weight = 0) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }

    getKey() {
        const sk = this.start.getKey();
        const ek = this.end.getKey();

        return `${sk}_${ek}`;
    }

    reverse() {
        const temp = this.start;
        this.start = this.end;
        this.end = temp;

        return this;
    }

    toString() {
        return this.getKey();
    }
}