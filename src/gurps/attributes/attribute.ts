import {SuccessRoll} from "../success-roll.ts";
import {d6} from "../dice/d6.ts";

type Cost = {
  amount: number
  increment: number
}

export class Attribute {
  #addedIncrements: number = 0;
  #cost: Cost
  #getBaseLevel: () => number

  static basedOn(underlying: Attribute, pointPerLevel: number): Attribute {
    return new Attribute(pointPerLevel, () => underlying.score)
  }

  static primary(startingLevel: number, pointsPerLevel: number): Attribute {
    return new Attribute(pointsPerLevel, () => startingLevel)
  }

  constructor(cost: number | Cost, baseLevel: number | (() => number)) {
    if (typeof cost === 'number') {
      this.#cost = {amount: cost, increment: 1}
    } else {
      this.#cost = cost
    }

    if (typeof baseLevel === 'number') {
      this.#getBaseLevel = () => baseLevel
    } else {
      this.#getBaseLevel = baseLevel
    }
  }

  get baseScore() {
    return this.#getBaseLevel()
  }

  get score() {
    return this.baseScore + this.#addedIncrements
  }

  set score(value) {
    this.#addedIncrements = value - this.baseScore;
  }

  get cost() {
    return (this.#cost.amount * this.#addedIncrements)/this.#cost.increment;
  }

  roll(modifier: number = 0) {
    const value = d6() + d6() + d6();

    return new SuccessRoll(this.score, value, modifier)
  }
}