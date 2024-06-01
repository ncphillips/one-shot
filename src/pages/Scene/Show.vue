<template>
  <main>
    <h1>{{ adventure?.title }}</h1>
    <section v-if="adventure && currentScene" id="current-scene">
      <h2>{{ currentScene.title }}</h2>
      <ProsemirrorEditor
        v-model="currentScene.content"
        class="prosemirror-editor"
        disabled
      />
      <div v-if="currentScene.next.length">
        <h2>What do you do next?</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="nextScene in currentScene.next"
            :key="nextScene.sceneId"
            class="mt-1 list-item"
          >
            <router-link
              class="underline"
              :to="{
                name: 'adventure.scene.show',
                params: { adventureId: 1, sceneId: nextScene.sceneId },
              }"
            >
              {{ nextScene.text }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <h2>You've reached the end of {{ adventure.title }}.</h2>
      </div>
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
import ProsemirrorEditor from "../../components/ProsemirrorEditor.vue";

const adventureId = useRouteParams<string>("adventureSlug");
const sceneId = useRouteParams<string>("sceneId");

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
  () =>
    adventure.value?.scenes.find((scene) => scene.id === sceneId.value) || null
);
</script>
