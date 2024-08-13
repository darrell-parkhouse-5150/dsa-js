import { DisjointSetItem } from "./disjoint-set-item";

export class DisjointSet {
    constructor(keyCB) {
        this.keyCB = keyCB;
        this.items = {};
    }

    makeSet(itemValue) {
        const disjointSetItem = new DisjointSetItem(itemValue, this.keyCB);

        if (!this.items[disjointSetItem.getKey()]) {
            this.items[disjointSetItem.getKey()] = disjointSetItem;
        }

        return this;
    }

    find(itemValue) {
        const temp = new DisjointSetItem(itemValue, this.keyCB);
        const req = this.items[temp.getKey()];

        if (!req) {
            return null;
        }

        return req.getRoot().getKey();
    }

    union(a, b) {
        const root_a = this.find(a);
        const root_b = this.find(b);

        if (root_a === null || root_b === null) {
            throw new Error("One or two values are not in set");
        }

        if (root_a === root_b)
            return this;

        const r_a = this.items[root_a];
        const r_b = this.items[root_b];

        if (r_a.getRank() < r_b.getRank()) {
            r_b.addChild(r_a);
            return this;
        }

        r_a.addChild(r_b);
        return this;
    }

    inSameSet(a, b) {
        const r_a = this.find(a);
        const r_b = this.find(b);

        if (r_a === null || r_b === null) {
            throw new Error("on or two values are not int he set")
        }

        return r_a === r_b;
    }
}