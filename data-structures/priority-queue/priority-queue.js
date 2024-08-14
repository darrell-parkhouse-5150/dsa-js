import { MinHeap } from "../heap/min-heap";
import { Comparator } from "../../util/comparator";

export class PriorityQueue extends MinHeap {
    constructor() {
        super();
        this.priorities = new Map();
        this.comp = new Comparator()
    }

    add(item, priority = 0) {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    remove(item, cfc) {
        super.remove(item, cfc);
        this.priorities.delete(item);

        return this;
    }
    changePriority(item, priority) {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);

        return this;
    }

    findByValue(item) {
        return this.find(item, new Comparator(this.compareValue));
    }
    hasValue(item) {
        return this.findByValue(item).length > 0;
    }

    compareValue(a, b) {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }
}