export type Rollable = {
  score: number;
  roll(): RollResult
}

export type RollResult = {
  value: number
}

