import { undo, redo } from "prosemirror-history";
import { Command } from "prosemirror-state";

export function createCustomKeymap(): Record<string, Command> {
  return {
    "Mod-z": undo,
    "Mod-y": redo,
  };
}
