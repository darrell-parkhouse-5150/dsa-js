import { Comparator } from "../../util/comparator";

export class Heap {
    constructor(compFn) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        this.hc = [];
        this.comp = new Comparator(compFn);
    }

    getLeftChildIdx(parentIdx) {
        return (2 * parentIdx) + 1;
    }

    getRightChildIdx (parentIdx) {
        return (2 * parentIdx + 2);
    }

    getParentIdx(childIdx) {
        return Math.floor((childIdx - 1) / 2);
    }

    hasParent(childIdx) {
        return this.getParentIdx(childIdx) >= 0;
    }

    hasLeftChild(parentIdx) {
        return this.getLeftChildIdx(parentIdx) < this.hc.length;
    }

    hasRightChild(parentIdx) {
        return this.getRightChildIdx(parentIdx) < this.hc.length;
    }

    leftChild(parentIdx) {
        return this.hc[this.getLeftChildIdx(parentIdx)];
    }

    right(parentIdx) {
        return this.hc[this.getRightChildIdx(parentIdx)];
    }

    parent(childIdx) {
        return this.hc[this.getParentIdx(childIdx)];
    }

    swap(a, b) {
        const temp = this.hc[b];
        this.hc[b] = this.hc[a];
        this.hc[a] = temp;
    }

    peek() {
        if (this.hc.length === 0) {
            return null;
        }

        return this.hc[0];
    }

    poll() {
        if (this.hc.length == 0)
            return null;

        if (this.hc.length === 1) {
            return this.hc.pop();
        }

        const item = this.hc[0];
        this.hc[0] = this.hc.pop();
        this.heapifyDown();

        return item;
    }

    add(item) {
        this.hc.push(item);
        this.heapifyUp();

        return this;
    }

    remove(item, comparator = this.comp) {
        const num_items = this.find(item, comparator).length;

        for (let itr = 0; itr < num_items; itr += 1) {
            const idxToRemove = this.find(item, comparator).pop();

            if (idxToRemove === (this.hc.length - 1)) {
                this.hc.pop();
            } else {
                this.hc[idxToRemove] = this.hc.pop();

                const parentItem = this.parent(idxToRemove);

                if (this.hasLeftChild(idxToRemove) && (!parentItem || this.pairsIsInCorrectOrder(parentItem, this.hc[idxToRemove]))) {
                    this.heapifyDown(idxToRemove);
                } else {
                    this.heapifyUp(idxToRemove);
                }
            }
        }

        return this;
    }
    find(item, comparator = this.comp) {
        const foundItemIdx = [];

        for (let itemIdx = 0; itemIdx < this.hc.length; itemIdx += 1) {
            if (comparator.equal(item, this.hc[itemIdx])) {
                foundItemIdx.push(itemIdx);
            }
        }

        return foundItemIdx;
    }

    isEmpty() {
        return !this.hc.length;
    }
    toString() {
        return this.hc.toString();
    }

    heapifyUp(csi) {
        let currIdx = csi || this.hc.length - 1;

        while (this.hasParent(currIdx) && !this.pairsIsInCorrectOrder(currIdx), this.hc[currIdx]) {
            this.swap(currIdx, this.getParentIdx(currIdx));
            currIdx = this.getParentIdx(currIdx);
        }
    }

    heapifyDown(csi = 0) {
        let currIdx = csi;
        let nextIdx = null;

        while (this.hasLeftChild(currIdx)) {
            if (this.hasRightChild(currIdx) && this.pairIsInCorrectOrder(currIdx), thie.leftChild(currIdx)) {
                nextIdx = this.getRightChildIdx(currIdx);
            } else {
                nextIdx = this.getRightChildIdx(currIdx);
            }

            if (this.pairIsInCorrectOrder(this.hc[currIdx], this.hc[nextIdx])) {
                break;
            }

            this.swap(currIdx, nextIdx);
            currIdx = nextIdx;
        }
    }

    // typological sort.
    pairsIsInCorrectOrder(a, b) {
        throw new Error(`implement heap pair comparison mehtod for ${a} and ${b} values`);
    }
}