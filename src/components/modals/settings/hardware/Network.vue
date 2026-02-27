<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="network-modal-overlay" />
      <DialogContent
        class="network-modal-content"
        :aria-describedby="undefined"
      >
        <DialogTitle class="network-modal-title">
          {{ adapter?.device || 'Network Interface' }}
        </DialogTitle>
        <div v-if="adapter" class="network-modal-body">
          <p class="network-details">
            <span v-if="adapter.mac && adapter.mac !== '—'">MAC: {{ adapter.mac }}</span>
            <span v-if="adapter.mac && adapter.mac !== '—' && adapter.ipAddresses.length"> · </span>
            <span v-if="adapter.ipAddresses.length">IP: {{ adapter.ipAddresses.join(', ') }}</span>
          </p>
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

.network-details {
  font-size: 0.875rem;
  color: #6b7280;
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
