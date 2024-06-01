import {describe, test, expect} from "vitest"
import {range} from "./range";

describe("range", () => {
  test("(0, 1)", () => {
    expect(range(0, 1)).toEqual([0, 1])
  })

  test("(1, 3)", () => {
    expect(range(1, 3)).toEqual([1, 2, 3])
  })

  test("(-3, 4)", () => {
    expect(range(-3, 4)).toEqual([-3, -2, -1, 0, 1, 2, 3, 4])
  })
})