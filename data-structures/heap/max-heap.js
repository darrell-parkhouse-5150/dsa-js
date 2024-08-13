import { Heap } from "./heap";

export class MaxHeap extends Heap {
    pairsIsInCorrectOrder(a, b) {
        return this.comp.greaterThanOrEqual(a, b);
    }
}