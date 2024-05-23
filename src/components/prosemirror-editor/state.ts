import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import { DOMParser, Node } from "prosemirror-model";
import { buildPlugins } from "./plugins";

export function createState(content: any | undefined) {
  let doc: Node | undefined;
  if (typeof content === "object") {
    doc = schema.nodeFromJSON(content);
  } else if (typeof content === "string") {
    const container = document.createElement("div");
    container.innerHTML = `<p>${content}</p>`;
    doc = DOMParser.fromSchema(schema).parse(container);
  }
  const state = EditorState.create({
    doc,
    schema,
    plugins: buildPlugins(schema),
  });

  return state;
}
