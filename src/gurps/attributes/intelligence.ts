import {Attribute} from "../attribute.ts";
import {COST} from "./cost.ts";

export class Intelligence extends Attribute {
  constructor() {
    super(COST.IQ, 10);
  }
}