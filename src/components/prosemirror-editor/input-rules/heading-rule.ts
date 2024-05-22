import { textblockTypeInputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export const headingRule = (schema: Schema) => [
  textblockTypeInputRule(/^(#+) $/, schema.nodes.heading, (match) => {
    return {
      level: match[1].length,
    };
  }),
];
