export class KnapsackItem {
    constructor({ value, weight, itemsInStock = 1 }) {
        this.value = value;
        this.weight = weight;
        this.itemsInStock = itemsInStock;
        this.quantity = 1;
    }

    get totalValue() {
        return this.value * this.quantity;
    }

    get totalWeight() {
        return this.weight * this.quantity;
    }

    get valuePerWeightRatio() {
        return this.value / this.weight;
    }

    toString() {
        return `v${this.value} w${this.weight} x ${this.quantity}`;
    }
}