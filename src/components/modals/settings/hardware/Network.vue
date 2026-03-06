<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="network-modal-overlay" />
      <DialogContent
        class="network-modal-content"
        :aria-describedby="undefined"
      >
        <DialogTitle class="network-modal-title">
          <span :title="interfaceNameTooltip">{{ adapter?.device || 'Network Interface' }}</span>
        </DialogTitle>
        <div v-if="adapter" class="network-modal-body">
          <dl class="network-details-grid">
            <dt class="network-detail-label">Interface</dt>
            <dd class="network-detail-value">{{ adapter.interface || '—' }}</dd>

            <dt class="network-detail-label">Manufacturer</dt>
            <dd class="network-detail-value">{{ adapter.manufacturer || '—' }}</dd>

            <dt class="network-detail-label">Chipset</dt>
            <dd class="network-detail-value">{{ adapter.chipset || '—' }}</dd>

            <dt class="network-detail-label">Driver</dt>
            <dd class="network-detail-value">{{ adapter.driver || '—' }}</dd>

            <dt v-if="adapter.mac && adapter.mac !== '—'" class="network-detail-label">MAC</dt>
            <dd v-if="adapter.mac && adapter.mac !== '—'" class="network-detail-value">{{ adapter.mac }}</dd>

            <dt v-if="adapter.ipAddresses.length" class="network-detail-label">IP Addresses</dt>
            <dd v-if="adapter.ipAddresses.length" class="network-detail-value">{{ adapter.ipAddresses.join(', ') }}</dd>
          </dl>
        </div>
        <DialogClose as-child>
          <button class="network-modal-close" aria-label="Close">
            &times;
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue'
import type { NetworkAdapterInfo } from '@/components/partials/hardware/network'
import { explainInterfaceName } from '@/components/partials/tooltips/network.linux'

const props = defineProps<{
  modelValue: boolean
  adapter: NetworkAdapterInfo | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const interfaceNameTooltip = computed(() => {
  const device = props.adapter?.device
  return device ? explainInterfaceName(device) : ''
})
</script>

<style scoped>
.network-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.network-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  z-index: 9999;
}

.network-modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.network-modal-body {
  margin-bottom: 1rem;
}

.network-details-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.375rem 1.5rem;
  font-size: 0.875rem;
  margin: 0;
}

.network-detail-label {
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

.network-detail-value {
  color: #111827;
  margin: 0;
}

.network-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
}

.network-modal-close:hover {
  color: #374151;
}
</style>
