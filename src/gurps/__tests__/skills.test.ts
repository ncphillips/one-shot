import {describe, it, expect, test, vi, beforeEach, Mock} from "vitest"
import {createCharacter} from "../character.ts";
import {CharacterSkill} from "./character-skill.ts";
import {administration, bicycling, merchant} from "./skill-list.ts";
import {d6 as mockedD6} from "../dice/d6.ts";

const d6 = mockedD6 as Mock<[], number>

vi.mock("../dice/d6", () => {
  let d6Mock = vi.fn(() => 1);

  d6Mock.mockReturnValue(1);

  return {d6: d6Mock}
})

beforeEach(() => {
  d6.mockClear();
})

describe("Skill", () => {
  const character = createCharacter();

  describe("untrained", () => {
    it("it defaults to the controlling attribute + untrained modifier", () => {
      const characterSkill = new CharacterSkill(character, bicycling)

      expect(characterSkill.level).toBe(character.dexterity.score - 4)
    })

    it("has 0 cost", () => {
      const characterSkill = new CharacterSkill(character, bicycling)

      expect(characterSkill.cost).toBe(0)
    })
  })

  describe("trained", () => {
    it("is the controlling attribute + modifier", () => {
      const characterSkill = new CharacterSkill(character, administration)

      character[administration.controllingAttribute].score = 10
      characterSkill.modifier = 3;

      expect(characterSkill.level).toBe(13)
    })
  })

  describe("easy skills", () => {
    it.each([
      [1, 0],
      [2, 1],
      [4, 2],
      [8, 3],
      [12, 4],
      [16, 5],
      [20, 6],
      [24, 7],
      [28, 8],
    ])("%d points buys (%d) modifier", (cost, modifier) => {
      const characterSkill = new CharacterSkill(character, bicycling)

      characterSkill.modifier = modifier;

      expect(characterSkill.cost).toBe(cost)
    })
  })
  describe("average skills", () => {
    it.each([
      [1, -1],
      [2, 0],
      [4, 1],
      [8, 2],
      [12, 3],
      [16, 4],
      [20, 5],
      [24, 6],
      [28, 7],
    ])("%d points buys (%d) modifier", (cost, modifier) => {
      const characterSkill = new CharacterSkill(character, administration)

      characterSkill.modifier = modifier;

      expect(characterSkill.cost).toBe(cost)
    })
  })
  describe("fallback skills", () => {
    describe("a character is untrained in the target skill, but trained in one of its fallbacks", () => {
      it("uses the fallback instead of the controlling attribute", () => {
        character.administration = new CharacterSkill(character, administration)
        character.merchant = new CharacterSkill(character, merchant)

        character.intelligence.score = 10;
        character.merchant.modifier = 3;

        expect(character.administration.level).toBe(13)
      })
    })
  })

  describe("roll", () => {
    it("rolls 3d6", () => {
      const characterSkill = new CharacterSkill(character, administration)

      characterSkill.roll();

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


        const characterSkill = new CharacterSkill(character, administration)

        const result = characterSkill.roll();

        expect(result.value).toEqual(first + second + third)
      })
    })
    it("passes any modifiers to the roll result", () => {
      const characterSkill = new CharacterSkill(character, bicycling)

      character[administration.controllingAttribute].score = 10
      characterSkill.modifier = 0;

      expect(characterSkill.roll(5).effectiveSkillLevel).toEqual(15)
      expect(characterSkill.roll(-3).effectiveSkillLevel).toEqual(7)
      expect(characterSkill.roll(2).effectiveSkillLevel).toEqual(12)
    })
  })
})