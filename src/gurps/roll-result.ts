export class RollResult {
  constructor(
    public readonly effectiveSkillLevel: number,
    public readonly value: number
  ) {
  }

  get success() {
    return this.value <= this.effectiveSkillLevel
  }

  get critSuccess() {
    let critMax = 4

    if (this.effectiveSkillLevel === 15) {
      critMax = 5
    } else if (this.effectiveSkillLevel >= 16) {
      critMax = 6
    }

    return this.value <= critMax
  }

  get critFailure() {
    return this.value >= 17
  }
}

