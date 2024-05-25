import {Rollable} from "./rollable";

export class RollResult {
  constructor(
    public readonly rollable: Rollable,
    public readonly value: number
  ) {
  }
}

