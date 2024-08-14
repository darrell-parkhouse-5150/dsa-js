import { Comparator } from "../../util/comparator";
import { HashTable } from "../hash-table/hash-table";

export class BinaryTreeNode {
    constructor(value = null) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;

        this.meta = new HashTable();
        this.nodeComp = new Comparator();
    }

    get leftHeight() {
        if (!this.left) {
            return 0;
        }

        return this.left.height + 1;
    }

    get rightHeight() {
        if (!this.right) {
            return 0;
        }

        return this.right.height + 1;
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }

    get uncle() {
        if (!this.parent)
            return undefined;

        if (!this.parent.parent)
            return undefined;

        if (!this.parent.parent.left || !this.parent.parent.right)
            return undefined;

        if (this.nodeComp.equal(this.parent, this.parent.parent.left))
            return this.parent.parent.right;

        return this.parent.parent.left;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setLeft(node) {
        if (this.left)
            this.left.parent = null;

        this.left = node;

        if (this.left)
            this.left.parent = this;

        return this;
    }

    setRight(node) {
        if (this.right)
            this.right.parent = null;

        this.right = node;

        if (node)
            this.right.parent = this;

        return this;
    }

    removeChild(node) {
        if (this.left && this.nodeComp.equal(this.left, node)){
            this.left = null;
            return true;
        }

        if (this.right && this.nodeComp.equal(this.right, node)) {
            this.right = null;
            return true;
        }

        return false;
    }

    replaceChild(node, replaceNode) {
        if (!replaceNode || !node)
            return false;

        if (this.left && this.nodeComp.equal(this.left, node)) {
            this.left = replaceNode;
            return true;
        }

        if (this.right && this.nodeComp.equal(this.right, node)) {
            this.right = replaceNode;
            return true;
        }

        return false;
    }

    static copyNode(srcNode, targetNode) {
        targetNode.setValue(srcNode.value);
        targetNode.setLeft(srcNode.left);
        targetNode.setright(srcNode.right);
    }

    traverseInOrder() {
        let traverse = [];

        if (this.left)
            traverse = traverse.concat(thie.left.traverseInOrder());

        traverse.push(this.value);

        if (this.right)
            traverse = traverse.concat(this.right.traverseInOrder());

        return traverse;
    }

    toString() {
        return this.traverseInOrder().toString();
    }
}