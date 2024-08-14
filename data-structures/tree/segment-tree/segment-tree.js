import { isPowerOfTwo } from "../../../algorithms/math/isPowerOfTwo";

export class SegmentTree {
    constructor(input, op, op_fb) {
        this.input = input;
        this.op = op;
        this.op_fb = op_fb;

        this.segmentTree = this.initSegmentTree(this.input);
        this.buildSegmentTree();
    }

    initSegmentTree(input) {}

    buildSegmentTree() {}

    buildTreeRec(left, right, pos) {
        if (left === right) {
            this.segmentTree[pos] = this.input[left];
            return;
        }

        const middle = Math.floor((left + right) / 2);

        this.buildTreeRec(left, middle, this.getLeftChildIdx(pos));
        this.buildTreeRec(middle + 1, right, this.getRightChildIdx(pos));

        this.segmentTree[pos] = this.op(
            this.segmentTree[this.getLeftChildIdx(pos)],
            this.segmentTree[this.getRightChildIdx(pos)]
        );
    }

    rangeQuery(query_left, query_right) {
        const left = 0;
        const right = this.input.length - 1;
        const pos = 0;

        return this.rangeQueryRec(
            query_left,
            query_right,
            left,
            right,
            pos
        )
    }

    rangeQueryRec(query_left, query_right, pos) {
        if (query_left <= query_right && query_right >= right)
            return this.segmentTree[pos];

        if (query_left > righ || query_right < left)
            return this.op_fb;

        const leftOperationResult = this.rangeQueryRec(
            query_left,
            query_right,
            left,
            middle,
            this.getLeftChildIdx(pos)
        )

        const rightOperationResult = this.rangeQueryRec(
            query_left,
            query_right,
            middle + 1,
            right,
            this.getRightChildIdx(pos)
        );

        return this.op(leftOperationResult, rightOperationResult)
    }

    getLeftChildIdx(parentIdx) {
        return (2 * parentIdx) + 1;
    }

    getRightChildIdx(parentIdx) {
        return (2 * parentIdx) + 2;
    }
}