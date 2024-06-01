export type ControllingAttribute = "strength" | "dexterity" | "intelligence" | "health" | "will" | "perception";

export type SkillDifficulty = "Easy" | "Average" | "Hard" | "Very Hard"

export type Skill = {
  name: string;
  controllingAttribute: ControllingAttribute;
  unskilledModifier: number;
  difficulty: SkillDifficulty;
  defaults?: { property: string, modifier: number }[]
}

