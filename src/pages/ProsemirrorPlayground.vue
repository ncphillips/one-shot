<template>
  <main class="my-2 mx-4">
    <h1 id="content">Prosemirror Playground</h1>
    <prosemirror-editor
      v-model="content"
      @dispatch:transaction="console.log($event)"
    />

    <hr />

    <pre><code>{{ JSON.stringify(content, null, 2) }}</code></pre>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ProsemirrorEditor from "../components/ProsemirrorEditor.vue";

const content = ref();
</script>
