<template>
  <main class="my-2 mx-4">
    <form v-if="adventure">
      <h1>Edit Adventure</h1>

      <button @click.prevent="copyFormToClipboard()" class="btn primary">
        Copy JSON
      </button>

      <label>
        <span class="block">Title</span>
        <input type="text" v-model="adventure.title" />
      </label>

      <fieldset>
        <legend>Author</legend>
        <label>
          <span class="block">Name</span>
          <input type="text" v-model="adventure.author.name" />
        </label>
      </fieldset>
      <div class="flex justify-between">
        <h2>Scenes</h2>
        <button type="button" class="btn primary" @click.prevent="addScene()">
          Add Scene
        </button>
      </div>
      <fieldset
        v-for="(scene, key) of adventure.scenes"
        :key="key"
        :id="`scene-${key}`"
      >
        <label>
          <span class="block">Title</span>
          <input type="text" v-model="scene.title" />
        </label>
        <label>
          <span class="block">Content</span>
          <textarea v-model="scene.content" rows="8"></textarea>
        </label>
        <fieldset>
          <legend>What next?</legend>

          <div v-for="sceneReference in scene.next">
            <div class="flex gap-3">
              <label>
                <span class="block">Text</span>
                <input type="text" v-model="sceneReference.text" />
              </label>
              <label>
                <span class="block">Scene</span>
                <select v-model="sceneReference.sceneId">
                  <option>Select</option>
                  <option
                    v-for="(scene, key) of adventure.scenes"
                    :key="key"
                    :value="scene.id"
                  >
                    {{ scene.id }}: {{ scene.title }}
                  </option>
                </select>
              </label>
            </div>
            <div v-if="!sceneExists(sceneReference.sceneId)">
              <p>
                This scene links to a scene that doesn't exist yet. Choose a new
                scene from the dropdown, or add a new scene below..
              </p>
              <button
                type="button"
                class="underline"
                @click.prevent="createScene({ id: sceneReference.sceneId })"
              >
                Add Scene
              </button>
            </div>
          </div>
        </fieldset>
      </fieldset>
    </form>
  </main>
</template>
<script lang="ts" setup>
import { useRouteParams } from "@vueuse/router";
import { onMounted, reactive } from "vue";
import { Adventure } from "../../types/adventure";
import { useToaster } from "../../composables/useToaster";
import { Scene } from "../../types/scene";

const adventureId = useRouteParams<string>("adventureSlug");

const adventure = reactive<Adventure>({
  title: "",
  source: "",
  author: {
    name: "",
  },
  scenes: [],
});

const { showToast } = useToaster();

onMounted(async () => {
  try {
    const data = await import(
      `../../data/adventures/${adventureId.value}.json`
    );
    for (const key in data.default) {
      // @ts-ignore
      adventure[key] = data.default[key];
    }
  } catch (error) {
    console.error("Error importing JSON data:", error);
  }
});

function addScene() {
  adventure.scenes.push({
    id: "",
    title: "",
    content: "",
    next: [],
  });

  const latestSceneIndex = adventure.scenes.length - 1;

  setTimeout(() => {
    focusOnSceneTitle(latestSceneIndex);
  }, 100);
}

function focusOnSceneTitle(index: number) {
  const scene = document.getElementById(`scene-${index}`);
  if (!scene) return;
  const title = scene.querySelector("input");
  if (!title) return;
  title.focus();
}

function copyFormToClipboard() {
  const json = JSON.stringify(adventure, null, 2);
  navigator.clipboard.writeText(json);
  showToast("Copied to clipboard!");
}

function sceneExists(sceneId: number) {
  return adventure.scenes.some((scene) => scene.id === sceneId);
}

function createScene(scene: Partial<Scene>) {
  return {
    id: "",
    title: "",
    content: "",
    next: [],
    ...scene,
  };
}
</script>
