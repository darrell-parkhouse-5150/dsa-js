import isPalendrome from "./isPalendrome"

describe('palindromCheck', () => {
    it ('should return wether or not the string is a palindrome', _ => {
        expect(isPalendrome('a')).toBe(true)
        expect(isPalendrome('pop')).toBe(true)
        expect(isPalendrome('kayak')).toBe(true)
        expect(isPalendrome('racecar')).toBe(true)
        expect(isPalendrome('tacocat')).toBe(true)

        expect(isPalendrome('red')).toBe(false)
        expect(isPalendrome('dodo')).toBe(false)
        expect(isPalendrome('polo')).toBe(false)
    })

})