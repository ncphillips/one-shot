import {Attribute} from "./attribute";
import {COST} from "./cost";

export class Health extends Attribute {
  constructor() {
    super(COST.ST, 10);
  }
}
