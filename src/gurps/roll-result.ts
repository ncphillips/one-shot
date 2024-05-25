export class RollResult {
  constructor(
    public readonly target: number,
    public readonly value: number
  ) {
  }

  get success() {
    return this.value <= this.target
  }
}

