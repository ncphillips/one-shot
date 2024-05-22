import { wrappingInputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export const blockquoteRule = (schema: Schema) => [
  wrappingInputRule(/^> $/, schema.nodes.blockquote),
];
