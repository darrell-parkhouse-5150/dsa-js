import { BinarySearchTreeNode } from "./binary-search-tree-node";

export class BinarySearchTree {
    constructor(nodeValueComp) {
        this.root = new BinarySearchTreeNode(null, nodeValueComp);
        this.nodeCmp = this.root.nodeComp;
    }

    insert(value) {
        return this.root.insert(value);
    }

    contains(value) {
        return this.root.contains(value);
    }

    remove(value) {
        return this.root.remove(value);
    }

    toString() {
        return this.root.toString();
    }
}