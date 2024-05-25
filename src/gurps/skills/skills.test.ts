import {describe, it, expect} from "vitest"
import {createCharacter} from "../character.ts";
import {CharacterSkill} from "./character-skill.ts";
import {administration, bicycling} from "./skill-list.ts";

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
})