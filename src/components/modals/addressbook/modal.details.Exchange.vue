<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cd-overlay" />
      <DialogContent
        class="cd-modal"
        :aria-describedby="undefined"
        @pointer-down-outside="onDialogPointerDownOutside"
        @interact-outside="onDialogInteractOutside"
      >
        <div class="cd-header">
          <div class="cd-header__row">
            <DialogTitle class="cd-header__title">
              {{ isEditing ? 'Exchange details' : 'Add exchange' }}
            </DialogTitle>
            <div v-if="props.exchange" class="cd-header__actions">
              <ActionsDropdown
                :contact="exchangeActionsContactStub"
                :is-editing="false"
                @update:edit-mode="onExchangeActionsEditMode"
                @save-changes="saveExchange"
                @cancel-edit="onExchangeActionsCancelEdit"
                @add-currency-request="addCurrencyRow"
                @generate-qrcode-png="exportExchangeQrPng(currentExchangeRecord)"
                @generate-qrcode-svg="exportExchangeQrSvg(currentExchangeRecord)"
                @export-csv="exportExchangeCsv(currentExchangeRecord)"
                @export-vcf="exportExchangeVcf(currentExchangeRecord)"
                @export-json="exportExchangeJson(currentExchangeRecord)"
                @export-md="exportExchangeMd(currentExchangeRecord)"
                @currency-added="onModalCurrencyAdded"
                @delete-requested="onModalDeleteRequested"
              />
            </div>
            <DialogClose class="cd-header__close" aria-label="Close">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cd-separator" />

        <div class="cd-body" v-if="props.exchange">
          <div class="cd-grid">
            <div class="cd-sidebar">
              <div
                class="cd-exch-logo"
                :class="{ 'cd-exch-logo--fallback': !exchangeLogoSrc }"
                :style="!exchangeLogoSrc ? { backgroundColor: avatarBackgroundColor } : undefined"
              >
                <img
                  v-if="exchangeLogoSrc"
                  :src="exchangeLogoSrc"
                  :alt="form.name || 'Exchange'"
                  class="cd-exch-logo__img"
                  @error="onExchangeLogoError"
                />
                <span v-else class="cd-exch-logo__initials">{{ exchangeInitials }}</span>
              </div>

              <h2 class="cd-name">
                {{ form.name || 'Exchange' }}
              </h2>

              <p v-if="exchangeCountry" class="cd-sidebar__meta cd-sidebar__meta--country">
                <span v-if="exchangeCountryFlag" class="cd-sidebar__flag" aria-hidden="true">{{
                  exchangeCountryFlag
                }}</span>
                <span>{{ exchangeCountry }}</span>
              </p>

              <a
                v-if="form.url"
                :href="form.url"
                target="_blank"
                rel="noopener noreferrer"
                class="cd-exch-sidebar-social__link cd-sidebar__website-row"
                :title="form.url"
              >
                <Globe :size="16" class="cd-exch-sidebar-social__icon" aria-hidden="true" />
                <span class="cd-exch-sidebar-social__text">{{ displaySocialUrl(form.url) }}</span>
              </a>
              
              

              <div v-if="exchangeSocialLinks.length" class="cd-exch-sidebar-social">
                
                <ul class="cd-exch-sidebar-social__list" aria-label="Exchange social media">
                  <li v-for="item in exchangeSocialLinks" :key="item.platform">
                    <a
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="cd-exch-sidebar-social__link"
                      :title="item.url"
                    >
                      <i
                        v-if="item.biClass"
                        :class="[item.biClass, 'cd-exch-sidebar-social__icon', 'cd-exch-sidebar-social__icon--bi']"
                        aria-hidden="true"
                      />
                      <component
                        v-else
                        :is="item.icon"
                        :size="16"
                        class="cd-exch-sidebar-social__icon"
                        aria-hidden="true"
                      />
                      <span class="cd-exch-sidebar-social__text">{{ displaySocialUrl(item.url) }}</span>
                    </a>
                  </li>
                </ul>
              </div>

              
            </div>

            <div class="cd-main">
              <TabsRoot v-model="activeTab" class="cd-tabs">
                <TabsList class="cd-tabs__list" aria-label="Exchange sections">
                  <TabsTrigger value="general" class="cd-tabs__trigger">
                    <Landmark :size="14" class="cd-tabs__icon" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="currencies" class="cd-tabs__trigger">
                    <Coins :size="14" class="cd-tabs__icon" />
                    Currencies
                    <span class="cd-badge">{{ form.currencies.length }}</span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" class="cd-tabs__trigger">
                    <NotebookPen :size="14" class="cd-tabs__icon" />
                    Notes
                    <span class="cd-badge">0</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" class="cd-tabs__content">
                  <form class="cd-exch-form" @submit.prevent="saveExchange">
                    <div class="cd-exch-field cd-exch-field--full">
                      <label class="cd-label" for="ed-email">Associated email</label>
                      <input
                        id="ed-email"
                        v-model="form.email"
                        type="email"
                        class="cd-exch-input"
                        placeholder="you@example.com"
                        autocomplete="email"
                      />
                    </div>

                    <div class="cd-exch-row">
                      <div class="cd-exch-field">
                        <label class="cd-label" for="ed-referralCode">Referral code</label>
                        <input
                          id="ed-referralCode"
                          v-model="form.referralCode"
                          type="text"
                          class="cd-exch-input"
                          placeholder="e.g. ABC123"
                          autocomplete="off"
                        />
                      </div>
                      <div class="cd-exch-field">
                        <label class="cd-label" for="ed-referralUrl">Referral URL</label>
                        <input
                          id="ed-referralUrl"
                          v-model="form.referralUrl"
                          type="url"
                          class="cd-exch-input"
                          placeholder="https://exchange.com/ref/…"
                          autocomplete="off"
                        />
                      </div>
                    </div>

                  </form>
                </TabsContent>

                <TabsContent value="currencies" class="cd-tabs__content">
                  <div class="cd-exch-currencies">
                    <!-- Toolbar temporarily hidden: "Add currency" + JSON import / QR scan
                         entry points are now driven from the ActionsDropdown
                         (which opens SubModalAddCurrency), so the inline toolbar
                         is redundant. Restore this block to bring it back.
                    <div class="cd-exch-currencies__toolbar">
                      <input
                        ref="exchangeCurrenciesFileInputRef"
                        type="file"
                        class="cd-exch-currencies__file-input"
                        accept=".json,application/json"
                        @change="onExchangeCurrenciesFileImport"
                      />
                      <button type="button" class="cd-exch-btn cd-exch-btn--ghost" @click="addCurrencyRow">
                        <Plus :size="13" aria-hidden="true" />
                        Add currency
                      </button>
                      <StructureImportWalletAddress
                        class="cd-exch-currencies__structure-import"
                        @upload-json="triggerExchangeCurrenciesFileInput"
                        @scan-qr="onExchangeCurrenciesScanQr"
                      />
                    </div>
                    -->


                    <!-- Layout mirrors tab.details.Contact.Wallets.vue (tabsFor.details):
                         .wallets-tab > .empty-state | .wallets-list with CardWalletAddress children. -->
                    <div class="cd-exch-wallets-tab">
                      <div v-if="form.currencies.length === 0" class="cd-exch-wallets-empty">
                        <p>No currencies added yet. Use the toolbar to add or import addresses.</p>
                      </div>
                      <div v-else class="cd-exch-wallets-list">
                        <template v-for="(currency, index) in form.currencies" :key="index">
                          <CardWalletAddress
                            v-if="isCurrencyComplete(currency)"
                            :wallet="toWalletLike(currency, index)"
                            @delete="removeCurrency(index)"
                            @copy="onExchangeCurrencyCopy"
                          />
                          <div
                            v-else
                            class="cd-exch-currency-card cd-exch-currency-card--editing"
                          >
                            <button
                              type="button"
                              class="cd-exch-currency-card__remove"
                              aria-label="Remove currency"
                              @click="removeCurrency(index)"
                            >
                              <Trash2 :size="16" />
                            </button>
                            <div class="cd-exch-currencies__row">
                              <DropdownCurrency
                                :model-value="currency.abbreviation"
                                @update:model-value="(v) => onCurrencyPick(index, v)"
                              />
                              <span class="cd-exch-currencies__sep" aria-hidden="true">://</span>
                              <input
                                v-model="currency.address"
                                type="text"
                                class="cd-exch-input cd-exch-input--sm"
                                placeholder="Wallet address"
                              />
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" class="cd-tabs__content">
                  <TabDetailsContactNotes
                    v-if="form.id != null"
                    :contact-id="form.id"
                    :contact-name="form.name"
                    note-owner-kind="exchange"
                  />
                  <div v-else class="cd-coming-soon">
                    <NotebookPen :size="32" class="cd-coming-soon__icon" />
                    <p>Save this exchange to start adding notes.</p>
                  </div>
                </TabsContent>
              </TabsRoot>
            </div>
          </div>
        </div>

        <Separator class="cd-separator" />

        <div class="cd-footer">
          <button type="button" class="cd-footer-btn cd-footer-btn--ghost" @click="close">Cancel</button>
          <button type="button" class="cd-footer-btn cd-footer-btn--primary" @click="saveExchange">
            {{ isEditing ? 'Save changes' : 'Add exchange' }}
          </button>
        </div>

        <!-- Stacked sub-modal for picking / importing a currency. Uses the
             standalone (non-contact) flow so JSON imports return as a single
             batch we can append to `form.currencies` rather than persisting
             per-contact wallets via `addWallet`. -->
        <SubModalAddCurrency
          :show="showAddCurrencyModal"
          :contact-id="form.id ?? 0"
          entity-label="Exchange"
          :persist-imported-wallets-to-contact="false"
          @close="onAddCurrencyModalClose"
          @currency-added="onAddCurrencyModalCurrencyAdded"
          @standalone-currencies-imported="onAddCurrencyModalImported"
        />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Separator,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'radix-vue'
import {
  Plus,
  Trash2,
  Coins,
  Landmark,
  NotebookPen,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Globe,
} from 'lucide-vue-next'
import TabDetailsContactNotes from '@/components/modals/addressbook/tabsFor.details/tab.details.Contact.Notes.vue'
import DropdownCurrency from '@/components/dropdowns/dropdown.currency.from.publicIcons.vue'
import CardWalletAddress from '@/components/structure/card.WalletAddress.vue'
import StructureImportWalletAddress from '@/components/structure/structure.import.walletAddress.vue'
import SubModalAddCurrency from '@/components/modals/addressbook/subModals/subModal.add.Currency.vue'
import { parseWalletJsonFile, type ImportedWallet } from '@/lib/cores/importStandard/importWallet.json'
import type { Wallet } from '@/services/addressBook/service.addressBook.Wallet'
import type { Contact } from '@/services/addressBook/service.addressBook.Contact'
import ActionsDropdown from '@/components/dropdowns/dropdown.actions.vue'
import {
  getExchangePickerOptions,
  getExchangeIconSrc,
  getExchangeSocialMediaForDisplayName,
  getExchangeCountryForDisplayName,
  flagEmojiForCountryName,
} from '@/lib/cores/currencyCore/exchanges/exchangePickerOptions'
import type { ExchangeRecord } from '@/services/addressBook/service.addressBook.Exchange'
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

const SOCIAL_PLATFORM_ICONS: Record<string, Component> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
}

function socialIconForPlatform(platform: string): Component {
  return SOCIAL_PLATFORM_ICONS[platform.toLowerCase()] ?? Globe
}

function socialBiClassForPlatform(
  platform: string,
): 'bi bi-discord' | 'bi bi-reddit' | 'bi bi-telegram' | null {
  const p = platform.toLowerCase()
  if (p === 'discord') return 'bi bi-discord'
  if (p === 'reddit') return 'bi bi-reddit'
  if (p === 'telegram') return 'bi bi-telegram'
  return null
}

/** Compact URL for inline display next to the icon */
function displaySocialUrl(url: string): string {
  const raw = url?.trim() ?? ''
  if (!raw) return ''
  try {
    const u = new URL(raw)
    const path = u.pathname && u.pathname !== '/' ? u.pathname.replace(/\/$/, '') : ''
    return `${u.hostname}${path}` || raw
  } catch {
    return raw
  }
}

defineOptions({ name: 'ModalExchangeDetails' })

interface Currency {
  name: string
  abbreviation: string
  address: string
}

interface Exchange {
  id?: number
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: Currency[]
  email: string
  notes: string
}

const props = defineProps<{ exchange: Exchange | null }>()
const emit = defineEmits<{
  close: []
  'exchange-saved': [exchange: Exchange]
  'delete-requested': [exchange: Exchange]
}>()

const dialogOpen = computed(() => !!props.exchange)
const activeTab = ref('general')
const showAddCurrencyModal = ref(false)

function onDialogOpen(open: boolean) {
  if (!open) close()
}

function onDialogPointerDownOutside(event: CustomEvent<{ originalEvent: PointerEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (
    target.closest('.ex-dropdown-portal') ||
    target.closest('.ex-dropdown') ||
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper')
  ) {
    event.preventDefault()
  }
}

function onDialogInteractOutside(event: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (
    target.closest('.ex-dropdown-portal') ||
    target.closest('.ex-dropdown') ||
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper')
  ) {
    event.preventDefault()
  }
}

function emptyExchange(): Exchange {
  return {
    name: '',
    url: '',
    referralUrl: '',
    referralCode: '',
    currencies: [],
    email: '',
    notes: '',
  }
}

const isEditing = ref(false)
const form = ref<Exchange>(emptyExchange())
const exchangeLogoLoadFailed = ref(false)

/** Contact-shaped payload for header ActionsDropdown (same component as contact details). */
const exchangeActionsContactStub = computed<Contact>(() => ({
  id: form.value.id,
  type: 'exchange',
  firstname: form.value.name || 'Exchange',
  lastname: '',
  company: '',
  email: form.value.email || '',
  notes: form.value.notes || '',
}))

function onExchangeActionsEditMode(value: boolean) {
  console.log('Exchange details: edit mode from actions menu:', value)
}

function onExchangeActionsCancelEdit() {
  console.log('Exchange details: cancel edit from actions menu')
}

/**
 * Bridge from the modal's local `Exchange` (where `id?: number`) to the
 * `ExchangeRecord` shape expected by the export pipelines (`id: number`).
 * Falls back to `0` for unsaved exchanges so exports still produce a file
 * (the filename helper drops back to `exchange_0` when the name is empty).
 */
const currentExchangeRecord = computed<ExchangeRecord>(() => ({
  ...form.value,
  id: form.value.id ?? 0,
}))

/**
 * `currency-added` has no useful local meaning inside the modal — currencies
 * are mutated directly via `form.value.currencies` from the form UI. Logged
 * for parity with the row-level dropdown.
 */
function onModalCurrencyAdded(payload?: unknown) {
  console.log('Exchange modal: currency-added from actions menu:', payload)
}

/** Bubble delete up to the parent tab so it can run its confirm flow. */
function onModalDeleteRequested() {
  if (props.exchange) emit('delete-requested', props.exchange)
}

const exchangePickerOptions = computed(() => getExchangePickerOptions())

const exchangeLogoSrc = computed(() => {
  if (exchangeLogoLoadFailed.value) return null
  const v = form.value.name?.trim()
  if (!v) return null
  const opt = exchangePickerOptions.value.find((o) => o.label === v)
  if (!opt?.iconFile) return null
  return getExchangeIconSrc(opt.iconFile)
})

function onExchangeLogoError() {
  exchangeLogoLoadFailed.value = true
}

const exchangeInitials = computed(() => {
  const n = form.value.name?.trim() || ''
  if (!n) return '—'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
})

const avatarBackgroundColor = computed(() => {
  const name = form.value.name || 'exchange'
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).slice(-2)
  }
  return color
})

const exchangeCountry = computed(() => getExchangeCountryForDisplayName(form.value.name))
const exchangeCountryFlag = computed(() => flagEmojiForCountryName(exchangeCountry.value))

const exchangeSocialLinks = computed(() => {
  const sm = getExchangeSocialMediaForDisplayName(form.value.name)
  if (!sm) return []
  return Object.entries(sm)
    .filter(([, url]) => typeof url === 'string' && url.trim().length > 0)
    .map(([platform, url]) => {
      const biClass = socialBiClassForPlatform(platform)
      if (biClass) {
        return { platform, url: url.trim(), biClass }
      }
      return { platform, url: url.trim(), icon: socialIconForPlatform(platform) }
    })
})

watch(
  () => props.exchange,
  (ex) => {
    if (ex) {
      isEditing.value = true
      form.value = { ...emptyExchange(), ...JSON.parse(JSON.stringify(ex)) }
      activeTab.value = 'general'
    } else {
      isEditing.value = false
      form.value = emptyExchange()
    }
    exchangeLogoLoadFailed.value = false
  },
  { immediate: true, deep: true },
)

watch(
  () => form.value.name,
  () => {
    exchangeLogoLoadFailed.value = false
  },
)

const exchangeCurrenciesFileInputRef = ref<HTMLInputElement | null>(null)

function triggerExchangeCurrenciesFileInput() {
  exchangeCurrenciesFileInputRef.value?.click()
}

async function onExchangeCurrenciesFileImport(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const lower = file.name.toLowerCase()
  try {
    if (!lower.endsWith('.json')) {
      alert('Only wallet address JSON (.json) can be imported here.')
      return
    }
    const result = await parseWalletJsonFile(file)
    for (const w of result.wallets) {
      form.value.currencies.push({
        name: w.coinTicker,
        abbreviation: w.coinTicker,
        address: w.address,
      })
    }
  } catch (error) {
    console.error('Error importing exchange wallets:', error)
    alert(
      error instanceof Error
        ? error.message
        : 'Could not import JSON. Use a valid wallet address export.',
    )
  }

  if (target) target.value = ''
}

function onExchangeCurrenciesScanQr() {
  alert('QR Code scanning functionality not yet implemented.')
}

/* "Add currency" entry point used by both the toolbar button and the
 * ActionsDropdown's `add-currency-request`. Switches to the Currencies tab so
 * the newly added rows are immediately visible, and opens the dedicated
 * SubModalAddCurrency for picking a network / wallet address (or importing a
 * JSON wallet export). The actual append to `form.currencies` happens in
 * `onAddCurrencyModalCurrencyAdded` / `onAddCurrencyModalImported`. */
function addCurrencyRow() {
  activeTab.value = 'currencies'
  showAddCurrencyModal.value = true
}

function onAddCurrencyModalClose() {
  showAddCurrencyModal.value = false
}

/* Single currency added via the sub-modal. The exchange's currency rows use
 * `{ name, abbreviation, address }`; the sub-modal emits `network` (a coin
 * ticker) and `address`, so the ticker is used for both `name` and
 * `abbreviation`, mirroring the JSON-import path below. */
function onAddCurrencyModalCurrencyAdded(payload: {
  contactId: number
  network: string
  address: string
}) {
  form.value.currencies.push({
    name: payload.network,
    abbreviation: payload.network,
    address: payload.address,
  })
}

/* Batch import path: with `persist-imported-wallets-to-contact="false"` the
 * sub-modal emits a single `standalone-currencies-imported` event for the
 * whole JSON file instead of running per-contact `addWallet` calls. Append
 * each parsed entry as an exchange currency. */
function onAddCurrencyModalImported(payload: {
  targetId: number
  items: ImportedWallet[]
}) {
  for (const w of payload.items) {
    form.value.currencies.push({
      name: w.coinTicker,
      abbreviation: w.coinTicker,
      address: w.address,
    })
  }
}

function removeCurrency(index: number) {
  form.value.currencies.splice(index, 1)
}

function onCurrencyPick(index: number, value: string) {
  const row = form.value.currencies[index]
  if (!row) return
  row.abbreviation = value
  row.name = value
}

/* Whether a currency entry has enough info to render as a read-only
 * CardWalletAddress (matching tab.details.Contact.Wallets.vue). Incomplete
 * rows fall back to the inline editable card so users can still finish
 * filling them in. */
function isCurrencyComplete(currency: Currency): boolean {
  return !!currency?.abbreviation?.trim() && !!currency?.address?.trim()
}

/* Shape a `Currency` entry as a `Wallet`-like object so it can be rendered by
 * `CardWalletAddress`. The synthetic `id` is the row index — used only for
 * routing the card's `@delete` event back to `removeCurrency`. */
function toWalletLike(currency: Currency, index: number): Wallet {
  return {
    id: index,
    contactId: form.value.id ?? 0,
    coinTicker: currency.abbreviation,
    address: currency.address,
  }
}

function onExchangeCurrencyCopy(address: string) {
  console.log('Exchange currency address copied to clipboard:', address)
}

function saveExchange() {
  if (!form.value.name?.trim()) return
  emit('exchange-saved', form.value)
  close()
}

function close() {
  emit('close')
}
</script>

<style lang="scss" scoped>
/* Shell aligned with modal.details.Contact.vue (cd-*) */

.cd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10060;
  animation: cd-fade 0.15s ease;
}

@keyframes cd-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cd-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10061;
  width: min(95vw, 62rem);
  /* Fixed height so General / Currencies / Notes do not resize the shell.
     Inner panels flex to this height (same as populated Currencies). */
  height: 88vh;
  max-height: 88vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cd-pop 0.18s ease;
}

@keyframes cd-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.cd-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.cd-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.cd-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.cd-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cd-header__close {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition:
    background 0.12s,
    color 0.12s;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
}

.cd-separator {
  background: #e5e7eb;
  flex-shrink: 0;
}

.cd-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.cd-grid {
  display: grid;
  grid-template-columns: 17rem 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  min-height: 0;
}

.cd-sidebar {
  border-right: 1px solid #e5e7eb;
  padding: 1.25rem 1rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.cd-exch-logo {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #fff;
  overflow: hidden;
}

.cd-exch-logo--fallback {
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.cd-exch-logo__img {
  width: 72%;
  height: 72%;
  object-fit: contain;
}

.cd-exch-logo__initials {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
}

.cd-name {
  margin: 0.75rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  line-height: 1.35;
}

.cd-sidebar__meta {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}

.cd-sidebar__meta--country {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.cd-sidebar__flag {
  font-size: 1.05rem;
  line-height: 1;
  font-family:
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
}

.cd-exch-sidebar-social {
  width: 100%;
  margin-top: 0.75rem;
}

.cd-exch-sidebar-social__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.4rem;
  text-align: center;
}

.cd-exch-sidebar-social__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.cd-exch-sidebar-social__link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.4rem 0.5rem;
  border-radius: 0.375rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #2563eb;
  text-decoration: none;
  transition:
    background 0.12s,
    color 0.12s,
    border-color 0.12s;

  &:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1d4ed8;
  }
}

.cd-exch-sidebar-social__icon {
  flex-shrink: 0;
  color: #4b5563;
}

/* Match Lucide :size="16" for Bootstrap Icons */
.cd-exch-sidebar-social__icon--bi {
  font-size: 1rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
}

.cd-exch-sidebar-social__link:hover .cd-exch-sidebar-social__icon {
  color: #2563eb;
}

.cd-exch-sidebar-social__text {
  flex: 1;
  min-width: 0;
  font-size: 0.75rem;
  line-height: 1.35;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cd-sidebar__website-row {
  margin-top: 0.75rem;
}

.cd-bio {
  width: 100%;
  margin-top: 0.875rem;
}

.cd-bio__text {
  margin: 0;
  font-size: 0.8125rem;
  color: #374151;
  line-height: 1.55;
  text-align: center;
}

.cd-main {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cd-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.cd-tabs__list {
  display: flex;
  gap: 0.125rem;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.25rem;
  flex-shrink: 0;
}

.cd-tabs__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 0.85rem;
  min-height: 2.5rem;
  line-height: 1.2;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.cd-tabs__icon {
  flex-shrink: 0;
}

.cd-badge {
  background: #e5e7eb;
  color: #374151;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.4;
}

.cd-tabs__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
}

/* Exchange-specific form (inside tabs) */
.cd-exch-form {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 48rem;
  flex: 1;
  min-height: 0;
}

.cd-exch-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.cd-exch-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cd-exch-field--full {
  grid-column: 1 / -1;
}

.cd-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.cd-exch-input {
  width: 100%;
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
}

.cd-exch-input--sm {
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
}

.cd-exch-textarea {
  min-height: 5rem;
  resize: vertical;
  line-height: 1.45;
}

.cd-exch-currencies {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.cd-exch-currencies__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-bottom: 0.75rem;
}

.cd-exch-currencies__file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

:deep(.cd-exch-currencies__structure-import .icon-button) {
  padding: 0.35rem;
}

:deep(.cd-exch-currencies__structure-import .icon-button svg) {
  width: 1rem;
  height: 1rem;
}

.cd-exch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.12s;
}

.cd-exch-btn--ghost {
  background: transparent;
  border-color: #d1d5db;
  color: #374151;

  &:hover {
    background: #f3f4f6;
  }
}

/* Mirrors tabsFor.details / tab.details.Contact.Wallets.vue `.wallets-tab` + `.wallets-list` + card shell (CardWalletAddress `.cwa-card`) */
.cd-exch-wallets-tab {
  flex: 1;
  min-height: 0;
  padding: 1rem 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 0.5rem;
}

.cd-exch-wallets-tab::-webkit-scrollbar {
  width: 8px;
}

.cd-exch-wallets-tab::-webkit-scrollbar-track {
  background: transparent;
}

.cd-exch-wallets-tab::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.cd-exch-wallets-tab::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.cd-exch-wallets-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;

  p {
    margin: 0;
    font-size: 0.875rem;
  }
}

.cd-exch-wallets-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.cd-exch-currency-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  padding-top: 2.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition:
    box-shadow 0.18s ease,
    border-color 0.18s ease;
  overflow: hidden;
  gap: 0.625rem;
  min-width: 0;
}

.cd-exch-currency-card:hover {
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.12);
  border-color: #d1d5db;
}

.cd-exch-currency-card__remove {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #fef2f2;
  border-radius: 0.375rem;
  color: #dc2626;
  cursor: pointer;
  transition:
    background 0.12s,
    color 0.12s;
  flex-shrink: 0;
}

.cd-exch-currency-card__remove:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.cd-exch-currency-card__remove:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.cd-exch-currencies__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 2fr);
  gap: 0.5rem;
  align-items: center;
  padding: 0;
  border-bottom: none;
}

.cd-exch-currencies__sep {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
  color: #9ca3af;
  user-select: none;
}

.cd-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-top: none;
}

.cd-footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.12s,
    border-color 0.12s;
}

.cd-footer-btn--ghost {
  background: transparent;
  border-color: #d1d5db;
  color: #374151;

  &:hover {
    background: #f3f4f6;
  }
}

.cd-footer-btn--primary {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;

  &:hover {
    background: #1d4ed8;
  }
}

:deep(.custom-select-wrapper) {
  width: 100%;
}

.cd-coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.cd-coming-soon__icon {
  opacity: 0.35;
}
</style>
