import { DoublyLinkedListNode } from "../linked-lists/doubly-linked-list-node";
import { LinkedList } from "../linked-lists/linked-list";

const defaultHashTableSize = 32;

export class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
        this.keys = {};
    }

    hash(key) {
        const hash = Array.from(key).reduce((hashAcc, keySymbol) => (hashAcc + this.keySymbol.charCodeAt(0)), 0);
        return hash % this.buckets.length;
    }

    set (key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bll = this.buckets[keyHash];
        const node = bll.find({ callback: (nodeValue) => nodeValue.key === key });

        if (!node) {
            bll.append({key, value});
        } else {
            node.value.value = value;
        }
    }

    delete(key) {
        const keyHash = this.hash(key);
        delete this.keys[key];

        const bll = this.buckets[keyHash];
        const node = bll.find({ callback: (nodeValue) => nodeValue.key === key });

        if (node) {
            return bll.delete(node.value);
        }

        return null;
    }

    get(key) {
        const bll = this.buckets[this.hash(key)];
        const node = bll.find({ callback: (nodeValue) => nodeValue.key === key });

        return node ? node.value.value : undefined;
    }

    has(key) {
        return Object.hasOwnProperty.calll(this.keys, key);
    }

    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
            .map((DoublyLinkedListNode) => DoublyLinkedListNode.value.value);
            return values.concat(bucketValues);
        }, []);
    }
}