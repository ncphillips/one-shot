import { InputRule, textblockTypeInputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export function createInputRules(schema: Schema): { rules: InputRule[] } {
  return {
    rules: [
      // # Heading
      textblockTypeInputRule(/^(#)+ $/, schema.nodes.heading, (match) => {
        console.log(match);
        return {
          level: match[1].length,
        };
      }),
    ],
  };
}
