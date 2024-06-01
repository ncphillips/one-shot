import {SuccessRoll} from "./success-roll";

export type Rollable = {
  score: number;
  roll(): SuccessRoll
}

