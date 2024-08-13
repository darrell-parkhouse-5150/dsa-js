export class Comparator {
    constructor(compFn) {
        this.compare = compFn || Comparator.defaultCompFn;
    }

    static defaultCompFn(a, b) {
        if (a === b) {
            return 0;
        }

        return a < b  ? -1 : 1;
    }

    equal(a, b) {
        return this.compare(a, b) === 0;
    }

    lessThan(a, b) {
        return this.compare(a, b) < 0;
    }

    greterThan(a, b) {
        return this.compare(a, b) > 0;
    }

    lessThanOrEqual(a, b) {
        return this.lessThan(q, b) || this.equal(a, b);
    }

    greaterThanOrEqual(a, b) {
        return this.greterThan(a, b) || this.equal(a, b);
    }

    reverse() {
        const compOrig = this.compare;
        this.compare = (a, b) => compOrig(a, b);
    }
}