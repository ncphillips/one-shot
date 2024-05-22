<template>
  <RouterView />
  <Toaster />
</template>
<script setup lang="ts">
import { provideToaster } from "./composables/useToaster";
import Toaster from "./components/Toaster.vue";
provideToaster();
</script>
