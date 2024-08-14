import rabinKarp from "../rabin-karp/rabin-karp"

const hamming_distance = (a, b) => {
    if (a.length !== b.length) {
        throw new Error('strings must be of the same length')
    }

    let dist = 0;

    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) {
            dist += 1;
        }
    }

    return dist;
}