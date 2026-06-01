<template>
  <Teleport to="body">
    <Transition name="calc-export-modal">
      <div
        v-if="isOpen"
        class="calc-export-modal-overlay"
        @click.self="closeModal"
      >
        <div class="calc-export-modal-container" role="dialog" aria-modal="true" aria-labelledby="calc-export-modal-title">
          <button
            type="button"
            class="calc-export-modal-close"
            aria-label="Close preview"
            @click="closeModal"
          >
            <X :size="20" />
          </button>

          <div class="calc-export-modal-content">
            <h2 id="calc-export-modal-title" class="calc-export-modal-title">Export preview</h2>
            <p class="calc-export-modal-subtitle">
              Review your calculator snapshot before saving as PNG.
            </p>

            <div class="calc-export-preview-wrap">
              <div v-if="isLoadingPreview" class="calc-export-preview-loading">
                <span class="calc-export-preview-spinner" aria-hidden="true" />
                <span>Generating preview…</span>
              </div>
              <img
                v-else-if="previewUrl"
                :src="previewUrl"
                :alt="previewAlt"
                class="calc-export-preview-image"
              />
              <p v-else class="calc-export-preview-error">Could not generate preview.</p>
            </div>

            <p v-if="suggestedFilename" class="calc-export-filename">
              Filename: <code>{{ suggestedFilename }}</code>
            </p>

            <div class="calc-export-modal-actions">
              <button
                type="button"
                class="calc-export-btn calc-export-btn--secondary"
                @click="closeModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="calc-export-btn calc-export-btn--primary"
                :disabled="!previewUrl || isExporting"
                @click="handleExport"
              >
                {{ isExporting ? 'Exporting…' : 'Export PNG' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import { captureCalculatorCanvas } from '@/lib/cores/displayStandard/display.canvas.calculator'
import type { CalculatorSnapshotData } from '@/lib/cores/exportStandard/filenameStructureAndContent.Calculator.snapshot'
import {
  exportCalculatorSnapshotToPNG,
  generateCalculatorSnapshotFilename,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.Calculator.snapshot'

defineOptions({ name: 'ModalCalculatorPreviewExport' })

const props = defineProps<{
  isOpen: boolean
  snapshot: CalculatorSnapshotData | null
}>()

const emit = defineEmits<{
  close: []
  exported: []
}>()

const previewUrl = ref('')
const isLoadingPreview = ref(false)
const isExporting = ref(false)

const suggestedFilename = computed(() => {
  if (!props.snapshot) return ''
  return generateCalculatorSnapshotFilename(props.snapshot.from.symbol, props.snapshot.to.symbol)
})

const previewAlt = computed(() => {
  if (!props.snapshot) return 'Calculator export preview'
  const { from, to, amount, solution } = props.snapshot
  return `${amount} ${from.symbol} to ${solution.amount} ${to.symbol}`
})

async function buildPreview() {
  if (!props.isOpen || !props.snapshot) {
    previewUrl.value = ''
    return
  }

  isLoadingPreview.value = true
  previewUrl.value = ''

  try {
    const canvas = await captureCalculatorCanvas(props.snapshot)
    previewUrl.value = canvas.toDataURL('image/png')
  } catch (error) {
    console.error('Calculator preview error:', error)
    previewUrl.value = ''
  } finally {
    isLoadingPreview.value = false
  }
}

watch(
  () => [props.isOpen, props.snapshot] as const,
  () => {
    if (props.isOpen) {
      buildPreview()
    } else {
      previewUrl.value = ''
      isExporting.value = false
    }
  },
  { deep: true },
)

function closeModal() {
  emit('close')
}

async function handleExport() {
  if (!previewUrl.value || !props.snapshot) return

  isExporting.value = true

  try {
    await exportCalculatorSnapshotToPNG(previewUrl.value, suggestedFilename.value)
    emit('exported')
    emit('close')
  } catch (error) {
    console.error('Calculator export error:', error)
    alert('Error exporting calculator snapshot. Please try again.')
  } finally {
    isExporting.value = false
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (typeof window === 'undefined') return
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<style scoped lang="scss">
.calc-export-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.75);
  overflow-y: auto;
}

.calc-export-modal-container {
  position: relative;
  width: 100%;
  max-width: 28rem;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.calc-export-modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
}

.calc-export-modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calc-export-modal-title {
  margin: 0;
  padding-right: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.calc-export-modal-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.calc-export-preview-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}

.calc-export-preview-image {
  display: block;
  width: 100%;
  max-height: 55vh;
  object-fit: contain;
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

.calc-export-filename {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;

  code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.72rem;
    color: #374151;
  }
}

.calc-export-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.calc-export-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s, border-color 0.15s;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.calc-export-btn--secondary {
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;

  &:hover:not(:disabled) {
    background: #f9fafb;
  }
}

.calc-export-btn--primary {
  color: #fff;
  background: #7c3aed;
  border: 1px solid #7c3aed;

  &:hover:not(:disabled) {
    background: #6d28d9;
  }
}

@keyframes calc-export-spin {
  to {
    transform: rotate(360deg);
  }
}

.calc-export-modal-enter-active,
.calc-export-modal-leave-active {
  transition: opacity 0.2s ease;
}

.calc-export-modal-enter-active .calc-export-modal-container,
.calc-export-modal-leave-active .calc-export-modal-container {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.calc-export-modal-enter-from,
.calc-export-modal-leave-to {
  opacity: 0;
}

.calc-export-modal-enter-from .calc-export-modal-container,
.calc-export-modal-leave-to .calc-export-modal-container {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
