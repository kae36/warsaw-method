<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  return false
})
</script>

<template>
  <div v-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    <p>Something went wrong: {{ error.message }}</p>
  </div>
  <slot v-else></slot>
</template>