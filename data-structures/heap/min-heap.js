import { Heap } from "./heap";

export class MinHeap extends Heap {
    pairsIsInCorrectOrder(a, b) {
        return this.comp.lessThanOrEqual(a, b)
    }
}