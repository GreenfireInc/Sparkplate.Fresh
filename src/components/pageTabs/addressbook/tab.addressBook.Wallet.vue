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
                :disabled="wallets.length === 0"
                aria-label="Select all wallets on this page"
                @change="selectAllWallets"
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
              Wallet
              <span v-if="sortKey === 'name'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'num_currencies' }"
              @click="sortBy('num_currencies')"
            >
              N° of Currencies
              <span v-if="sortKey === 'num_currencies'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="ab-table__th" scope="col">Primary Address</th>
            <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedWallets.length === 0">
            <td colspan="6" class="ab-table__empty">No wallets found.</td>
          </tr>
          <tr
            v-for="wallet in paginatedWallets"
            :key="wallet.id"
            class="ab-table__row"
            @click="openWalletModal(wallet)"
          >
            <td class="ab-table__td ab-table__td--checkbox" @click.stop>
              <input
                v-model="selectedWalletIdsProxy"
                type="checkbox"
                class="ab-table__checkbox"
                :value="wallet.id"
                :aria-label="`Select wallet ${wallet.name}`"
                @click.stop
              />
            </td>
            <td class="ab-table__td">{{ wallet.id }}</td>
            <td class="ab-table__td">{{ wallet.name }}</td>
            <td class="ab-table__td">{{ wallet.currencies.length }}</td>
            <td class="ab-table__td">{{ wallet.currencies[0]?.address || 'N/A' }}</td>
            <td class="ab-table__td ab-table__td--actions" @click.stop>
              <ActionsDropdown
                :contact="walletRowContactStub(wallet)"
                :is-editing="false"
                @update:edit-mode="(on: boolean) => on && openWalletModal(wallet)"
                @save-changes="noopWalletTableActions"
                @cancel-edit="noopWalletTableActions"
                @add-currency-request="openAddCurrencyForWallet(wallet)"
                @generate-qrcode-png="exportWalletQrPng(wallet)"
                @generate-qrcode-svg="exportWalletQrSvg(wallet)"
                @export-csv="exportWalletCsv(wallet)"
                @export-vcf="exportWalletVcf(wallet)"
                @export-json="exportWalletJson(wallet)"
                @export-md="exportWalletMd(wallet)"
                @currency-added="noopWalletTableActions"
                @delete-requested="confirmDeleteWallet(wallet)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <WalletModal
      v-if="selectedWallet"
      :wallet="selectedWallet"
      @close="closeWalletModal"
      @currency-removed="onWalletCurrencyRemoved"
      @currency-added="onAddCurrencyToStandaloneWallet"
      @standalone-currencies-imported="onStandaloneCurrenciesBulkImport"
      @delete-requested="onWalletModalDeleteRequested"
    />
    <SubModalAddCurrency
      v-if="walletForAddCurrency"
      :show="showAddCurrencyModal"
      :contact-id="walletForAddCurrency.id"
      entity-label="Wallet"
      :persist-imported-wallets-to-contact="false"
      @close="closeAddCurrencyModal"
      @currency-added="onAddCurrencyToStandaloneWallet"
      @standalone-currencies-imported="onStandaloneCurrenciesBulkImport"
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
import type { Contact } from '@/services/addressBook/service.addressBook.Contact'
import ActionsDropdown from '@/components/dropdown/dropdown.actions.vue'
import WalletModal from '@/components/modals/addressbook/modal.details.Wallet.vue'
import SubModalAddCurrency from '@/components/modals/addressbook/subModals/subModal.add.Currency.vue'
import ModalConfirmDeleteGeneral from '@/components/modals/confirmations/modal.confirm.delete.general.vue'
import type { ImportedWallet } from '@/lib/cores/importStandard/importWallet.json'
import {
  getStandaloneWallets,
  deleteStandaloneWallet,
  updateStandaloneWallet,
  type StandaloneWalletRecord,
} from '@/services/addressBook/service.addressBook.StandaloneWallet'
import {
  exportWalletQrPng,
  exportWalletQrSvg,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Wallet.qrCode'
import {
  exportWalletCsv,
  exportWalletVcf,
  exportWalletJson,
  exportWalletMd,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Wallet.text'

defineOptions({ name: 'TabAddressBookWallet' })

const props = withDefaults(
  defineProps<{
    wallets: StandaloneWalletRecord[]
    selectedWalletIds?: number[]
  }>(),
  { selectedWalletIds: () => [] },
)

const emit = defineEmits<{
  'wallets-changed': []
  'update:selectedWalletIds': [value: number[]]
}>()

const selectedWalletIdsProxy = computed({
  get: () => props.selectedWalletIds,
  set: (value: number[]) => emit('update:selectedWalletIds', value),
})

const selectedWallet = ref<StandaloneWalletRecord | null>(null)
const currentPage = ref(1)
const itemsPerPage = 25
const showConfirmModal = ref(false)
const confirmModalTitle = ref('')
const confirmModalMessage = ref('')
const walletToDelete = ref<StandaloneWalletRecord | null>(null)
const showAddCurrencyModal = ref(false)
const walletForAddCurrency = ref<StandaloneWalletRecord | null>(null)
const sortKey = ref<keyof StandaloneWalletRecord | 'num_currencies'>('id')
const sortOrder = ref<'asc' | 'dsc'>('asc')

function sortBy(key: keyof StandaloneWalletRecord | 'num_currencies') {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedWallets = computed(() => {
  const key = sortKey.value
  const order = sortOrder.value
  return [...props.wallets].sort((a, b) => {
    let aValue: number | string
    let bValue: number | string

    if (key === 'num_currencies') {
      aValue = a.currencies.length
      bValue = b.currencies.length
    } else {
      aValue = a[key as keyof StandaloneWalletRecord] as number | string
      bValue = b[key as keyof StandaloneWalletRecord] as number | string
    }

    if (aValue === bValue) {
      return 0
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })
})

const paginatedWallets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedWallets.value.slice(start, end)
})

const isCurrentPageSelected = computed(() => {
  const visibleWalletIds = paginatedWallets.value.map(w => w.id)
  if (visibleWalletIds.length === 0) return false
  return visibleWalletIds.every(id => props.selectedWalletIds.includes(id))
})

const selectAllWallets = (event: Event) => {
  const target = event.target as HTMLInputElement
  const visibleWalletIds = paginatedWallets.value.map(w => w.id)
  const current = [...props.selectedWalletIds]
  if (target.checked) {
    emit('update:selectedWalletIds', [...new Set([...current, ...visibleWalletIds])])
  } else {
    emit('update:selectedWalletIds', current.filter(id => !visibleWalletIds.includes(id)))
  }
}

/** Contact-shaped row for `ActionsDropdown` (same pattern as `modal.details.Wallet.vue`). */
function walletRowContactStub(wallet: StandaloneWalletRecord): Contact {
  return {
    id: wallet.id,
    type: 'addressbook_wallet',
    firstname: wallet.name || 'Wallet',
    lastname: '',
    company: '',
    email: '',
    notes: wallet.notes ?? '',
  }
}

/* Slots that don't apply at the row level: rows aren't in edit mode, and the
 * dropdown's own `currency-added` is only relevant in the contact-flow path.
 * Kept as a single noop to wire the events without breaking the dropdown. */
function noopWalletTableActions() {}

const openAddCurrencyForWallet = (wallet: StandaloneWalletRecord) => {
  walletForAddCurrency.value = wallet
  showAddCurrencyModal.value = true
}

const closeAddCurrencyModal = () => {
  showAddCurrencyModal.value = false
  walletForAddCurrency.value = null
}

async function onAddCurrencyToStandaloneWallet(currency: {
  contactId: number
  network: string
  address: string
}) {
  const all = await getStandaloneWallets()
  const w = all.find((x) => x.id === currency.contactId)
  if (!w) return
  const newCurrencies = [
    ...w.currencies.map((c) => ({ ...c })),
    {
      name: currency.network,
      abbreviation: currency.network,
      address: currency.address,
    },
  ]
  const updated: StandaloneWalletRecord = { ...w, currencies: newCurrencies }
  await updateStandaloneWallet(updated)
  emit('wallets-changed')
  syncOpenModalWith(updated)
}

/**
 * JSON import for standalone wallets: submodal sends one batch so we merge once. Per-row
 * `currency-added` for many rows raced and each `updateStandalone` overwrote the last.
 */
async function onStandaloneCurrenciesBulkImport(payload: {
  targetId: number
  items: ImportedWallet[]
}) {
  const all = await getStandaloneWallets()
  const w = all.find((x) => x.id === payload.targetId)
  if (!w || payload.items.length === 0) return
  const newCurrencies = [
    ...w.currencies.map((c) => ({ ...c })),
    ...payload.items.map((item) => ({
      name: item.coinTicker,
      abbreviation: item.coinTicker,
      address: item.address,
    })),
  ]
  const updated: StandaloneWalletRecord = { ...w, currencies: newCurrencies }
  await updateStandaloneWallet(updated)
  emit('wallets-changed')
  syncOpenModalWith(updated)
}

/* When the Wallet details modal is open and bubbled an add / import that
 * just got persisted, refresh `selectedWallet` so the modal's currencies tab
 * reflects the new state. The row-level add path goes through the same
 * handlers but `selectedWallet` is null in that case, so the guard short-
 * circuits cleanly. */
function syncOpenModalWith(updated: StandaloneWalletRecord) {
  if (selectedWallet.value?.id === updated.id) {
    selectedWallet.value = {
      ...updated,
      currencies: updated.currencies.map((c) => ({ ...c })),
    }
  }
}

const openWalletModal = (wallet: StandaloneWalletRecord) => {
  selectedWallet.value = wallet
}

const closeWalletModal = () => {
  selectedWallet.value = null
}

async function onWalletCurrencyRemoved(currencyIndex: number) {
  const w = selectedWallet.value
  if (!w || currencyIndex < 0 || currencyIndex >= w.currencies.length) return
  w.currencies.splice(currencyIndex, 1)
  await updateStandaloneWallet({ ...w, currencies: w.currencies.map((c) => ({ ...c })) })
  emit('wallets-changed')
}

const confirmDeleteWallet = (wallet: StandaloneWalletRecord) => {
  walletToDelete.value = wallet
  confirmModalTitle.value = 'Delete Wallet'
  confirmModalMessage.value = `Are you sure you want to delete the wallet ${wallet.name}?`
  showConfirmModal.value = true
}

/* Wired from `modal.details.Wallet.vue`'s `delete-requested`. Close the
 * details modal first so the confirm dialog isn't stacked behind it, then
 * reuse the existing row-level delete flow. */
const onWalletModalDeleteRequested = (wallet: StandaloneWalletRecord) => {
  closeWalletModal()
  confirmDeleteWallet(wallet)
}

const onConfirmDelete = async () => {
  if (walletToDelete.value) {
    await deleteStandaloneWallet(walletToDelete.value.id)
    emit('wallets-changed')
  }
  closeConfirmModal()
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  walletToDelete.value = null
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
}
</style>
