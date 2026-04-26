<template>
  <div class="ab-table-footer">
    <div class="ab-table-footer__left">
      <div class="ab-table-footer__actions">
        <button
          v-if="isContactsActive && selectedCount > 0"
          type="button"
          class="ab-btn ab-btn--danger"
          @click="emit('delete-selected')"
        >
          Delete selected
        </button>
        <!-- <ButtonAddressBookExportFooter
          v-if="isContactsActive"
          :label="exportLabel"
          :variant="exportVariant"
          :contacts="contacts"
          :exchanges="exchanges"
          :wallets="wallets"
        /> -->
      </div>
    </div>
    <div class="ab-table-footer__right">
      <span v-if="isContactsActive" class="ab-table-footer__count">
        {{ firstItemIndex }}–{{ lastItemIndex }} of {{ filteredCount }}
      </span>
      <span v-else class="ab-table-footer__count">0–0 of 0</span>
      <div class="ab-table-footer__pagination">
        <button
          type="button"
          class="ab-page-btn"
          :disabled="!isContactsActive || currentPage === 1 || filteredCount === 0"
          aria-label="Previous page"
          @click="emit('prev-page')"
        >
          <ChevronLeft :size="18" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="ab-page-btn"
          :disabled="!isContactsActive || currentPage === totalPages || filteredCount === 0"
          aria-label="Next page"
          @click="emit('next-page')"
        >
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineOptions({ name: 'AspectFooterModalAddressBook' })

defineProps<{
  isContactsActive: boolean
  selectedCount: number
  firstItemIndex: number
  lastItemIndex: number
  filteredCount: number
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'delete-selected': []
  'prev-page': []
  'next-page': []
}>()
</script>

<style scoped lang="scss">
/* Delete action — match Address Book toolbar `.ab-btn` / `.ab-btn--danger` */
.ab-btn {
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
  transition: background 0.12s, border-color 0.12s;

  &:hover:not(.ab-btn--danger) { background: #f3f4f6; }
}

.ab-btn--danger {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;

  &:hover { background: #dc2626; border-color: #dc2626; }
}

.ab-table-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.ab-table-footer__left {
  min-width: 150px;
  display: flex;
  align-items: center;
}

.ab-table-footer__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.ab-table-footer__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ab-table-footer__count {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.ab-table-footer__pagination {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.ab-page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
}
</style>
