<template>
  <div ref="previewContainerRef" class="calc-export-preview-wrap calc-export-preview-wrap--dynamic">
    <div v-if="isLoadingDynamicPreview" class="calc-export-preview-loading">
      <span class="calc-export-preview-spinner" aria-hidden="true" />
      <span>Generating dynamic preview…</span>
    </div>
    <div v-show="!isLoadingDynamicPreview && hasDynamicPreview" class="calc-export-preview-stage">
      <canvas
        ref="canvasRef"
        class="calc-export-preview-canvas"
        :aria-label="previewAlt"
      />
    </div>
    <p v-if="!isLoadingDynamicPreview && !hasDynamicPreview" class="calc-export-preview-error">
      Could not generate dynamic preview.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'TabCalculatorPreviewExportDynamic' })

defineProps<{
  isLoadingDynamicPreview: boolean
  hasDynamicPreview: boolean
  previewAlt: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const previewContainerRef = ref<HTMLElement | null>(null)

function getCanvasElement(): HTMLCanvasElement | null {
  return canvasRef.value
}

function getPreviewContainer(): HTMLElement | null {
  return previewContainerRef.value
}

defineExpose({ getCanvasElement, getPreviewContainer })
</script>

<style scoped lang="scss">
.calc-export-preview-wrap--dynamic {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  overflow: hidden;
}

.calc-export-preview-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.calc-export-preview-canvas {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.calc-export-preview-loading,
.calc-export-preview-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.calc-export-preview-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: calc-export-spin 0.8s linear infinite;
}

@keyframes calc-export-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
