<template>
  <div class="ab-export-footer">
    <AddressBookExportButton
      :label="label"
      :variant="variant"
      :contacts="contacts"
      :exchanges="exchanges"
      :wallets="wallets"
    />
  </div>
</template>

<script setup lang="ts">
import AddressBookExportButton from './button.addressBook.export.vue'
import type { ExportVariant } from './button.addressBook.export.vue'

defineOptions({ name: 'ButtonAddressBookExportFooter' })

withDefaults(
  defineProps<{
    label?: string
    variant?: ExportVariant
    contacts?: unknown[]
    exchanges?: unknown[]
    wallets?: unknown[]
  }>(),
  {
    label: 'Export Contacts',
    variant: 'contacts',
    contacts: () => [],
    exchanges: () => [],
    wallets: () => [],
  },
)
</script>

<style scoped lang="scss">
.ab-export-footer {
  display: inline-flex;
  align-items: center;

  /* Match `.ab-view__actions :deep(.btn)` in AddressBook.vue */
  :deep(.btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.45rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background: #fff;
    cursor: pointer;
    color: #1f2937;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.25;
    font-family: inherit;
    transition: background 0.12s;
    margin: 0;

    &:hover { background: #f3f4f6; }
  }

  :deep(.btn-icon) {
    flex-shrink: 0;
  }
}
</style>
