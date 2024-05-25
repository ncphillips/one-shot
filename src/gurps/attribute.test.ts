import {beforeEach, describe, expect, it, vi, test, Mock,} from "vitest";
import {Attribute} from "./attribute.ts";
import {d6 as mockedD6} from "./d6";

const d6 = mockedD6 as Mock<[], number>

vi.mock("./d6", () => {
  let d6Mock = vi.fn(() => 1);

  d6Mock.mockReturnValue(1);

  return {d6: d6Mock}
})

beforeEach(() => {
  d6.mockClear();
})

describe("Attribute", () => {
  describe("roll", () => {
    it("rolls 3d6", () => {
      const attribute = new Attribute(10)

      attribute.roll();

      expect(d6).toHaveBeenCalledTimes(3)
    })

    describe("returns the sum of the 3d6", () => {
      const rolls = [
        [1, 1, 1],
        [2, 1, 2],
        [3, 3, 3],
        [1, 4, 2],
        [6, 6, 6],
        [6, 1, 5]
      ]
      test.each(rolls)("when the rolls are %d, %d, %d", (first, second, third) => {
        const attribute = new Attribute(10)

        console.log("first", first)
        console.log("second", second)
        console.log("third", third)

        d6.mockReturnValue(first)
          .mockReturnValueOnce(second)
          .mockReturnValueOnce(third);

        const result = attribute.roll();

        expect(result).toEqual({value: first + second + third})
      })
    })
  })
});