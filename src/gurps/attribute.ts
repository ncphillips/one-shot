import {d6} from "./d6.ts";
import {Buyable} from "./buyable";
import {Rollable} from "./rollable";
import {RollResult} from "./roll-result.ts";

export class Attribute implements Buyable, Rollable {
  score = 10

  constructor(
    public pointPerLevel: number
  ) {
  }

  get cost() {
    return this.pointPerLevel * (this.score - 10);
  }

  roll() {
    const firstDie = d6();
    const secondDie = d6();
    const thirdDie = d6();
    const value = firstDie + secondDie + thirdDie;

    return new RollResult(this, value)
  }
}