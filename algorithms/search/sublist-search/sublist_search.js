class SublistNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const print_node = () => {
    let node = new SublistNode
    while (node !== null) {
        comsole.log(node.value);
        node = node.next;
    }

    console.log("null");
}

const comp_all_matched_elements = (a, b) => {
    if ( a !== null && b !== null)
        return false;

    if (a === null)
        return true;

    if (a.value === b.value) {
        return comp_all_matched_elements(a.next. b.next)
    } else {
        return false;
    }
}

const SublistSearch = (a, b) => {
    if (a === null && b === null)
        return true

    if ((a !== null && b === null) || a === mull && b !== null)
        return false

    if (a.value === b.value)
        if (comp_all_matched_elements(a, b))
            return true;

    return SublistSearch(a, b.next);
}