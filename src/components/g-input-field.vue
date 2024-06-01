<template>
  <g-field :id="id" :label="label" :error="error">
    <input v-bind="$attrs" :type="type || 'text'"/>
  </g-field>
</template>
<script lang="ts" setup>
import GField from "./g-field.vue";

defineProps<{
  id?: string
  label: string
  error?: string
  type?: string
}>();
</script>

