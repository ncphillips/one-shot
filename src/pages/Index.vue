<template>
  <main>
    <h1 class="mb-5">Solo GURPS</h1>

    <RouterLink class="btn primary" to="/characters/create">
      Create a Character
    </RouterLink>

    <h2 class="mt-5">Your Adventures</h2>
    <ul class="flex flex-col gap-4">
      <li
        v-for="file in jsonFiles"
        :key="file.slug"
        class="flex flex-col border rounded shadow bg-white p-4"
      >
        <div>
          <h2>{{ file.title }}</h2>
          <p>
            by <em>{{ file.author.name }}</em>
          </p>
        </div>

        <div class="flex gap-2">
          <RouterLink
            class="btn primary sm"
            :to="{
              name: 'adventure.scene.show',
              params: { adventureSlug: file.slug, sceneId: 1 },
            }"
          >
            Play
          </RouterLink>
          <RouterLink
            class="btn secondary sm"
            :to="{
              name: 'adventure.edit',
              params: { adventureSlug: file.slug },
            }"
          >
            Edit
          </RouterLink>
        </div>
      </li>
    </ul>
  </main>
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
