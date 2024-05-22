<template>
  <main class="my-2 mx-4">
    <h1 id="content">Prosemirror Playground</h1>

    <prosemirror-editor
      class="my-8"
      v-model="content"
      @dispatch:transaction="console.log('Transaction Dispatched:', $event)"
      @init:view="console.log('EditorView initialized')"
      @init:state="console.log('EditorState initialized')"
    />

    <pre><code>{{ JSON.stringify(content, null, 2) }}</code></pre>
  </main>
</template>
<script setup lang="ts">
import ProsemirrorEditor from "../components/ProsemirrorEditor.vue";
import { useLocalStorage } from "@vueuse/core";

const content = useLocalStorage("prosemirror-content", "", {
  serializer: {
    read: (value) => JSON.parse(value),
    write: (value) => JSON.stringify(value),
  },
});
</script>
