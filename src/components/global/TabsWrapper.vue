<template>
  <div class="tabs-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabsWrapper'
})
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}
</style> 