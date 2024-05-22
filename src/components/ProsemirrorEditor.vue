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
import { EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";
import { createState } from "./prosemirror-editor/state";

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

  if (el) {
    createEditor(el, modelValue);
  }
});

function createEditor(target: HTMLElement, modelValue: Ref<Node>) {
  let state = createState(modelValue.value);

  emit("init:state", state);

  let view = new EditorView(target, {
    state,
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

    emit("init:state", state);
  });

  emit("init:view", view);
}
</script>
<style>
.ProseMirror {
  @apply px-3 py-2;
}
</style>
