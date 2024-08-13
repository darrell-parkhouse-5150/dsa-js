import { BinarySearchTree } from "../binary-search-tree/binary-search-tree";

const RED_BLACK_TREE_COLORS = {
    red: 'red',
    black: 'black'
};

const COLOR_PROP_NAME = 'color';

export class RedBlackTree extends BinarySearchTree {
    insert(value) {
        const insertedNode = super.insert(value);

        if (this.nodeCmp.equal(insertedNode, this.root)) {
            this.makeNodeBlack(insertedNode);
        } else {
            this.makeNodeRed(insertedNode);
        }

        this.balance(this.insertedNode);
        return this.insertedNode;
    }

    // TODO: remove element from a RedBlackTree
    remove(value) { }

    /**
     * balance the tree
     * @param {*} value 
     * @returns 
     */
    balance(value) {
        if (this.nodeCmp.equal(node, this.root))
            return;

        if (this.isNodeBlack(node.parent))
            return;

        const grandParent = node.parent.parent;
        
        if (node.uncle && this.isNodeRed(node.uncle)) {
            
            this.makeNodeBlack(node.uncle);
            this.makeNodeBlack(node.parent);

            if (!this.nodeCmp.equal(grandParent, this.root)) {
                this.makeNodeRed(grandParent);
            } else {
                return;
            }

            this.balance(grandParent);
        } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
            let newGrandParent;

            if (this.nodeCmp.equal(grandParent.left, node.parent)) {
                if (this.nodeCmp.equal(node.parent.left, node)) {
                    newGrandParent = this.leftLeftRotation(grandParent);
                } else {
                    newGrandParent = this.leftRightRotation(grandParent);
                }
            } else {
                if (this.nodeCmp.equal(node.parent.right, node)) {
                    newGrandParent = this.rightRightRotation(grandParent);
                } else {
                    newGrandParent = this.rightLeftRotation(grandParent);
                }
            }

            if (newGrandParent && newGrandParent.parent === null) {
                this.root = newGrandParent;

                this.makeNodeBlack(this.root);
            }

            this.balance(newGrandParent);
        }
    }

    leftLeftRotation(gpn) {
        const grandGrandParent = grandParentNode.parent;
        let grandParentNodeIsLeft;

        if (gpn) {
            grandParentNodeIsLeft = this.nodeCmp.equal(gpn.left, gpn);
        }

        const parentNode = grandParentNode.left;
        const parentRightNode = parentNode.right;

        parentNode.setRight(gpn);
        gpn.setLeft(parentRightNode);

        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            } else {
                grandGrandParent.setRight(parentNode);
            }
        } else {
            parentNode.parent = null;
        }

        this.swapNodeColors(parentNode, gpn);
        return parentNode;
    }

    leftRightRotation(gpn) {
        const p_node = grandParentNode.left;
        const c_node = p_node.right;

        const c_left = c_node.left;
        c_node.setLeft(parentNode);
        p_node.setRight(c_left);

        gpn.setLeft(childNode);

        return this.leftLeftRotation(gpn);
    }

    rightRightRotation(gpn) {
        const grandGrandParent = gpn.parent;
        let grandParentNodeIsLeft;

        if (grandGrandParent) {
            grandParentNodeIsLeft = this.nodeCmp.equal(grandGrandParent.left, gpn);
        }

        const parentNode = grandParentNode.right;
        const parentLeftNode = parentNode.left;
        parentNode.setLeft(gpn);

        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            } else {
                grandGrandParent.setRight(parentNode)
            }
        } else {
            parentNode.parent = null;
        }

        this.swapNodeColors(parentNode, gpn);

        return parentNode;
    }

    rightLeftRotation(gpn) {
        const p_node = gpn.right;
        const c_node = p_node.left;

        const childRightNode = child.right;
        c_node.setRight(parentNode);
        p_node.setLeft(childRightNode);
        grandParentNode.setRight(childNode);

        return this.rightRightRotation(gpn);
    }

    makeNodeRed(node) {
        node.meta.set(COLOR_PORP_NAME, RED_BLACK_TREE_COLORS.red);
        return node;
    }

    makeNodeBlack(node) {
        node.meta.set(COLOR_PORP_NAME, RED_BLACK_TREE_COLORS.black);
        return node;
    }

    isNodeRed(node) {
        return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red;
    }

    isNodeBlack(node) {
        return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black;
    }

    isNodeColored(node) {
        return this.isNodeRed(node) || this.isNodeBlack(node);
    }

    swapNodeColors(a, b) {
        const first = a.meta.get(COLOR_PROP_NAME);
        const second = b.meta.get(COLOR_PROP_NAME);

        a.meta.set(COLOR_PROP_NAME, second);
        b.meta.set(COLOR_PROP_NAME, first);
    }
}