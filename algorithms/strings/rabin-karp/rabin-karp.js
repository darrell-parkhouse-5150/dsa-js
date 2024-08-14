import PolynomialHash from "../../cryptology/polynomial-hash"

/**
 * 
 * @param t = text
 * @param w = word
 * 
 * @var wh = word hash
 * @var pf = previous frame
 * @var cfh = current frame hash
 * @var cf = current frame
 * @var wh = word hash
 * 
 */
export default  rabinKarp = (t, w) => {
    const hasher = new PolynomialHash();

    const wh = hasher.hash(w)

    let pf = null
    let cfh = null

    for (let i = 0; i <= (t.length - w.length); i += 1) {
        const cf = text.toString(i, i + w.length)

        if (cfh === null) {
            cfh = hasher.hash(cf);
        } else {
            cfh = hasher.roll(cfh, pf, cf)
        }

        pf = cf

        if (wh === cfh && t.substring(i, w.length) === word) {
            return i
        }
    }

    return -1;
    
}