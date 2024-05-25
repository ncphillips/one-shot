import {Attribute} from "./attribute.ts";

export class SecondaryAttribute {
  #baseScore: number = 0;
  #pointPerLevel: number
  #underlying: Attribute

  constructor(underlying: Attribute, pointPerLevel: number) {
    this.#underlying = underlying
    this.#pointPerLevel = pointPerLevel
  }

  get score() {
    return this.#underlying.score + this.#baseScore
  }

  set score(value) {
    this.#baseScore = value - this.#underlying.score
  }

  get cost() {
    return this.#pointPerLevel * this.#baseScore;
  }
}