<template>
  <div class="structure-import-wallet-address">
    <button
      type="button"
      class="icon-button"
      @click.stop="emit('upload-json')"
      title="Upload JSON"
    >
      <Upload :size="20" />
    </button>
    <button
      type="button"
      class="icon-button"
      @click.stop="emit('scan-qr')"
      title="Scan QR Code"
    >
      <Camera :size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Camera, Upload } from 'lucide-vue-next'

defineOptions({ name: 'StructureImportWalletAddress' })

const emit = defineEmits<{
  'upload-json': []
  'scan-qr': []
}>()
</script>

<style scoped lang="scss">
.structure-import-wallet-address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.icon-button {
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.65rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  transition: background-color 0.2s, border-color 0.2s;
}

.icon-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}
</style>
