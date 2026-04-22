<template>
  <TabsContent :value="tabsValue" class="ac-tabs__content">
    <div
      class="ac-tabs__panel ac-tabs__panel--wallet-tab"
      role="region"
      :aria-labelledby="headingId"
    >
      <p :id="headingId" class="ac-wallets__intro">
        {{ copy.intro }}
      </p>
      <Separator class="ac-wallets__separator" />
      <div class="ac-wallets__thead">
        <span class="ac-wallets__th">{{ copy.assetColumn }}</span>
        <span class="ac-wallets__th">Address</span>
        <div class="ac-wallets__thead-actions">
          <input
            ref="walletTabFileInputRef"
            type="file"
            class="ac-wallet-tab-file-input"
            :accept="walletTabFileAccept"
            @change="onWalletTabFileChange"
          />
          <button type="button" class="ac-btn-add-wallet" @click="emit('add-row')">
            <Plus v-if="showAddPlusIcon" :size="13" aria-hidden="true" />
            {{ copy.addButton }}
          </button>
          <StructureImportWalletAddress
            class="ac-wallets__structure-import"
            @upload-json="triggerWalletTabFileInput"
            @scan-qr="emit('scan-qr')"
          />
          <span class="ac-wallets__visually-hidden">Remove row</span>
        </div>
      </div>
      <div class="ac-exch-currencies__body" :aria-label="copy.listAriaLabel">
        <div class="ac-wallets__list">
          <p v-if="rows.length === 0" class="ac-wallets__empty">
            {{ copy.empty }}
          </p>
          <div
            v-for="(row, index) in rows"
            :key="index"
            class="ac-wallet-row"
          >
            <div class="ac-wallet-row__cell">
              <CurrencyDropdown
                :model-value="assetValue(row)"
                @update:model-value="(v) => onAssetPick(index, v)"
              />
            </div>
            <div class="ac-wallet-row__cell">
              <button
                :id="`${addressIdPrefix}-${index}`"
                type="button"
                :class="[...addressTriggerClass, { 'ac-address-trigger--empty': !rowAddress(row) }]"
                :aria-label="addressAriaLabel(row, index)"
                @click="emit('open-address', index)"
              >
                <span v-if="rowAddress(row)" class="ac-address-trigger__value">
                  {{ formatWalletAddress(rowAddress(row)) }}
                </span>
                <span v-else class="ac-address-trigger__placeholder">
                  Wallet address
                </span>
                <ShieldCheck
                  :size="13"
                  class="ac-address-trigger__icon"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div class="ac-wallet-row__cell ac-wallet-row__cell--action">
              <button
                v-if="variant === 'exchange'"
                type="button"
                class="ac-exch-remove-btn"
                :aria-label="`Remove currency row ${Number(index) + 1}`"
                @click="onRemove(index)"
              >
                <Trash2 :size="13" aria-hidden="true" />
              </button>
              <button
                v-else
                type="button"
                class="ac-btn-remove"
                :aria-label="`Remove wallet row ${Number(index) + 1}`"
                @click="onRemove(index)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TabsContent>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { TabsContent, Separator } from 'radix-vue'
import { Plus, Trash2, ShieldCheck } from 'lucide-vue-next'
import CurrencyDropdown from '@/components/dropdown/dropdown.currency.vue'
import StructureImportWalletAddress from '@/components/structure/structure.import.walletAddress.vue'
import type { Wallet } from '@/services/addressBook/walletService'

/** Row shape for exchange deposit currencies (matches `ExchangeCurrency` on the exchange form). */
export interface ExchangeCurrencyRow {
  name: string
  abbreviation: string
  address: string
}

export type TabWalletRow = ExchangeCurrencyRow | Partial<Wallet>

const EXCHANGE_DEFAULTS = {
  intro: 'Deposit addresses per currency for this exchange.',
  empty: 'No currencies yet. Use “Add Wallet” in the row above.',
  assetColumn: 'Currency',
  listAriaLabel: 'Exchange currency list',
  addButton: 'Add Wallet',
  headingId: 'ac-exch-currencies-heading',
  addressIdPrefix: 'ac-exch-cur-addr',
} as const

const CONTACT_DEFAULTS = {
  intro: 'Wallet addresses linked to this contact.',
  empty: 'No wallets yet. Use “+ Add wallet” in the row above or Import from the actions below.',
  assetColumn: 'Coin',
  listAriaLabel: 'Wallet list',
  addButton: '+ Add wallet',
  headingId: 'ac-wallets-heading',
  addressIdPrefix: 'ac-wallet-addr',
} as const

defineOptions({ name: 'FormAddEntryStructureTabWallet' })

const props = withDefaults(
  defineProps<{
    /** Radix `TabsContent` value (e.g. `currencies` / `advanced`). */
    tabsValue: string
    variant?: 'exchange' | 'contact'
    /** Optional overrides; defaults depend on `variant`. */
    introText?: string
    emptyText?: string
    assetColumnLabel?: string
    listAriaLabel?: string
    addButtonLabel?: string
    regionHeadingId?: string
    addressIdPrefix?: string
  }>(),
  { variant: 'exchange' },
)

const rows = defineModel<TabWalletRow[]>({ required: true })

const emit = defineEmits<{
  'open-address': [index: number]
  'add-row': []
  'remove-row': [index: number]
  /** Wallet JSON (both flows); contact also allows VCF via `accept`. */
  'file-import': [event: Event]
  'scan-qr': []
}>()

const walletTabFileInputRef = ref<HTMLInputElement | null>(null)

function triggerWalletTabFileInput() {
  walletTabFileInputRef.value?.click()
}

function onWalletTabFileChange(event: Event) {
  emit('file-import', event)
  const target = event.target as HTMLInputElement
  if (target) target.value = ''
}

const baseCopy = computed(() => (props.variant === 'contact' ? CONTACT_DEFAULTS : EXCHANGE_DEFAULTS))

const copy = computed(() => ({
  intro: props.introText ?? baseCopy.value.intro,
  empty: props.emptyText ?? baseCopy.value.empty,
  assetColumn: props.assetColumnLabel ?? baseCopy.value.assetColumn,
  listAriaLabel: props.listAriaLabel ?? baseCopy.value.listAriaLabel,
  addButton: props.addButtonLabel ?? baseCopy.value.addButton,
}))

const headingId = computed(() => props.regionHeadingId ?? baseCopy.value.headingId)
const addressIdPrefix = computed(() => props.addressIdPrefix ?? baseCopy.value.addressIdPrefix)
const showAddPlusIcon = computed(() => props.variant === 'exchange')

const walletTabFileAccept = computed(() =>
  props.variant === 'contact'
    ? '.json,.vcf,.vcard,application/json,text/vcard'
    : '.json,application/json',
)

const addressTriggerClass = computed(() =>
  props.variant === 'exchange'
    ? ['ac-input', 'ac-input--sm', 'ac-address-trigger']
    : ['ac-input', 'ac-address-trigger'],
)

function assetValue(row: TabWalletRow): string {
  if (props.variant === 'exchange') {
    return (row as ExchangeCurrencyRow).abbreviation
  }
  return (row as Partial<Wallet>).coinTicker ?? ''
}

function rowAddress(row: TabWalletRow): string {
  return (row as { address?: string }).address ?? ''
}

function onAssetPick(index: number, value: string) {
  const row = rows.value[index]
  if (!row) return
  if (props.variant === 'exchange') {
    const r = row as ExchangeCurrencyRow
    r.abbreviation = value
    r.name = value
  } else {
    (row as Partial<Wallet>).coinTicker = value
  }
}

function onRemove(index: number) {
  if (props.variant === 'contact') {
    emit('remove-row', index)
  } else {
    rows.value.splice(index, 1)
  }
}

function addressAriaLabel(row: TabWalletRow, index: number): string {
  const n = Number(index) + 1
  const hasAddr = !!rowAddress(row)
  if (props.variant === 'exchange') {
    return hasAddr ? `Edit deposit address, row ${n}` : `Enter deposit address, row ${n}`
  }
  return hasAddr ? `Edit wallet address, row ${n}` : `Enter wallet address, row ${n}`
}

function formatWalletAddress(address: string): string {
  if (!address) return ''
  if (address.length <= 18) return address
  return `${address.slice(0, 9)}...${address.slice(-9)}`
}
</script>

<style scoped lang="scss">
.ac-tabs__content {
  padding-bottom: 0.25rem;
}

.ac-tabs__panel--wallet-tab {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.ac-wallets__intro {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  flex-shrink: 0;
}

.ac-wallets__separator {
  flex-shrink: 0;
  background: #e5e7eb;
}

.ac-wallets__thead {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 0.65rem;
  align-items: end;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.ac-wallets__th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.ac-wallets__thead-actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 0;
}

.ac-wallet-tab-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

:deep(.ac-wallets__structure-import .icon-button) {
  padding: 0.35rem;
}

:deep(.ac-wallets__structure-import .icon-button svg) {
  width: 1rem;
  height: 1rem;
}

.ac-wallets__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ac-exch-currencies__body {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 0.5rem 0.5rem 0.65rem 0.65rem;
  box-sizing: border-box;
}

.ac-wallets__list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.ac-wallets__empty {
  margin: 0;
  padding: 1.25rem 0.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #9ca3af;
  line-height: 1.45;
}

.ac-wallet-row {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 0.65rem;
  align-items: center;
}

.ac-wallet-row__cell {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ac-wallet-row__cell--action {
  align-items: flex-end;
  justify-content: center;
}

:deep(.ac-wallet-row__cell .custom-select-wrapper) {
  width: 100%;
}

.ac-btn-add-wallet {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: auto;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
}

.ac-input {
  width: 100%;
  padding: 0.6rem 0.65rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
}

.ac-input--sm {
  padding: 0.45rem 0.55rem;
  font-size: 0.8125rem;
}

.ac-address-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.4rem;
  color: #111827;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ac-address-trigger:hover {
  border-color: #9ca3af;
}

.ac-address-trigger:focus-visible {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.ac-address-trigger--empty {
  color: #6b7280;
  font-family: inherit;
}

.ac-address-trigger__value {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ac-address-trigger__placeholder {
  flex: 1 1 auto;
  color: #9ca3af;
}

.ac-address-trigger__icon {
  flex: 0 0 auto;
  color: #6366f1;
}

.ac-exch-remove-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  color: #ef4444;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;

  &:hover {
    background: #fee2e2;
    color: #b91c1c;
  }
}

.ac-btn-remove {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.35rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;

  &:hover {
    color: #b91c1c;
    background: #fee2e2;
  }
}
</style>
