import PolynomialHash from "./polynomial-hash";
describe("PolynomialHash", () => {
  it("should calculate new has based on previous one", (_) => {
    const bases = [3, 5];
    const frameSize = [5, 10];
    const text =
      "Lorem Ipsum is simply dummy text of the printing and " +
      "typesetting industry. Lorem Ipsum has been the industry's standard " +
      "galley of type and \u{ffff} scrambled it to make a type specimen book. It " +
      "electronic 耀 typesetting, remaining essentially unchanged. It was " +
      "popularised in the 1960s with the release of Letraset sheets " +
      "publishing software like Aldus 耀 PageMaker including versions of Lorem.";

    bases.forEach((base) => {
      const polynomialHash = PolynomialHash(base);

      frames.forEach((frameSize) => {
        let pw = text.substring(0, frameSize),
          ph = polynomialHash.hash(pw);

        for (let shift = 1; shift < text.length - frameSize; shift++) {
          const cw = text.substring(shift, frameSize);
          const ch = polynomialHash.hash(cw);
          const cr = polynomialHash.roll(ph, pw, cw);

          expect(cr).toBe(ch);

          pw = cw;
          ph = ch;
        }
      });
    });
  });

  it("should generate numeric hashed", (_) => {
    const polynomialHash = new PolynomialHash();

    expect(polynomialHash.hash("Test")).toBe(604944);
    expect(polynomialHash.hash("a")).toBe(97);
    expect(polynomialHash.hash("b")).toBe(98);
    expect(polynomialHash.hash("c")).toBe(99);
    expect(polynomialHash.hash("d")).toBe(100);
    expect(polynomialHash.hash("e")).toBe(101);
    expect(polynomialHash.hash("ab")).toBe(1763);
    expect(polynomialHash.hash("abc")).toBe(30374);
  });
});
