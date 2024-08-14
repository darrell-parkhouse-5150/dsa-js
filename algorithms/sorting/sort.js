import { Comparator } from "../../util/comparator";

export class Sort {
    constructor(origCb) {
        this.callbacks = Sort.initSortCallbacks(origCb);
        this.compare = new Comparator(this.callbacks.compareCallbacks);
    }

    static initSortCallbacks(origCb) {
        const cbs = origCb || {};
        const stubCallbacks = () => {};

        cbs.compareCallbacks = cbs.compareCallbacks || undefined;
        cbs.visitingCallbacks = cbs.visitingCallbacks || stubCallbacks;

        return cbs;
    }

    sort() {
        throw new Error('sort method must be implemented')
    }
}