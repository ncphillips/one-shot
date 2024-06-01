import {Attribute} from "./attribute";
import {COST} from "./cost";

export class Intelligence extends Attribute {
  constructor() {
    super(COST.IQ, 10);
  }
}