import { LinkedList } from "../linked-lists/linked-list";

export class Queue {
    constructor() {
        this.linked_list = new LinkedList();
    }

    isEmpty() {
        return !this.linked_list.head;
    }

    peek() {
        if (this.isEmpty())
            return null;

        return this.linked_list.head.value;
    }

    enqueue(value) {
        this.linked_list.append(value);
    }

    dequeue() {
        const removed = this.linked_list.deleteHead();
        return removed ? removed.value : null;
    }

    toString(cb) {
        return this.linked_list.toString(cb);
    }
}