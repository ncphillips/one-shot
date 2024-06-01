import {Attribute} from "./attribute";

export class Reserve extends Attribute {
  constructor(baseAttribute: Attribute, cost: number) {
    super(cost, () => baseAttribute.score)
  }

  get total() {
    return this.score
  }

  set total(value: number) {
    this.score = value;
  }
}
