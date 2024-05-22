import { InputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";
import { headingRule } from "./heading-rule";
import { blockquoteRule } from "./blockquote-rule";

export function createInputRules(schema: Schema): { rules: InputRule[] } {
  return {
    rules: [...headingRule(schema), ...blockquoteRule(schema)],
  };
}
