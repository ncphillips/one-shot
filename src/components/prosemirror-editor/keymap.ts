import { toggleMark } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { Command } from "prosemirror-state";
import { schema } from "./schema";

export function createCustomKeymap(): Record<string, Command> {
  return {
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-b": toggleMark(schema.marks.strong),
    "Mod-i": toggleMark(schema.marks.em),
  };
}
