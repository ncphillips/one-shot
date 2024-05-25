import {beforeEach, describe, expect, it, Mock, test, vi,} from "vitest";
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

    describe("returns a resulting value that sums the 3d6", () => {
      const rolls = [
        [1, 1, 1],
        [2, 1, 2],
        [3, 3, 3],
        [1, 4, 2],
        [6, 6, 6],
        [6, 1, 5]
      ]
      test.each(rolls)("Example: (%d, %d, %d)", (first, second, third) => {
        d6.mockReturnValue(first)
          .mockReturnValueOnce(second)
          .mockReturnValueOnce(third);

        const attribute = new Attribute(10)

        const result = attribute.roll();

        expect(result.value).toEqual(first + second + third)
      })
    })

    it("passes any modifiers to the roll result", () => {
      const attribute = new Attribute(10)

      expect(attribute.roll(5).effectiveSkillLevel).toEqual(15)
      expect(attribute.roll(-3).effectiveSkillLevel).toEqual(7)
      expect(attribute.roll(2).effectiveSkillLevel).toEqual(12)
    })
  })
});