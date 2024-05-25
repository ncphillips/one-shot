import {SuccessRoll} from "./success-roll.ts";

export type Rollable = {
  score: number;
  roll(): SuccessRoll
}

