import {d6} from "./dice/d6";

export class SuccessRoll {
  constructor(
    public readonly skillLevel: number,
    public readonly modifier: number = 0,
    public readonly value: number = d6() + d6() + d6()
  ) {
  }

  get effectiveSkillLevel() {
    return (this.skillLevel + this.modifier)
  }

  get passed() {
    if (this.critFailure) return false
    if (this.critSuccess) return true
    return this.value <= this.effectiveSkillLevel
  }

  get failed() {
    return !this.passed
  }

  get critSuccess() {
    return this.value <= this.critSuccessMax
  }

  get critFailure() {
    return this.value >= this.critFailureMin
  }

  private get critSuccessMax() {
    if (this.effectiveSkillLevel === 15) return 5
    if (this.effectiveSkillLevel >= 16) return 6
    return 4
  }

  private get critFailureMin() {
    if ((this.effectiveSkillLevel + 10) <= 17) return this.effectiveSkillLevel + 10;
    if (this.effectiveSkillLevel <= 15) return 17
    return 18
  }
}

