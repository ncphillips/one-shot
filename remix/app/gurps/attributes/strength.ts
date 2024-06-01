import {Attribute} from "./attribute";
import {COST} from "./cost";

export class Strength extends Attribute {
  constructor() {
    super(COST.ST, 10);
  }
}
