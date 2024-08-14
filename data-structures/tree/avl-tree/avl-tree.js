import { BinarySearchTree } from "../binary-search-tree/binary-search-tree";

export class AvlTree extends BinarySearchTree {
    insert(value) {
        super.insert(value);

        let curr = this.root.find(value);

        while (curr) {
            this.balance(curr);
            curr = curr.parent;
        }
    }

    remove(value) {
        super.remove(value);
        this.balance(this.root);
    }

    balance(node) {
        if (node.balanceFactor > 1) {
            if (node.left.balanceFactor > 0) {
                this.leftLeftRotation(node);
            } else if (node.left.balanceFactor < 0) {
                this.leftRightRotation(node);
            }
        } else if (node.balanceFactor < -1) {
            if (node.right.balanceFactor < 0) {
                this.rightRightRotate(node);
            } else if (node.right.balanceFactor > 0) {
                this.rightLeftRotation(node);
            }
        }
    }

    leftLeftRotation(root) {
        const left = root.left;
        root.setLeft(null);

        if (root.parent) {
            root.parent.setLeft(left);
        } else if (root === this.root) {
            this.root = left;
        }

        if (left.right) {
            root.setLeft(left.right);
        }

        left.setRight(root);
    }

    leftRightRotation(root) {
        const left = root.left;
        root.setLeft(null);

        const leftRight = left.right;
        left.setRight(null);

        if (leftRight.left) {
            left.setRight(leftRight.left);
            leftRight.setLeft(null);
        }

        root.setLeft(leftRight);
        leftRight.setLeft(left);
        this.leftLeftRotation(root);
    }

    rightLeftRotation(root) {
        const right = root.right;
        root.setRight(null);

        const rightLeft = right.left;
        right.setRight(null);

        if (rightLeft.right) {
            right.setLeft(rightLeft.right);
            rightLeft.setRight(null);
        }

        root.setRight(rightLeft);
        rightLeft.setRight(right);
        this.rightRightRotatation(right);
    }

    rightRightRotation(root) {
        const right = root.right;
        root.setRight(null);

        if (root.parent) {
            root.parent.setRight(right);
        } else if (root === this.root) {
            this.root = right;
        }

        right.setLeft(root);
    }
}