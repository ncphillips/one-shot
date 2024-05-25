import {describe, expect, it} from "vitest"
import {RollResult} from "./roll-result"
import {range} from "./range.ts";

describe("RollResult", () => {
  describe("success", () => {
    it("is true if value < effective skill level", () => {
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

  describe("critSuccess", () => {
    describe("for a roll of 3, 4", () => {
      it("is always true", () => {
        range(1, 22).forEach((effectiveSkillLevel) => {
          [3, 4].forEach((roll) => {
            const result = new RollResult(effectiveSkillLevel, roll)

            expect(result.critSuccess).toBe(true)
          })
        })
      })
    })

    describe("for a roll of 5", () => {
      const roll = 5;

      it("is false with a skill of (1, 14)", () => {
        range(1, 14).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critSuccess).toBe(false)
        })
      })

      it("is true with a skill of (15, 22)", () => {
        range(15, 22).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critSuccess).toBe(true)
        })
      })
    })

    describe("for a roll of 6", () => {
      const roll = 6

      it("is false with a skill of (1, 15)", () => {
        range(1, 15).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critSuccess).toBe(false)
        })
      })

      it("is true with a skill of (16, 22)", () => {
        range(16, 22).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critSuccess).toBe(true)
        })
      })
    })
  })

  describe("critFailure", () => {
    describe("for a roll of 18", () => {
      it("is always true", () => {
        range(1, 22).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, 18)

          expect(result.critFailure).toBe(true)
        })
      })
    })

    describe("for a roll == 17", () => {
      const roll = 17;

      it("is true with a skill <= 15", () => {
        range(1, 15).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critFailure).toBe(true)
        })
      })

      it("is false with a skill of (16, 22)", () => {
        range(16, 22).forEach((effectiveSkillLevel) => {
          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critFailure).toBe(false)
        })
      })
    })

    describe("a roll of 10 + effective skill level", () => {
      it("is true", () => {
        range(5, 6).forEach((effectiveSkillLevel) => {
          let roll = effectiveSkillLevel + 10;

          const result = new RollResult(effectiveSkillLevel, roll)

          expect(result.critFailure, `Expected failure roll(${roll}) with esl(${effectiveSkillLevel})`).toBe(true)
        })
      })
    })
  })
})
