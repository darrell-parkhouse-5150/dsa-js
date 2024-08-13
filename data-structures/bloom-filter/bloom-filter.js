export class BloomFilter {
    constructor(size = 100) {
        this.size = size;
        this.storage = this.createStore(size);
    }

    insert(item) {
        const hashValues = this.getHashValues(item);
        hashValues.forEach((val) => this.storage.setValue(val));
    }

    mayContain(item) {
        const hashValues = this.getHashValues(item);

        for (let hashIdx = 0; hashIdx < hashValues.length; hashIdx += 1) {
            if (!this.storage.getValue(hashValues[hashIdx])) {
                return false;
            }
        }

        return true;
    }

    createAtore(size) {
        const storage = [];

        for (let storageCellIdx = 0; storageCellIdx < size; storageCellIdx++) {
            storage.push(false);
        }

        const storageInterface = {
            getValue(idx) {
                return storage[idx];
            },
            setValue(idx) {
                storage[idx] = true;
            }
        };

        return storageInterface;
    }

    hash(item) {
        let hash = 0;

        for (let charIdx = 0; charIdx < item.length; charIdx += 1) {
            const char = item.charCodeAt(charIdx);
            hash = (hash << 5) + hash + char;
            hash &= hash;
            hash = Math.abs(hash);
        }

        return hash % this.size;
    }

    _hash(item) {
        let hash = 5381;

        for (let charIdx = 0; charIdx < item.length; charIdx += 1) {
            const char = item.charCodeAt(charIdx);
            hash = (hash << 5) + hash + char;
        }

        return Math.abs(hash % this.size);
    }

    __hash(item) {
        let hash = 0;

        for (let charIdx = 0; charIdx < item.length; charIdx += 1) {
            const char = item.charCodeAt(charIdx);

            hash = (hash << 5) - hash;
            hash += char;
            hash &= hash;
        }

        return Math.abs(hash % this.size);
    }

    getHashValues(item) {
        return [
            this.hash(item),
            this._hash(item),
            this.__hash(item)
        ];
    }
}