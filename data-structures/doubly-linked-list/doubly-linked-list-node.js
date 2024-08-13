export class DoublyLinkedListNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }

    toString(cb) {
        return cb ? cb(this.value) : `${this.value}`;
    }
}