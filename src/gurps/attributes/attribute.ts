import {SuccessRoll} from "../success-roll.ts";

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

  get level() {
    return this.score
  }

  set level(value: number) {
    this.score = value
  }

  get cost() {
    return (this.#cost.amount * this.#addedIncrements)/this.#cost.increment;
  }

  roll(modifier: number = 0) {
    return new SuccessRoll(this.score, modifier)
  }
}