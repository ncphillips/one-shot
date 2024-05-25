import {SkillDifficulty} from "./skill.ts";

export const MODIFIER_COSTS_BY_DIFFICULTY: Record<SkillDifficulty, { [key: number]: number }> = {
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