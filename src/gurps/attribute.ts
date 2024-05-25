
export class Attribute {
  #additionalLevels: number = 0;
  #pointsPerLevel: number
  #getBaseLevel: () => number

  static basedOn(underlying: Attribute, pointPerLevel: number): Attribute {
    return new Attribute(pointPerLevel, () => underlying.score)
  }

  static primary(startingLevel: number, pointsPerLevel: number): Attribute {
    return new Attribute(pointsPerLevel, () => startingLevel)
  }

  constructor(pointsPerLevel: number, getBaseLevel: () => number){
    this.#pointsPerLevel = pointsPerLevel
    this.#getBaseLevel = getBaseLevel
  }

  get baseScore() {
    return this.#getBaseLevel()
  }

  get score() {
    return this.baseScore + this.#additionalLevels
  }

  set score(value) {
    this.#additionalLevels = value - this.baseScore;
  }

  get cost() {
    return this.#pointsPerLevel * this.#additionalLevels;
  }
}