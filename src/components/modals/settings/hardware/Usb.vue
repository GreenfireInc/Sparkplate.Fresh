<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="usb-modal-overlay" />
      <DialogContent
        class="usb-modal-content"
        :aria-describedby="undefined"
      >
        <DialogTitle class="usb-modal-title">
          {{ drive?.description || 'USB Device' }}
        </DialogTitle>
        <div v-if="drive" class="usb-modal-body">
          <div
            v-for="(detail, idx) in drive.mountDetails"
            :key="idx"
            class="usb-detail-block"
          >
            <p class="usb-detail-line">
              <span class="usb-detail-label">Mount:</span>
              {{ detail.path }}
            </p>
            <p class="usb-detail-line">
              <span class="usb-detail-label">Size:</span>
              {{ formatBytes(detail.size ?? drive.size) }}
            </p>
            <p class="usb-detail-line">
              <span class="usb-detail-label">Filesystem:</span>
              {{ detail.filesystem }}
            </p>
            <p v-if="detail.freespace != null" class="usb-detail-line">
              <span class="usb-detail-label">Freespace:</span>
              {{ formatBytes(detail.freespace) }}
            </p>
            <p v-if="detail.used != null" class="usb-detail-line">
              <span class="usb-detail-label">Used:</span>
              {{ formatBytes(detail.used) }}
            </p>
          </div>
          <div v-if="!drive.mountDetails?.length && drive.mountpoints?.length" class="usb-detail-block">
            <p class="usb-detail-line">
              <span class="usb-detail-label">Mount:</span>
              {{ drive.mountpoints.join(', ') }}
            </p>
            <p class="usb-detail-line">
              <span class="usb-detail-label">Size:</span>
              {{ formatBytes(drive.size) }}
            </p>
          </div>
          <div v-if="!drive.mountDetails?.length && !drive.mountpoints?.length" class="usb-detail-block">
            <p class="usb-detail-line">
              <span class="usb-detail-label">Size:</span>
              {{ formatBytes(drive.size) }}
            </p>
            <p class="usb-detail-line usb-detail-muted">Not mounted</p>
          </div>
        </div>
        <!-- <DialogClose as-child>
          <button class="usb-modal-close" aria-label="Close">
            &times;
          </button>
        </DialogClose> -->
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
import type { UsbDriveInfo } from '@/components/partials/hardware/usb'

const props = defineProps<{
  modelValue: boolean
  drive: UsbDriveInfo | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function formatBytes(bytes: number | null, decimals = 0): string {
  if (!bytes || bytes <= 0) return '—'
  const kb = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(kb))
  return `${parseFloat((bytes / Math.pow(kb, i)).toFixed(dm))} ${sizes[i]}`
}
</script>

<style scoped>
.usb-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.usb-modal-content {
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

.usb-modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.usb-modal-body {
  margin-bottom: 1rem;
}

.usb-detail-block {
  margin-bottom: 1rem;
}

.usb-detail-block:last-child {
  margin-bottom: 0;
}

.usb-detail-line {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0;
}

.usb-detail-label {
  font-weight: 500;
  color: #374151;
  margin-right: 0.5rem;
}

.usb-detail-muted {
  color: #9ca3af;
  font-style: italic;
}

.usb-modal-close {
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

.usb-modal-close:hover {
  color: #374151;
}
</style>
