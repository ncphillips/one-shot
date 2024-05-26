import {describe, it, expect, test, vi, beforeEach, Mock} from "vitest"
import {createCharacter} from "../character.ts";
import {CharacterSkill} from "../skills/character-skill.ts";
import {administration, bicycling} from "../skills/skill-list.ts";
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

describe("Skill#roll", () => {
  const character = createCharacter();

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