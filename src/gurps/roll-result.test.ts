import {describe, it, expect} from "vitest"
import {RollResult} from "./roll-result"

describe("RollResult", () => {
  describe("success", () => {

    it("is true if value < score", () => {
      const result = new RollResult(10, 9)

      expect(result.success).toBe(true)
    })

    it("is true if value == score", () => {
      const result = new RollResult(13, 13)

      expect(result.success).toBe(true)
    })

    it("is false if value > score", () => {
      const result = new RollResult(10, 11)

      expect(result.success).toBe(false)
    })
  })
})
