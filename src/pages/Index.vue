<template>
  <h1>Solo GURPS</h1>

  Num adventures: {{ jsonFiles.length }}
  <ul>
    <li v-for="file in jsonFiles" :key="file.slug">
      <RouterLink
        class="underline"
        :to="{
          name: 'adventure.scene.show',
          params: { adventureSlug: file.slug, sceneId: 1 },
        }"
      >
        {{ file.title }} by <em>{{ file.author.name }}</em>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { Adventure } from "../types/adventure";

const jsonFiles = ref<{ slug: string; title: string; author: Author }[]>([]);

onMounted(async () => {
  const modules = import.meta.glob("../data/adventures/**/*.json");
  console.log(modules); // Debug: Check if the modules are being detected

  for (const path in modules) {
    const slug = path.split("/").slice(-1)[0].replace(".json", "");
    const module = (await modules[path]()) as any as {
      default: Adventure;
    };
    const { title, author } = module.default;

    jsonFiles.value.push({ slug, title, author });
  }
});
</script>
