<template>
  <div class="ab-page__tab-panel">
    <div class="ab-table-wrapper">
      <table class="ab-table">
        <thead>
          <tr>
            <th class="ab-table__th ab-table__th--checkbox" scope="col">
              <input
                type="checkbox"
                class="ab-table__checkbox"
                :checked="isCurrentPageSelected"
                :disabled="exchanges.length === 0"
                @change="selectAllExchanges"
              />
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'id' }"
              @click="sortBy('id')"
            >
              ID
              <span v-if="sortKey === 'id'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'name' }"
              @click="sortBy('name')"
            >
              Name
              <span v-if="sortKey === 'name'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'email' }"
              @click="sortBy('email')"
            >
              Associated Email
              <span v-if="sortKey === 'email'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <!-- Referral Code column hidden -->
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable ab-table__th--hidden"
              :class="{ 'ab-table__th--sorted': sortKey === 'referralCode' }"
              @click="sortBy('referralCode')"
            >
              Referral Code
              <span v-if="sortKey === 'referralCode'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'num_currencies' }"
              @click="sortBy('num_currencies')"
            >
              N° of Wallets
              <span v-if="sortKey === 'num_currencies'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="ab-table__th" scope="col">Currency Address</th>
            <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedExchanges.length === 0">
            <td colspan="8" class="ab-table__empty">No exchanges found.</td>
          </tr>
          <tr
            v-for="exchange in paginatedExchanges"
            :key="exchange.id"
            class="ab-table__row"
            @click="openExchangeModal(exchange)"
          >
            <td class="ab-table__td ab-table__td--checkbox" @click.stop>
              <input
                v-model="selectedExchangeIdsProxy"
                type="checkbox"
                class="ab-table__checkbox"
                :value="exchange.id"
                :aria-label="`Select exchange ${exchange.name}`"
                @click.stop
              />
            </td>
            <td class="ab-table__td">{{ exchange.id }}</td>
            <td class="ab-table__td">
              <a :href="exchange.url" target="_blank" @click.stop>{{ exchange.name }}</a>
            </td>
            <td class="ab-table__td">{{ exchange.email }}</td>
            <td class="ab-table__td ab-table__td--hidden">
              <a :href="exchange.referralUrl" target="_blank" @click.stop>{{ exchange.referralCode }}</a>
            </td>
            <td class="ab-table__td">{{ exchange.currencies.length }}</td>
            <td class="ab-table__td">
              <template v-if="exchange.currencies.length > 0">
                <span :title="exchange.currencies[0].address">
                  {{ exchange.currencies[0].abbreviation }}<span class="ab-table__sep">://</span>{{ truncateAddress(exchange.currencies[0].address) }}
                </span>
              </template>
              <template v-else>N/A</template>
            </td>
            <td class="ab-table__td ab-table__td--actions" @click.stop>
              <ActionsDropdown
                :contact="exchangeActionsContactStub(exchange)"
                @update:edit-mode="(on: boolean) => on && openExchangeModal(exchange)"
                @add-currency-request="openExchangeModal(exchange)"
                @generate-qrcode-png="exportExchangeQrPng(exchange)"
                @generate-qrcode-svg="exportExchangeQrSvg(exchange)"
                @export-csv="exportExchangeCsv(exchange)"
                @export-vcf="exportExchangeVcf(exchange)"
                @export-json="exportExchangeJson(exchange)"
                @export-md="exportExchangeMd(exchange)"
                @save-changes="onExchangeRowAction"
                @cancel-edit="onExchangeRowAction"
                @currency-added="onExchangeRowAction"
                @delete-requested="confirmDeleteExchange(exchange)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ExchangeModal
      v-if="selectedExchange"
      :exchange="selectedExchange"
      @close="closeExchangeModal"
      @exchange-saved="onExchangeDetailSaved"
    />
    <ModalConfirmDeleteGeneral
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      @close="closeConfirmModal"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'TabAddressBookExchange' })
import ExchangeModal from '@/components/modals/addressbook/modal.details.Exchange.vue'
import ActionsDropdown from '@/components/dropdowns/dropdown.actions.vue'
import ModalConfirmDeleteGeneral from '@/components/modals/confirmations/modal.confirm.delete.general.vue'
import { deleteExchange, updateExchange, type ExchangeRecord } from '@/services/addressBook/service.addressBook.Exchange'
import type { Contact } from '@/services/addressBook/service.addressBook.Contact'
import {
  exportExchangeQrPng,
  exportExchangeQrSvg,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Exchange.qrCode'
import {
  exportExchangeCsv,
  exportExchangeVcf,
  exportExchangeJson,
  exportExchangeMd,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Exchange.text'

const props = withDefaults(
  defineProps<{
    exchanges: ExchangeRecord[]
    selectedExchangeIds?: number[]
  }>(),
  { selectedExchangeIds: () => [] },
)

const emit = defineEmits<{
  'exchanges-changed': []
  'update:selectedExchangeIds': [value: number[]]
}>()

const selectedExchangeIdsProxy = computed({
  get: () => props.selectedExchangeIds,
  set: (value: number[]) => emit('update:selectedExchangeIds', value),
})

const selectedExchange = ref<ExchangeRecord | null>(null)
const currentPage = ref(1);
const itemsPerPage = 25;
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmModalMessage = ref('');
const exchangeToDelete = ref<ExchangeRecord | null>(null)
const sortKey = ref<keyof ExchangeRecord | 'num_currencies'>('id')
const sortOrder = ref<'asc' | 'dsc'>('asc')

function sortBy(key: keyof ExchangeRecord | 'num_currencies') {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedExchanges = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...props.exchanges].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (key === 'num_currencies') {
      aValue = a.currencies.length;
      bValue = b.currencies.length;
    } else {
      aValue = a[key as keyof ExchangeRecord]
      bValue = b[key as keyof ExchangeRecord]
    }

    if (aValue === bValue) {
      return 0;
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
});

const totalPages = computed(() => Math.ceil(props.exchanges.length / itemsPerPage));

const paginatedExchanges = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedExchanges.value.slice(start, end);
});

const isCurrentPageSelected = computed(() => {
  const visibleExchangeIds = paginatedExchanges.value.map(e => e.id);
  if (visibleExchangeIds.length === 0) return false;
  return visibleExchangeIds.every(id => props.selectedExchangeIds.includes(id));
});

const selectAllExchanges = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const visibleExchangeIds = paginatedExchanges.value.map(e => e.id);
  const current = [...props.selectedExchangeIds];
  if (target.checked) {
    emit('update:selectedExchangeIds', [...new Set([...current, ...visibleExchangeIds])]);
  } else {
    emit('update:selectedExchangeIds', current.filter(id => !visibleExchangeIds.includes(id)));
  }
};

const openExchangeModal = (exchange: ExchangeRecord) => {
  selectedExchange.value = exchange
}

const closeExchangeModal = () => {
  selectedExchange.value = null
}

async function onExchangeDetailSaved(saved: ExchangeRecord & { id?: number }) {
  if (saved.id != null) {
    await updateExchange({ ...saved, id: saved.id })
  }
  closeExchangeModal()
  emit('exchanges-changed')
}

const confirmDeleteExchange = (exchange: ExchangeRecord) => {
  exchangeToDelete.value = exchange;
  confirmModalTitle.value = 'Delete Exchange';
  confirmModalMessage.value = `Are you sure you want to delete the exchange ${exchange.name}?`;
  showConfirmModal.value = true;
};

const onConfirmDelete = async () => {
  if (exchangeToDelete.value) {
    await deleteExchange(exchangeToDelete.value.id)
    emit('exchanges-changed')
  }
  closeConfirmModal()
}

const closeConfirmModal = () => {
  showConfirmModal.value = false;
  exchangeToDelete.value = null;
}

function truncateAddress(address: string): string {
  if (!address || address.length <= 14) return address
  return `${address.slice(0, 7)}…${address.slice(-7)}`
}

/**
 * Contact-shaped stub so the shared ActionsDropdown (which expects a Contact)
 * can render its menu against an exchange row. Mirrors the pattern used in
 * the exchange details modal header and the companies tab.
 */
function exchangeActionsContactStub(exchange: ExchangeRecord): Contact {
  return {
    id: exchange.id,
    type: 'exchange',
    firstname: exchange.name || 'Exchange',
    lastname: '',
    company: '',
    email: exchange.email || '',
    notes: exchange.notes || '',
  }
}

/**
 * Pass-through for ActionsDropdown events that have no row-level meaning on
 * an exchange row: `save-changes` / `cancel-edit` (only relevant inside the
 * details modal) and `currency-added` (currencies are managed in the modal).
 */
function onExchangeRowAction(payload?: unknown) {
  console.log('Exchange row action:', payload)
}
</script>

<style lang="scss" scoped>
.ab-table {
  width: 100%;
  border-collapse: collapse;
}

.ab-table__th {
  padding: 0.35rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 2;
}

.ab-table__th--sortable {
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e5e7eb;
  }
}

.ab-table__th--sorted {
  color: #2563eb;
}

.ab-table__sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

.ab-table__th--checkbox {
  width: 4%;
}

.ab-table__th--actions {
  width: 15%;
}

.ab-table__row {
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: #f9fafb;
  }
}

.ab-table__td {
  padding: 0.3rem 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.875rem;

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ab-table__td--checkbox {
  width: 4%;
}

.ab-table__td--actions {
  width: 15%;
}

.ab-table__checkbox {
  cursor: pointer;
}

.ab-table__empty {
  text-align: center;
  padding: 5rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;
}

.ab-page__tab-panel {
  outline: none;
}

.ab-table-wrapper {
  width: 100%;
  /* overflow-x lives on the parent .ab-scroll-area so sticky thead is not trapped */
}

.ab-table__th--hidden,
.ab-table__td--hidden {
  display: none;
}

.ab-table__sep {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #9ca3af;
  padding: 0 0.15rem;
  user-select: none;
}
</style>