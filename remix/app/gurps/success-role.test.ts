import {describe, expect, it} from "vitest"
import {SuccessRoll} from "./success-roll"
import {range} from "./range";

describe("SuccessRoll", () => {
  describe("effectiveSkillLevel", () => {
    it("equals the score + modifier", () => {
      expect(new SuccessRoll(10, 0, 10).effectiveSkillLevel).toBe(10)
      expect(new SuccessRoll(10, -1, 9).effectiveSkillLevel).toBe(9)
      expect(new SuccessRoll(8, 4, 12).effectiveSkillLevel).toBe(12)
    })
  })

  describe("passed", () => {
    it("is true if value < effective skill level", () => {
      const roll = new SuccessRoll(10, 0, 9)

      expect(roll.passed).toBe(true)
    })

    it("is true if value == score", () => {
      const roll = new SuccessRoll(13, 0, 13)

      expect(roll.passed).toBe(true)
    })

    it("is false if value > score", () => {
      const roll = new SuccessRoll(10, 0, 11)

      expect(roll.passed).toBe(false)
    })

    it("is false if value <= effective skill level BUT it was a crit failure", () => {
      const roll = new SuccessRoll(18, 0, 18)

      expect(roll.passed).toBe(false)
    })

    it("is true if value > effective skill level BUT it was a crit success", () => {
      const roll = new SuccessRoll(0, 0, 3)

      expect(roll.passed).toBe(true)
    })

    it("is false if it would be both a crit success and a crit failure", () => {
      const roll = new SuccessRoll(-7, 0, 3)

      expect(roll.passed).toBe(false)
    })
  })

  describe("critSuccess", () => {
    describe("for a roll of 3, 4", () => {
      it("is always true", () => {
        range(1, 22).forEach((effectiveSkillLevel) => {
          [3, 4].forEach((value) => {
            const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

            expect(roll.critSuccess).toBe(true)
          })
        })
      })
    })

    describe("for a roll of 5", () => {
      const value = 5;

      it("is false with a skill of (1, 14)", () => {
        range(1, 14).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critSuccess).toBe(false)
        })
      })

      it("is true with a skill of (15, 22)", () => {
        range(15, 22).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critSuccess).toBe(true)
        })
      })
    })

    describe("for a roll of 6", () => {
      const value = 6

      it("is false with a skill of (1, 15)", () => {
        range(1, 15).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critSuccess).toBe(false)
        })
      })

      it("is true with a skill of (16, 22)", () => {
        range(16, 22).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critSuccess).toBe(true)
        })
      })
    })
  })

  describe("critFailure", () => {
    describe("for a roll of 18", () => {
      it("is always true", () => {
        range(1, 22).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, 18)

          expect(roll.critFailure).toBe(true)
        })
      })
    })

    describe("for a roll == 17", () => {
      const value = 17;

      it("is true with a skill <= 15", () => {
        range(1, 15).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critFailure).toBe(true)
        })
      })

      it("is false with a skill of (16, 22)", () => {
        range(16, 22).forEach((effectiveSkillLevel) => {
          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critFailure).toBe(false)
        })
      })
    })

    describe("a roll of 10 + effective skill level", () => {
      it("is true", () => {
        range(5, 6).forEach((effectiveSkillLevel) => {
          let value = effectiveSkillLevel + 10;

          const roll = new SuccessRoll(effectiveSkillLevel, 0, value)

          expect(roll.critFailure, `Expected failure roll(${roll}) with esl(${effectiveSkillLevel})`).toBe(true)
        })
      })
    })
  })
})
