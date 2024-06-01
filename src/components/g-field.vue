<template>
  <label>
    <span class="block font-bold text-gray-700">{{ label }}</span>
    <slot></slot>
    <span v-if="error" class="block text-red-500">{{ error }}</span>
  </label>
</template>
<script lang="ts" setup>
export type InputFieldProps = {
  id: string
  label: string
  error: string
}

defineProps<InputFieldProps>()
</script>