<template>
  <div class="calc-general-wrap">
    <div v-if="isLoadingPreview" class="calc-general-loading">
      <span class="calc-general-spinner" aria-hidden="true" />
      <span>Generating preview…</span>
    </div>
    <img
      v-else-if="previewUrl"
      :src="previewUrl"
      :alt="previewAlt"
      class="calc-general-image"
    />
    <p v-else class="calc-general-error">Could not generate preview.</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TabCalculatorPreviewExportGeneral' })

defineProps<{
  isLoadingPreview: boolean
  previewUrl: string
  previewAlt: string
}>()
</script>

<style scoped lang="scss">
.calc-general-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52vh;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}

.calc-general-image {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.calc-general-loading,
.calc-general-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.calc-general-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: calc-general-spin 0.8s linear infinite;
}

@keyframes calc-general-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
