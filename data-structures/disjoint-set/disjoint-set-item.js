export class DisjointSetItem {
    constructor(value, keyCB) {
        this.value = value;
        this.keyCB = keyCB;
        this.parent = null;
        this.children = {};
    }

    getKey() {
        if (this.keyCB) {
            return this.keyCB(this.value);
        }

        return this.value;
    }

    getRoot() {
        return this.isRoot ? this : this.parent.getRoot();
    }

    isRoot() {
        return this.parent === null;
    }

    getRank() {
        if (this.getChildren().length === 0) {
            return 0;
        }

        let rank = 0;

        this.getChildren().forEach((child) => {
            rank += 1;
            rank += child.getRank();
        });

        return rank;
    }

    getChildren() {
        return Object.values(this.children);
    }

    setParent(parentItem, fs_parentChild = true) {
        this.parent = parentItem;

        if (fs_parentChild) {
            parentItem.addChild(this);
        }

        return this;
    }

    addChild(childItem) {
        this.children[childItem.getKey()] = childItem;
        childItem.setParent(this, false);

        return this;
    }
}