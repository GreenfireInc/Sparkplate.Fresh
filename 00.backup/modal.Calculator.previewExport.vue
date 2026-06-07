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

            <TabsRoot v-model="activeTab" class="calc-export-tabs">
              <TabsList class="calc-export-tabs__list" aria-label="Export preview style">
                <TabsTrigger value="general" class="calc-export-tabs__trigger">
                  General
                </TabsTrigger>
                <TabsTrigger value="dynamic" class="calc-export-tabs__trigger">
                  Dynamic
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" class="calc-export-tabs__content">
                <TabCalculatorPreviewExportGeneral
                  :is-loading-preview="isLoadingPreview"
                  :preview-url="previewUrl"
                  :preview-alt="previewAlt"
                />
              </TabsContent>

              <TabsContent value="dynamic" class="calc-export-tabs__content">
                <TabCalculatorPreviewExportDynamic
                  ref="dynamicTabRef"
                  :is-loading-dynamic-preview="isLoadingDynamicPreview"
                  :has-dynamic-preview="hasDynamicPreview"
                  :preview-alt="previewAlt"
                />
              </TabsContent>
            </TabsRoot>

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
                :disabled="!canExport || isExporting"
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
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'radix-vue'
import { X } from 'lucide-vue-next'
import { captureCalculatorCanvas } from '@/lib/cores/displayStandard/display.canvas.calculator.static'
import { mountCalculatorDynamicCanvas } from '@/lib/cores/displayStandard/display.canvas.calculator.dynamic'
import TabCalculatorPreviewExportGeneral from '@/components/modals/cryptocurrency/tabsFor.calculatorExportPreview/tab.Calculator.previewExport.general.vue'
import TabCalculatorPreviewExportDynamic from '@/components/modals/cryptocurrency/tabsFor.calculatorExportPreview/tab.Calculator.previewExport.dynamic.vue'
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

const activeTab = ref<'general' | 'dynamic'>('general')
const previewUrl = ref('')
const isLoadingPreview = ref(false)
const isLoadingDynamicPreview = ref(false)
const hasDynamicPreview = ref(false)
const dynamicTabRef = ref<InstanceType<typeof TabCalculatorPreviewExportDynamic> | null>(null)
const isExporting = ref(false)

const canExport = computed(() => {
  if (activeTab.value === 'general') return Boolean(previewUrl.value)
  return hasDynamicPreview.value
})

const suggestedFilename = computed(() => {
  if (!props.snapshot) return ''
  return generateCalculatorSnapshotFilename(props.snapshot.from.symbol, props.snapshot.to.symbol)
})

const previewAlt = computed(() => {
  if (!props.snapshot) return 'Calculator export preview'
  const { from, to, amount, solution } = props.snapshot
  return `${amount} ${from.symbol} to ${solution.amount} ${to.symbol}`
})

async function buildGeneralPreview() {
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

async function buildDynamicPreview() {
  if (!props.isOpen || !props.snapshot) {
    hasDynamicPreview.value = false
    return
  }

  isLoadingDynamicPreview.value = true
  hasDynamicPreview.value = false

  try {
    await nextTick()
    const canvas = dynamicTabRef.value?.getCanvasElement()
    if (!canvas) return

    await mountCalculatorDynamicCanvas(canvas, props.snapshot, {
      width: 768,
      height: 1024,
    })
    hasDynamicPreview.value = true
  } catch (error) {
    console.error('Calculator dynamic preview error:', error)
    hasDynamicPreview.value = false
  } finally {
    isLoadingDynamicPreview.value = false
  }
}

async function buildPreviews() {
  await buildGeneralPreview()
  if (activeTab.value === 'dynamic') {
    await buildDynamicPreview()
  }
}

function resetPreviews() {
  previewUrl.value = ''
  hasDynamicPreview.value = false
  isExporting.value = false
  isLoadingPreview.value = false
  isLoadingDynamicPreview.value = false
}

watch(
  () => [props.isOpen, props.snapshot] as const,
  () => {
    if (props.isOpen) {
      buildPreviews()
    } else {
      resetPreviews()
    }
  },
  { deep: true },
)

watch(activeTab, async (tab) => {
  if (tab === 'dynamic' && props.isOpen && props.snapshot && !isLoadingDynamicPreview.value) {
    await buildDynamicPreview()
  }
})

function closeModal() {
  emit('close')
}

async function handleExport() {
  if (!canExport.value || !props.snapshot) return

  isExporting.value = true

  try {
    let dataUrl = previewUrl.value

    if (activeTab.value === 'dynamic') {
      const canvas = dynamicTabRef.value?.getCanvasElement()
      if (!canvas) return
      dataUrl = canvas.toDataURL('image/png')
    }

    await exportCalculatorSnapshotToPNG(dataUrl, suggestedFilename.value)
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

.calc-export-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calc-export-tabs__list {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f3f4f6;
  border-radius: 0.625rem;
}

.calc-export-tabs__trigger {
  flex: 1;
  padding: 0.375rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;

  &[data-state='active'] {
    color: #5b21b6;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  &:hover:not([data-state='active']) {
    color: #374151;
  }
}

.calc-export-tabs__content {
  outline: none;
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
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
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
