import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";

const routes: RouterOptions["routes"] = [
  { path: "/", component: Index }, //
  {
    path: "/adventures/:adventureSlug",
    children: [
      {
        name: "adventure.edit",
        path: "edit",
        component: () => import("./pages/Adventures/Edit.vue"),
      },
      {
        name: "adventure.scene.show",
        path: "scenes/:sceneId",
        component: () => import("./pages/Scene/Show.vue"),
      },
    ],
  },
  {
    path: "/characters/",
    children: [
      {
        name: "characters.create",
        path: "create",
        component: () => import("./pages/Characters/Create.vue"),
      },
    ],
  },
  {
    name: "prosemirror-playground",
    path: "/prosemirror-playground",
    component: () => import("./pages/ProsemirrorPlayground.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
