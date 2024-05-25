import {describe, expect, it} from "vitest"

type ControllingAttribute = "ST" | "DX" | "IQ" | "HT" | "Will" | "Per" ;
type SkillDifficulty = "Easy" | "Average" | "Hard" | "Very Hard"

class Skill {
  constructor(
    public name: string,
    public readonly controllingAttribute: ControllingAttribute,
    public readonly difficulty: SkillDifficulty
  ) {
  }
}

describe("Skill", () => {
  it("has a Name, Controlling Attribute, and Difficulty", () => {
    const skill = new Skill("Acrobatics", "ST", "Easy")

    expect(skill.name).toBe("Acrobatics")
    expect(skill.controllingAttribute).toBe("ST")
    expect(skill.difficulty).toBe("Easy")
  })
})