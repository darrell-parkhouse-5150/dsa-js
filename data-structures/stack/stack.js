import { LinkedList } from "../linked-lists/linked-list";

export class Stack {
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

    push(value) {
        this.linked_list.prepend(value);
    }

    pop() {
        const removedHead = this.linked_list.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toArray() {
        return this.linked_list
            .toArray()
            .map((LinkedListNode) => LinkedListNode.value);
    }

    toString(cb) {
        return this.linked_list.toString(cb);
    }
}