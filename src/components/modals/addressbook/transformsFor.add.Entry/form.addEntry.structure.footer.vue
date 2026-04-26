<template>
  <div class="ac-modal__actions">
    <button
      type="submit"
      class="ac-btn ac-btn--primary"
      :disabled="submitDisabled"
    >
      {{ submitLabel }}
    </button>
    <template v-if="showImport">
      <input
        ref="fileInputRef"
        type="file"
        :accept="importAccept"
        class="ac-file-input"
        @change="onFileChange"
      />
      <button type="button" class="ac-btn ac-btn--import" @click="onImportClick">Import</button>
    </template>
    <button type="button" class="ac-btn ac-btn--secondary" @click="emit('cancel')">Cancel</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'FormAddEntryFooter' })

withDefaults(
  defineProps<{
    /** Primary submit button label (e.g. Save contact, Add Exchange). */
    submitLabel: string
    /** Show hidden file input + Import (same order as other add-entry forms: submit, import, cancel). */
    showImport?: boolean
    /** e.g. JSON-only for exchange/wallet rows, or vCard + JSON for contact-style tabs. */
    importAccept?: string
    submitDisabled?: boolean
  }>(),
  {
    showImport: false,
    importAccept: '.json,.vcf,.vcard,application/json,text/vcard',
    submitDisabled: false,
  },
)

const emit = defineEmits<{
  cancel: []
  /** Fired after the user picks a file (parent runs import logic). */
  'file-import': [event: Event]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

function onImportClick() {
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  emit('file-import', event)
}
</script>

<style scoped lang="scss">
.ac-modal__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.ac-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.ac-btn {
  padding: 0.55rem 1.1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.ac-btn--primary {
  background: #2563eb;
  color: #fff;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.ac-btn--secondary {
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
}

.ac-btn--import {
  background: #fff;
  color: #2563eb;
  border: 1px solid #2563eb;

  &:hover {
    background: #eff6ff;
    border-color: #1d4ed8;
  }
}
</style>
