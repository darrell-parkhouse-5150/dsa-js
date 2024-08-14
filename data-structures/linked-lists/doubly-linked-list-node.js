export class DoublyLinkedListNode {
    constructor(key, val, prev = null, next = null) {
        this.key = key;
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
} 