import { BinaryTreeNode } from "../binary-tree-node";
import { Comparator } from "../../../util/comparator";
export class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value = null, compFn = undefined) {
        super(value);

        this.compFn = compFn;
        this.nodeValueComp = new Comparator(compFn);
    }

    insert(value) {
        if (this.nodeValueComp.lessThan(this.value, null)) {
            this.value = value;
            return this;
        }

        if (this.nodeValueComp.lessThan(value, this.value)) {
            if (this.left) {
                return this.left.insert(value);
            }

            const newNode = new BinarySearchTreeNode(value, this.compFn);
            this.setLeft(newNode);

            return newNode;
        }

        if (this.nodeValueComp.greaterThan(value, this.value)) {
            if (this.right)
                return this.right.insert(value);

            const newNode = new BinarySearchTreeNode(value, this.compFn);
            this.setRight(newNode);
            return newNode;
        }

        return this;
    }

    find(value) {
        if (this.nodeValueComp.equal(this.value, value))
            return this;

        if (this.nodeValueComp.lessThan(value, this.value) && this.left)
            return this.left.find(value);

        if (this.nodeValueComp.greaterThan(value, this.value) && this.right)
            return this.right.find(value);

        return null;
    }

    contains(value) {
        return !!this.find(value);
    }

    remove(value) {
        const node = this.find(value);

        if (!node)
            throw new Error("item not found in the truee")

        const {parent} = node;

        if (node.left && !node.right) {
            if (parent) {
                parent.removeChild(node);
            } else {
                node.setValue(undefined);
            }
        } else if (node.left && node.right) {
            const nextLgNode = node.right.findMin();
            if (!this.nodeValueComp.equal(nextLgNode, node.right)) {
                this.remove(node.value);
                node.setValue(nextLgNode.value);
            } else {
                node.setValue(node.right.value);
                node.setRight(node.right.right);
            }
        } else {
            const c_node = node.left || node.right;

            if (parent) {
                parent.replaceChild(node, c_node)
            } else {
                BinaryTreeNode.copyNode(c_node, node);
            }
        }

        node.parent = null;
        return true
    }
    
    findMin() {
        if (!this.left)
            return this;

        return this.left.findMin();
    }
}