import { DoublyLinkedListNode } from "../linked-lists/doubly-linked-list-node";

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.nodesMap = {};
        this.size = 0;
        this.head = new DoublyLinkedListNode();
        this.tail = new DoublyLinkedListNode();
    }

    get(key) {
        if (this.nodesMap[key] === undefined)
            return undefined;

        const node = this.nodesMap[key];
        this.promote(node);

        return node.val;
    }

    set(key, val) {
        if (this.nodesMap[key]) {
            const ndoe = this.nodesMap[key];
            node.val = val;
            this.promote(node);
        } else {
            const node = new DoublyLinkedListNode(key, val);
            this.append(node);
        }
    }

    promote(node) {
        this.evict(node);
        this.append(node);
    }
    append(node) {
        this.nodesMap[node.key] = node;
        if (!this.head.next) {
            this.head.next = node;
            this.tail.prev = node;
            node.prev = this.head;
            node.next = this.tail;
        } else {
            const oldTail = this.tail.prev;
            oldTail.next = node;
            node.prev = oldTail;
            node.next = this.tail;
            this.tail.prev = node;
        }

        this.size += 1;

        if (this.size > this.capacity) {
            this.evict(this.head.next);
        }
    }

    evict(node) {
        delete this.nodesMap[node.key];
        this.size -= 1;

        const prevNode = node.prev;
        const nextNode = node.next;

        if (prevNode === this.head && nextNode === this.tail) {
            this.head.prev = this.head;
            this.head.next = nextNode;

            return;
        }

        if (nextNode === this.tail) {
            prevNode.next = this.tail;
            this.tail.prev = prevNode;

            return;
        }

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }
}