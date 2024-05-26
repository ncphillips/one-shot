import {describe, it, expect} from "vitest"
import {createCharacter} from "../character.ts";
import {CharacterSkill} from "../skills/character-skill.ts";
import {administration, bicycling, merchant} from "../skills/skill-list.ts";

describe("Skill Level", () => {
  const character = createCharacter();

  describe("when trained", () => {
    it("is the controlling attribute level + modifier", () => {
      const characterSkill = new CharacterSkill(character, administration)

      character[administration.controllingAttribute].score = 10
      characterSkill.modifier = 3;

      expect(characterSkill.level).toBe(13)
    })
  })

  describe("when untrained", () => {
    describe("without a fallback", () => {
      it("it is the controlling attribute + untrained modifier", () => {
        const characterSkill = new CharacterSkill(character, bicycling)

        expect(characterSkill.level).toBe(character.dexterity.score - 4)
      })
    })

    describe("trained in a fallback skill", () => {
      it("is the fallback skill level", () => {
        character.administration = new CharacterSkill(character, administration)
        character.merchant = new CharacterSkill(character, merchant)

        character.intelligence.score = 10;
        character.merchant.modifier = 3;

        expect(character.merchant.level).toBe(13)
        expect(character.administration.level).toBe(character.merchant.level)
      })
    })
  })


})