import { createMemoryHistory, createRouter } from "vue-router";
import Index from "./pages/Index.vue";

const routes = [{ path: "/", component: Index }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
