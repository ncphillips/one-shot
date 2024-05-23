<template>
  <main class="my-2 mx-4">
    <form v-if="adventure" @submit="copyFormToClipboard()">
      <h1>Edit Adventure</h1>

      <button type="submit" class="btn primary">Copy JSON</button>

      <label>
        <span class="block">Title</span>
        <input type="text" v-model="adventure.title" required />
      </label>

      <label>
        <span class="block">Source</span>
        <input type="text" v-model="adventure.source" required />
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
        <div>
          Linked to by:
          <button
            class="btn sm white"
            v-for="linkedScene in findScenesThatLinkToThisScene(scene.id)"
            @click.prevent="focusOnSceneById(linkedScene.id)"
          >
            {{ linkedScene.id }}: {{ linkedScene.title }}
          </button>
        </div>
        <button
          type="button"
          class="btn sm danger"
          @click.prevent="adventure.scenes.splice(key, 1)"
          :disabled="findScenesThatLinkToThisScene(scene.id).length > 0"
        >
          Delete Scene
        </button>

        <div class="flex gap-3">
          <label class="w-20">
            <span class="block">ID</span>
            <input type="text" v-model="scene.id" required />
          </label>
          <label class="flex-grow">
            <span class="block">Title</span>
            <input type="text" v-model="scene.title" required />
          </label>
        </div>
        <label>
          <span class="block">Content</span>
          <textarea v-model="scene.content" rows="8"></textarea>
        </label>
        <fieldset>
          <legend>What next?</legend>

          <div v-for="sceneReference in scene.next">
            <div class="flex items-end gap-3">
              <label>
                <span class="block">Text</span>
                <input type="text" v-model="sceneReference.text" required />
              </label>
              <label>
                <span class="block">Scene</span>
                <select v-model="sceneReference.sceneId" required>
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

              <button
                v-if="sceneExists(sceneReference.sceneId)"
                class="underline"
                @click.prevent="focusOnSceneById(sceneReference.sceneId)"
              >
                Edit Scene
              </button>
              <button
                v-else
                type="button"
                class="underline"
                @click.prevent="addScene({ id: sceneReference.sceneId })"
              >
                Add Missing Scene
              </button>
            </div>
            <div v-if="!sceneExists(sceneReference.sceneId)">
              <p class="text-sm">
                This scene links to a scene that doesn't exist yet. <br />
                Choose a new scene from the dropdown, or add the missing scene.
              </p>
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

function addScene(scene?: Partial<Scene>) {
  adventure.scenes.push({
    id: "",
    title: "",
    content: "",
    next: [],
    ...scene,
  });

  const latestSceneIndex = adventure.scenes.length - 1;

  setTimeout(() => {
    focusOnSceneByIndex(latestSceneIndex);
  }, 100);
}

function focusOnSceneByIndex(index: number) {
  const scene = document.getElementById(`scene-${index}`);
  if (!scene) return;
  const title = scene.querySelector("input");
  if (!title) return;
  title.focus();
}

function focusOnSceneById(sceneId: string) {
  const index = adventure.scenes.findIndex((scene) => scene.id === sceneId);
  if (index === -1) return;
  focusOnSceneByIndex(index);
}

function copyFormToClipboard() {
  const json = JSON.stringify(adventure, null, 2);
  navigator.clipboard.writeText(json);
  showToast("Copied to clipboard!");
}

function sceneExists(sceneId: string) {
  return adventure.scenes.some((scene) => scene.id === sceneId);
}

function findScenesThatLinkToThisScene(sceneId: string) {
  return adventure.scenes.filter((scene) =>
    scene.next.some((sceneReference) => sceneReference.sceneId === sceneId)
  );
}
</script>
