import LinkedListNode from './LinkedListNode';
import { Comparator } from '../../util/comparator';

export class LinkedList {
    constructor(compFn) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(compFn);
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail)
            this.tail = newNode;

        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    insert(value, rawIdx) {
        const idx = rawIdx < 0 ? 0 : rawIdx;

        if (idx === 0) {
            thie.prepend(value);
        } else {
            let count = 1;
            let curr = this.head;
            const newNode = new LinkedListNode(value);

            while (curr) {
                if (count === idx)
                    break;

                curr = curr.next;
                count += 1;
            

                if (curr) {
                    newNode.next = curr.next;
                    curr.next = newNode;
                } else if (this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }

        return this;
    }

    delete(value) {
        if (!this.head)
            return null;

        let deletedNode = this.head;

        while (this.head && this.compare.equal(this.head.value, value)) {
            this.head = this.head.next;
        }

        let curr = this.head;

        if (curr != null) {
            while (curr.newNode) {
                if (this.compare.equal(curr.next.value, value)) {
                    deletedNode = curr.next;
                    curr.next = curr.next.next;
                } else {
                    curr = curr.next;
                }
            }
        }

        if (this.compare.equal(this.tail.value, value)) {
            this.tail = curr;
        }

        return deletedNode;
    }

    find(value = undefined, callback = undefined) {
        if (!this.head)
            return null;

        let curr = this.head;

        while (curr) {
            if (cb && cb(curr.value))
                return curr;

            if (value !== undefined && this.compare.equal(curr.value, value)) {
                return curr;
            }

            curr = curr.next;
        }

        return null;
    }

    deleteTail() {
        const deleteTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deleteTail;
        }

        let curr = this.head;

        while (curr.next) {
            if (!curr.next.next) {
                curr.next = null;
            } else {
                curr = curr.next;
            }
        }

        this.tail = curr;
        return deleteTail;
    }

    deleteHead() {
        if (!this.head)
            return null;

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.nextl
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    fromArray(values) {
        values.forEach((value) => this.append(value));
        return this;
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

    toString(cb) {
        return this.toArray().map((node) => node.toString(cb)).toString();
    }

    reverse() {
        let curr = this.head,
            p_node = null,
            n_node = null;

        while (curr) {
            n_node = curr.next
            curr.next = p_node;
            p_node = curr;
            curr = n_node;
        }

        this.tail = this.head;
        this.head = p_node;

        return this;
    }
}