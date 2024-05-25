import {describe, it, expect} from "vitest"
import {createCharacter} from "../character.ts";

export type ControllingAttribute = "strength" | "dexterity" | "intelligence" | "health" | "will" | "perception";

export type SkillDifficulty = "Easy" | "Average" | "Hard" | "Very Hard"

export type Skill = {
  name: string;
  controllingAttribute: ControllingAttribute;
  unskilledModifier: number;
  difficulty: SkillDifficulty;
  defaults?: { attribute: string, modifier: number }[]
}

const COST: Record<SkillDifficulty, { [key: number]: number }> = {
  "Easy": {
    0: 1,
    1: 2,
    2: 4,
    3: 8,
    4: 12,
    5: 16
  },
  "Average": {
    [-1]: 1,
    0: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20
  },
  "Hard": {
    [-2]: 1,
    [-1]: 2,
    0: 4,
    1: 8,
    2: 12,
    3: 16,
    4: 20,
    5: 24
  },
  "Very Hard": {
    [-3]: 1,
    [-2]: 2,
    [-1]: 4,
    0: 8,
    1: 12,
    2: 16,
    3: 20,
    4: 24,
    5: 28
  }
};


class CharacterSkill {
  #purchasedModifier ?: number;

  constructor(
    public character: any,
    public skill: Skill
  ) {
  }

  get modifier(): number {
    return this.#purchasedModifier ?? this.skill.unskilledModifier;
  }

  set modifier(value: number) {
    this.#purchasedModifier = value;
  }

  get isUntrained() {
    return this.#purchasedModifier === undefined
  }

  get cost() {
    if (this.#purchasedModifier === undefined) return 0;


    let skillCost = COST[this.skill.difficulty]!;
    let EXTRA_COST: number = 4;

    if (this.modifier > 5) {
      const extra = this.modifier - 5;

      return skillCost[5] + (extra * EXTRA_COST)
    }

    // @ts-ignore
    return skillCost[this.#purchasedModifier]
  }

  get level() {
    return this.character[this.skill.controllingAttribute].score + this.skill.unskilledModifier
  }
}

const bicycling: Skill = {
  name: "Bicycling",
  controllingAttribute: "dexterity",
  unskilledModifier: -4,
  difficulty: "Easy",
  defaults: []
};

const administration: Skill = {
  name: "Administration",
  controllingAttribute: "intelligence",
  unskilledModifier: -5,
  difficulty: "Average",
  defaults: [{
    attribute: "merchant",
    modifier: -3
  }]

}

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