import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { inputRules } from "prosemirror-inputrules";
import { keymap } from "prosemirror-keymap";
import { createInputRules } from "./input-rules";
import { createCustomKeymap } from "./keymap";
import { Schema } from "prosemirror-model";

export function buildPlugins(schema: Schema) {
  return [
    history(),
    keymap(createCustomKeymap()),
    keymap(baseKeymap),
    inputRules(createInputRules(schema)),
  ];
}
