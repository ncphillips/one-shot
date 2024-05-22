<template>
  <div
    ref="editorEl"
    class="whitespace-pre-wrap bg-slate-50 border rounded border-slate-300 w-full min-h-8"
  ></div>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue";
import { useVModel } from "@vueuse/core";

// Prosemirror
import { schema } from "prosemirror-schema-basic";
import { Command, EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { Node } from "prosemirror-model";

const props = defineProps<{
  modelValue: any;
}>();

const modelValue = useVModel(props, "modelValue");
const emit = defineEmits([
  "update:modelValue",
  "dispatch:transaction",
  "init:view",
  "init:state",
]);

const editorEl = ref<HTMLElement | null>(null);

onMounted(() => {
  const el = editorEl.value;

  if (!el) {
    console.log("Editor element not found!");
    // TODO: Error handling
    return;
  }

  createEditor(el, modelValue);
});

function createEditor(target: HTMLElement, modelValue: Ref<Node>) {
  let view = new EditorView(target, {
    state: createState(modelValue.value),
    dispatchTransaction(transaction) {
      let newState = view.state.apply(transaction);

      view.updateState(newState);

      if (transaction.docChanged) {
        let doc = newState.doc.toJSON();
        doc.attrs = { internalChange: true };
        modelValue.value = doc;
      }

      emit("dispatch:transaction", transaction);
    },
  });

  watch(modelValue, (newValue) => {
    if (newValue.attrs?.internalChange) {
      return;
    }

    view.updateState(createState(newValue));
  });

  emit("init:view", view);
}

function createState(jsonDoc?: any) {
  let doc: Node | undefined = jsonDoc
    ? schema.nodeFromJSON(jsonDoc)
    : undefined;

  const state = EditorState.create({
    doc,
    schema,
    plugins: [history(), keymap(createCustomKeymap()), keymap(baseKeymap)],
  });

  emit("init:state", state);
  return state;
}

function createCustomKeymap(): Record<string, Command> {
  return {
    "Mod-z": undo,
    "Mod-y": redo,
  };
}
</script>
