<template>
  <main class="my-2 mx-4">
    <h1 class="text-xl bold">{{ adventure?.name }}</h1>
    <section v-if="currentScene" id="current-scene">
      <p class="whitespace-pre-wrap">{{ currentScene.content }}</p>
      <ul>
        <li
          v-for="nextScene in currentScene.next"
          :key="nextScene.scene"
          class="mt-1"
        >
          {{ nextScene.text }}, go to
          <router-link
            class="underline"
            :to="{
              name: 'adventure.scene.show',
              params: { adventureId: 1, sceneId: nextScene.scene },
            }"
          >
            Scene {{ nextScene.scene }}
          </router-link>
        </li>
      </ul>
    </section>
    <section v-else>
      <h2 class="text-lg bold">Uh oh!</h2>
      <p>You've hit a dead end.</p>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { useRouteParams } from "@vueuse/router";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Adventure } from "../../types/adventure";
import { Scene } from "../../types/scene";

const adventureId = useRouteParams<string>("adventureSlug");
const sceneId = useRouteParams<number>("sceneId");

const adventure = ref<Adventure | null>(null);

onMounted(async () => {
  try {
    const data = await import(
      `../../data/adventures/${adventureId.value}.json`
    );
    adventure.value = data.default;
  } catch (error) {
    console.error("Error importing JSON data:", error);
  }
});

const currentScene = computed<Scene | null>(
  () => adventure.value?.scenes[sceneId.value] || null
);
</script>
