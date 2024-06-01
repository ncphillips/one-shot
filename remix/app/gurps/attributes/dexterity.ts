import {Attribute} from "./attribute";
import {COST} from "./cost";

export class Dexterity extends Attribute {
  constructor() {
    super(COST.DX, 10);
  }
}