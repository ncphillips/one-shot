import {Attribute} from "../attribute.ts";
import {COST} from "./cost.ts";

export class Dexterity extends Attribute {
  constructor() {
    super(COST.DX, 10);
  }
}