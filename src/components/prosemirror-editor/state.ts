import { baseKeymap } from "prosemirror-commands";
import { inputRules } from "prosemirror-inputrules";
import { keymap } from "prosemirror-keymap";
import { EditorState } from "prosemirror-state";
import { createInputRules } from "./input-rules";
import { createCustomKeymap } from "./keymap";
import { schema } from "./schema";
import { Node } from "prosemirror-model";
import { history } from "prosemirror-history";

export function createState(jsonDoc: any | undefined) {
  let doc: Node | undefined = jsonDoc
    ? schema.nodeFromJSON(jsonDoc)
    : undefined;

  const state = EditorState.create({
    doc,
    schema,
    plugins: [
      history(),
      keymap(createCustomKeymap()),
      keymap(baseKeymap),
      inputRules(createInputRules(schema)),
    ],
  });

  return state;
}
