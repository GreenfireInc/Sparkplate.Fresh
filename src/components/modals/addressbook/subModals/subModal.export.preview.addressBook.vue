<!--
  Export preview dialog: lists the entries that will be exported when a subset is selected.
  Visibility, entries and variant are controlled by the parent. Confirm emits `confirm`,
  Cancel / backdrop emits `close`. The parent performs the actual file download.
-->
<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content" role="dialog" aria-modal="true" :aria-label="title">
      <header class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-subtitle">{{ subtitle }}</p>
      </header>

      <div class="modal-body">
        <div v-if="entries.length === 0" class="modal-empty">
          No entries selected.
        </div>
        <table v-else class="preview-table">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                scope="col"
                class="preview-table__th"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, idx) in entries" :key="rowKey(entry, idx)">
              <td
                v-for="col in columns"
                :key="col.key"
                class="preview-table__td"
              >
                {{ formatCell(entry, col.key) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="modal-actions">
        <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="entries.length === 0"
          @click="confirm"
        >
          {{ confirmLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'SubModalExportPreviewAddressBook' })

export type ExportPreviewVariant = 'contacts' | 'exchanges' | 'wallets' | 'companies'

interface PreviewColumn {
  key: string
  label: string
}

const props = withDefaults(
  defineProps<{
    show: boolean
    variant: ExportPreviewVariant
    entries: Record<string, unknown>[]
  }>(),
  { entries: () => [] },
)

const emit = defineEmits<{ close: []; confirm: [] }>()

const VARIANT_TITLE: Record<ExportPreviewVariant, string> = {
  contacts: 'Export Selected Contacts',
  exchanges: 'Export Selected Exchanges',
  wallets: 'Export Selected Wallets',
  companies: 'Export Selected Companies',
}

const VARIANT_COLUMNS: Record<ExportPreviewVariant, PreviewColumn[]> = {
  contacts: [
    { key: 'firstname', label: 'First name' },
    { key: 'lastname', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'company', label: 'Company' },
  ],
  companies: [
    { key: 'name', label: 'Company' },
    { key: 'mainContact', label: 'Main contact' },
    { key: 'email', label: 'Email' },
    { key: 'numCurrencies', label: 'Currencies' },
  ],
  exchanges: [
    { key: 'name', label: 'Exchange' },
    { key: 'url', label: 'URL' },
    { key: 'email', label: 'Email' },
  ],
  wallets: [
    { key: 'name', label: 'Wallet' },
  ],
}

const title = computed(() => VARIANT_TITLE[props.variant])
const subtitle = computed(
  () =>
    `Review the ${props.entries.length} selected ${props.variant} ${
      props.entries.length === 1 ? 'entry' : 'entries'
    } before exporting.`,
)
const columns = computed<PreviewColumn[]>(() => VARIANT_COLUMNS[props.variant] ?? [])
const confirmLabel = computed(
  () => `Export ${props.entries.length} ${props.entries.length === 1 ? 'entry' : 'entries'}`,
)

function rowKey(entry: Record<string, unknown>, idx: number): string | number {
  const id = entry.id
  return typeof id === 'number' || typeof id === 'string' ? id : idx
}

function formatCell(entry: Record<string, unknown>, key: string): string {
  const v = entry[key]
  if (v == null) return ''
  if (typeof v === 'number') return String(v)
  return String(v)
}

const close = () => emit('close')
const confirm = () => emit('confirm')
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 720px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.25rem 1.5rem 0.75rem;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #111827;
}

.modal-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.modal-body {
  padding: 0.5rem 1.5rem;
  overflow: auto;
  flex: 1 1 auto;
}

.modal-empty {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.9375rem;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.preview-table__th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f3f4f6;
  text-align: left;
  font-weight: 600;
  color: #4b5563;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.preview-table__td {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 18rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
}

.btn-secondary {
  background-color: #f3f4f6;
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
  border-color: #2563eb;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
    border-color: #1d4ed8;
  }
}
</style>
