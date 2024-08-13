import { DoublyLinkedListNode } from "./doubly-linked-list-node";
import { Comparator } from "../../util/comparator";

export class DoublyLinkedList {
    constructor(compFn) {
        this.head = null;
        this.tail = null;

        this.comp = new Comparator(compFn);
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value);

        if (this.head)
            this.head.prev = newNode;

        this.head = newNode;

        if (!this.tail)
            this.tail = newNode;

        return this;
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    remove(value) {
        if (!this.head)
            return null;

        let deleted = null;
        let curr = this.head;

        while (curr) {
            if (this.comp.equal(curr.value, value)) {
                deleted = curr;

                if (deleted === this.head) {
                    this.head = deleted.next;

                    if (this.head)
                        this.head.prev = null;

                    if (deleted == this.tail) {
                        this.tail = null;
                    }
                } else if (deleted === this.tail) {
                    this.tail = deleted.prev;
                    this.tail.next = null;
                } else {
                    const prev = deleted.prev;
                    const next = deleted.next;

                    prev.next = next;
                    next.prev = prev;
                }
            }

            curr = curr.next;
        }

        return deleted;
    }

    find({value = undefined, cb = undefined}) {
        if (!this.head)
            return null;

        let curr = this.head;

        while (curr) {
            if (cb && cb(curr.value))
                return curr;

            if (value !== undefined && this.comp.equal(curr.value, value))
                return curr;

            curr = curr.next;
        }

        return null;
    }

    removeTail() {
        if (!this.tail)
            return null;

        if (this.head === this.tail) {
            const removed = this.tail;
            this.head = null;
            this.tail = null;

            return removed;
        }

        const remove = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;

        return remove;
    }

    removeHead() {
        if (!this.head)
            return null;

        const removed = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.prev = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return removed
    }

    toArray() {
        const nodes = [];

        let curr = this.head;

        while (curr) {
            nodes.push(curr);
            curr = curr.next;
        }

        return nodes;
    }

    fromArray(values) {
        values.forEach((value) => this.append(value));
    }

    toString(cb) {
        return this.toArray().map((node) => node.toString(cb)).toString();
    }

    /**
     * a very simple way to reverse a list
     */
    reverse() {
        let curr = this.head;
        let prev = null;
        let next = null;

        while (curr) {
            next = curr.next;
            prev = curr.prev;

            curr.next = prev;
            curr.prev = next;

            prev = curr;
            curr = next;
        }

        this.tail = this.head;
        this.head = prev;

        return this;
    }
}