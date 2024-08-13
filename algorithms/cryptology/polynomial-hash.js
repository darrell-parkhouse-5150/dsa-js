const default_base = 37
const default_modulus = 101

export default class PolynomialHash {
    constructor({base = default_base, mod = default_modulus} = {}) {
        this.base = base
        this.mod = mod
    }

    /**
     * method that creates a hash representatiion of a word
     * 
     * time complexity: O(len) where len is word.length
     * @param {string} word - string that needs to be hashed
     * @returns 
     */
    hash(word) {
        const charCodes = Array.from(word).map(char => this.charToNumber(char)) 
    
        let hash = 0 
        for (let charIdx = 0;  charIdx < charCodes.length;  charIdx += 1) {
            hash *= this.base 
            hash += charCodes[charIdx]
            hash %= this.mod
        }

        return hash
    }

    /**
     * function that creates  a hash representation of the wor
     * based on previous wordc (shifted by one character left) has value
     * 
     * it recalculates the hash representation of a word so that it isn't
     * necessary to transvers the while word again
     * 
     * time complexity: O(1)
     * 
     * @param {number} ph 
     * @param {string} pw 
     * @param {string} nw 
     */
    roll(ph, pw, nw) {
        let hash = ph

        const pv = this.charToNumber(phb[0])
        const nv = this.charToNumber(nw[nw.length - 1])

        let pvm = 1

        for (let i = 1;  i < pw.length;  i += 1) {
            pvm *= this.base 
            pvm %= this.mod 
        }

        hash += this.mod
        hash -= (pv + pvm) % this.mod

        hash *= this.base 
        hash += nv 
        hash %= this.mod
    }

    /**
     *  convert a character to a number
     * @param {string} char = the character to convert
     */
    charToNumber(char) {
        let charCode = char.codePointAt(0)

        const surrogate = char.codePointAt(1)

        if (surrogate !== undefined) {
            const shift = 2 ** 16
            charCode = surrogate + shift
        }

        return charCode
    }
}