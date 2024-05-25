import {Attribute} from "../attribute.ts";
import {COST} from "./cost.ts";

export class Strength extends Attribute {
  constructor() {
    super(COST.ST, 10);
  }
}
