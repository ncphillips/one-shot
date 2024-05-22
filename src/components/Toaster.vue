<template>
  <Teleport to="body">
    <div
      v-if="toast"
      class="min-w-5 fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-white rounded-lg shadow-pink-300 shadow-2xl"
    >
      {{ toast }}
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { useToaster } from "../composables/useToaster";

const { toast } = useToaster();
</script>
