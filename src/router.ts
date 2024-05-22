import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";

const routes: RouterOptions["routes"] = [
  { path: "/", component: Index }, //
  {
    name: "adventure.scene.show",
    path: "/adventures/:adventureSlug/scenes/:sceneId",
    component: () => import("./pages/Scene/Show.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
