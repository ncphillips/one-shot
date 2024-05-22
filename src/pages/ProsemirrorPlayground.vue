<template>
  <main class="my-2 mx-4">
    <h1 id="content">Prosemirror Playground</h1>

    <prosemirror-editor
      v-model="content"
      @dispatch:transaction="console.log('Transaction Dispatched:', $event)"
      @init:view="console.log('EditorView initialized')"
      @init:state="console.log('EditorState initialized')"
    />

    <hr />

    <pre><code>{{ JSON.stringify(content, null, 2) }}</code></pre>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ProsemirrorEditor from "../components/ProsemirrorEditor.vue";

const content = ref({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "tests",
        },
      ],
    },
  ],
});
</script>
