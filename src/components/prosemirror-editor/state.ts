import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import { Node } from "prosemirror-model";
import { buildPlugins } from "./plugins";

export function createState(jsonDoc: any | undefined) {
  let doc: Node | undefined = jsonDoc
    ? schema.nodeFromJSON(jsonDoc)
    : undefined;

  const state = EditorState.create({
    doc,
    schema,
    plugins: buildPlugins(schema),
  });

  return state;
}
