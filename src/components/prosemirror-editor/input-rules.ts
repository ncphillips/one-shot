import {
  InputRule,
  textblockTypeInputRule,
  wrappingInputRule,
} from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export function createInputRules(schema: Schema): { rules: InputRule[] } {
  return {
    rules: [headingRule(schema), blockquoteRule(schema)],
  };
}

const headingRule = (schema: Schema) =>
  textblockTypeInputRule(/^(#+) $/, schema.nodes.heading, (match) => {
    return {
      level: match[1].length,
    };
  });

const blockquoteRule = (schema: Schema) => {
  const r = wrappingInputRule(/^> $/, schema.nodes.blockquote);
  console.log(r);
  return r;
};
