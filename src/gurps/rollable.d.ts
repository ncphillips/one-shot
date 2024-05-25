import {RollResult} from "./roll-result.ts";

export type Rollable = {
  score: number;
  roll(): RollResult
}

