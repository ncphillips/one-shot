import {
  InputRule,
  textblockTypeInputRule,
  wrappingInputRule,
} from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export function createInputRules(schema: Schema): { rules: InputRule[] } {
  return {
    rules: [...headingRules(schema), ...blockquoteRules(schema)],
  };
}

const headingRules = (schema: Schema) => [
  textblockTypeInputRule(/^(#+) $/, schema.nodes.heading, (match) => {
    return {
      level: match[1].length,
    };
  }),
];

const blockquoteRules = (schema: Schema) => [
  wrappingInputRule(/^> $/, schema.nodes.blockquote),
];
