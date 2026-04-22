<template>
  <DialogRoot :open="show" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="ac-modal-overlay" />
      <DialogContent
        class="ac-modal"
        :aria-describedby="undefined"
        @pointer-down-outside="onDialogPointerDownOutside"
        @interact-outside="onDialogInteractOutside"
      >
        <div class="ac-modal__header">
          <div class="ac-modal__header-row">
            <SelectRoot v-model="selectedEntity">
              <SelectTrigger
                id="ac-entity-type"
                class="ac-modal__entity-trigger"
                aria-label="Record type"
              >
                <span class="ac-modal__entity-value">
                  <component
                    v-if="selectedEntityIcon"
                    :is="selectedEntityIcon"
                    :size="16"
                    class="ac-modal__entity-icon"
                    aria-hidden="true"
                  />
                  <SelectValue placeholder="Type" />
                </span>
                <i class="bi bi-chevron-down ac-modal__select-chevron" aria-hidden />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent class="ac-modal__select-content" position="popper" :side-offset="4">
                  <SelectViewport class="ac-modal__select-viewport">
                    <SelectItem value="Contacts" class="ac-modal__select-item">
                      <SquareUser :size="16" class="ac-modal__select-item-icon" aria-hidden="true" />
                      <SelectItemText>Contacts</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Exchanges" class="ac-modal__select-item">
                      <Landmark :size="16" class="ac-modal__select-item-icon" aria-hidden="true" />
                      <SelectItemText>Exchanges</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Wallets" class="ac-modal__select-item">
                      <WalletIcon :size="16" class="ac-modal__select-item-icon" aria-hidden="true" />
                      <SelectItemText>Wallets</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Companies" class="ac-modal__select-item">
                      <Building2 :size="16" class="ac-modal__select-item-icon" aria-hidden="true" />
                      <SelectItemText>Companies</SelectItemText>
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>

            <DialogTitle class="ac-modal__title">{{ modalTitle }}</DialogTitle>

            <DialogClose class="ac-modal__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="ac-modal__separator" />

        <div class="ac-modal__body">
          <div v-if="selectedEntity === 'Contacts'">
            <form id="ac-add-contact-form" novalidate @submit.prevent="saveContact">
              <TabsRoot v-model="currentTab" class="ac-tabs">
                <TabsList class="ac-tabs__list" aria-label="Contact sections">
                  <TabsTrigger value="general" class="ac-tabs__trigger">General</TabsTrigger>
                  <TabsTrigger value="advanced" class="ac-tabs__trigger">Wallets</TabsTrigger>
                </TabsList>

                <TabsContent value="general" class="ac-tabs__content">
                  <div class="ac-tabs__panel ac-tabs__panel--general">
                    <div class="ac-general-fields">
                      <div class="ac-form-grid">
                        <div class="ac-field">
                          <Label class="ac-label" for="ac-firstname">First name</Label>
                          <input id="ac-firstname" v-model="form.firstname" type="text" class="ac-input" autocomplete="given-name" />
                        </div>
                        <div class="ac-field">
                          <Label class="ac-label" for="ac-lastname">Last name</Label>
                          <input id="ac-lastname" v-model="form.lastname" type="text" class="ac-input" autocomplete="family-name" />
                        </div>
                      </div>
                      <div class="ac-form-grid">
                        <div class="ac-field">
                          <Label class="ac-label" for="ac-email">Email</Label>
                          <input id="ac-email" v-model="form.email" type="email" class="ac-input" autocomplete="email" />
                        </div>
                        <div class="ac-field">
                          <Label class="ac-label" for="ac-company">Company</Label>
                          <input id="ac-company" v-model="form.company" type="text" class="ac-input" autocomplete="organization" />
                        </div>
                      </div>
                      <div class="ac-field">
                        <Label class="ac-label" for="ac-notes">Notes</Label>
                        <textarea id="ac-notes" v-model="form.notes" class="ac-textarea" rows="3" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" class="ac-tabs__content">
                  <div
                    class="ac-tabs__panel ac-tabs__panel--wallets"
                    role="region"
                    aria-labelledby="ac-wallets-heading"
                  >
                    <p id="ac-wallets-heading" class="ac-wallets__intro">
                      Wallet addresses linked to this contact.
                    </p>
                    <Separator class="ac-wallets__separator" />
                    <div class="ac-wallets__thead">
                      <span class="ac-wallets__th">Coin</span>
                      <span class="ac-wallets__th">Address</span>
                      <span class="ac-wallets__th ac-wallets__th--action">
                        <span class="ac-wallets__visually-hidden">Remove</span>
                      </span>
                    </div>
                    <ScrollAreaRoot class="ac-wallets__scroll-root" type="hover">
                      <ScrollAreaViewport class="ac-wallets__viewport" aria-label="Wallet list">
                        <div class="ac-wallets__list">
                          <p v-if="wallets.length === 0" class="ac-wallets__empty">
                            No wallets yet. Use “Add wallet” or Import from the actions below.
                          </p>
                          <div
                            v-for="(wallet, index) in wallets"
                            :key="index"
                            class="ac-wallet-row"
                          >
                            <div class="ac-wallet-row__cell">
                              <CurrencyDropdown v-model="wallet.coinTicker" />
                            </div>
                            <div class="ac-wallet-row__cell">
                              <button
                                :id="`ac-wallet-addr-${index}`"
                                type="button"
                                class="ac-input ac-address-trigger"
                                :class="{ 'ac-address-trigger--empty': !wallet.address }"
                                :aria-label="wallet.address ? `Edit wallet address, row ${Number(index) + 1}` : `Enter wallet address, row ${Number(index) + 1}`"
                                @click="openWalletAddressModal(index)"
                              >
                                <span v-if="wallet.address" class="ac-address-trigger__value">
                                  {{ formatWalletAddress(wallet.address) }}
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
                                type="button"
                                class="ac-btn-remove"
                                :aria-label="`Remove wallet row ${Number(index) + 1}`"
                                @click="removeWallet(index)"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </ScrollAreaViewport>
                      <ScrollAreaScrollbar orientation="vertical" class="ac-wallets__scrollbar">
                        <ScrollAreaThumb class="ac-wallets__thumb" />
                      </ScrollAreaScrollbar>
                    </ScrollAreaRoot>
                    <div class="ac-wallets__toolbar">
                      <button type="button" class="ac-btn-add-wallet" @click="addWalletRow">+ Add wallet</button>
                    </div>
                  </div>
                </TabsContent>
              </TabsRoot>

              <div class="ac-modal__actions">
                <input
                  ref="fileInput"
                  type="file"
                  accept=".json,.vcf,.vcard,application/json,text/vcard"
                  class="ac-file-input"
                  @change="handleFileImport"
                />
                <button type="button" class="ac-btn ac-btn--import" @click="triggerFileImport">Import</button>
                <button type="button" class="ac-btn ac-btn--secondary" @click="close">Cancel</button>
                <button type="submit" class="ac-btn ac-btn--primary">Save contact</button>
              </div>
            </form>
          </div>

          <div v-else-if="selectedEntity === 'Exchanges'">
            <form class="ac-exch-form" novalidate @submit.prevent="saveExchange">
              <div class="ac-form-grid">
                <div class="ac-field">
                  <Label class="ac-label" for="ac-exch-name">Exchange Name</Label>
                  <DropdownExchanges
                    id="ac-exch-name"
                    v-model="exchangeForm.name"
                    placeholder="Select exchange…"
                    @pick="onExchangePick"
                  />
                </div>
                <div class="ac-field">
                  <Label class="ac-label" for="ac-exch-email">Associated Email</Label>
                  <input
                    id="ac-exch-email"
                    v-model="exchangeForm.email"
                    type="email"
                    class="ac-input"
                    placeholder="you@example.com"
                    autocomplete="email"
                  />
                </div>
              </div>

              <div class="ac-form-grid ac-exch-form__grid">
                <div class="ac-field">
                  <Label class="ac-label" for="ac-exch-referralCode">Referral Code</Label>
                  <input
                    id="ac-exch-referralCode"
                    v-model="exchangeForm.referralCode"
                    type="text"
                    class="ac-input"
                    placeholder="e.g. ABC123"
                    autocomplete="off"
                  />
                </div>
                <div class="ac-field">
                  <Label class="ac-label" for="ac-exch-referralUrl">Referral URL</Label>
                  <input
                    id="ac-exch-referralUrl"
                    v-model="exchangeForm.referralUrl"
                    type="url"
                    class="ac-input"
                    placeholder="https://exchange.com/ref/…"
                    autocomplete="off"
                  />
                </div>
              </div>

              <div class="ac-exch-currencies">
                <div class="ac-exch-currencies__heading">
                  <div class="ac-exch-currencies__tab">
                    <Coins :size="14" class="ac-exch-currencies__tab-icon" aria-hidden="true" />
                    Currencies
                    <span class="ac-exch-badge">{{ exchangeForm.currencies.length }}</span>
                  </div>
                  <button
                    type="button"
                    class="ac-exch-btn ac-exch-btn--ghost ac-exch-btn--sm"
                    @click="addExchangeCurrencyRow"
                  >
                    <Plus :size="13" aria-hidden="true" /> Add
                  </button>
                </div>

                <div v-if="exchangeForm.currencies.length > 0" class="ac-exch-currencies__table">
                  <div class="ac-exch-currencies__header">
                    <span>Currency</span>
                    <span>Address</span>
                    <span />
                  </div>
                  <div
                    v-for="(currency, index) in exchangeForm.currencies"
                    :key="index"
                    class="ac-exch-currencies__row"
                  >
                    <CurrencyDropdown
                      :model-value="currency.abbreviation"
                      @update:model-value="(v) => onExchangeCurrencyPick(index, v)"
                    />
                    <button
                      type="button"
                      class="ac-input ac-input--sm ac-address-trigger"
                      :class="{ 'ac-address-trigger--empty': !currency.address }"
                      :aria-label="currency.address ? 'Edit wallet address' : 'Enter wallet address'"
                      @click="openExchangeAddressModal(index)"
                    >
                      <span v-if="currency.address" class="ac-address-trigger__value">
                        {{ formatWalletAddress(currency.address) }}
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
                    <button
                      type="button"
                      class="ac-exch-remove-btn"
                      aria-label="Remove currency"
                      @click="removeExchangeCurrency(index)"
                    >
                      <Trash2 :size="13" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p v-else class="ac-exch-currencies__empty">No currencies added yet.</p>
              </div>

              <div class="ac-modal__actions">
                <button type="button" class="ac-btn ac-btn--secondary" @click="close">Cancel</button>
                <button type="submit" class="ac-btn ac-btn--primary">Add Exchange</button>
              </div>
            </form>
          </div>

          <div v-else class="ac-placeholder">
            <p>Form for adding a new {{ selectedEntity.slice(0, -1).toLowerCase() }} will be here.</p>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <!--
    Rendered as a sibling of the parent DialogRoot (not nested) so Radix doesn't
    share inert/focus state between the two dialogs. Kept mounted and driven by
    :show so Radix can run its proper open->close cleanup (body pointer-events,
    focus restore, dismissable-layer unregister). v-if unmounting mid-close
    leaves pointer-events:none on <body>, which makes subsequent triggers dead.
  -->
  <SubModalInputWalletAddress
    :show="exchangeAddressModal.open && show"
    :title="exchangeAddressModalTitle"
    :coin-ticker="exchangeAddressModal.coinTicker"
    @close="closeExchangeAddressModal"
    @confirm="onExchangeAddressConfirmed"
  />

  <SubModalInputWalletAddress
    :show="walletAddressModal.open && show"
    :title="walletAddressModalTitle"
    :coin-ticker="walletAddressModal.coinTicker"
    @close="closeWalletAddressModal"
    @confirm="onWalletAddressConfirmed"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from 'radix-vue'
import { SquareUser, Landmark, Wallet as WalletIcon, Building2, Plus, Trash2, Coins, ShieldCheck } from 'lucide-vue-next'
import { type Contact, addContact, updateContact } from '@/services/addressBook/contactService'
import { type Wallet, addWallet, getWalletsForContact, updateWallet, deleteWallet } from '@/services/addressBook/walletService'
import CurrencyDropdown from '@/components/dropdown/dropdown.currency.vue'
import DropdownExchanges from '@/components/dropdown/dropdown.exchanges.vue'
import SubModalInputWalletAddress from '@/components/modals/addressbook/subModals/subModal.input.WalletAddress.vue'
import { parseWalletJsonFile } from '@/lib/cores/importStandard/importWallet.json'
import { useContactParser } from '@/composables/useContactParser'

defineOptions({ name: 'AddContactModal' })

const { parseFile } = useContactParser()

type EntityType = 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'

const props = withDefaults(
  defineProps<{
    show: boolean
    contact: Contact | null
    initialEntity?: EntityType
  }>(),
  {
    initialEntity: 'Contacts',
  },
)

const emit = defineEmits(['close', 'contact-saved', 'exchange-saved'])

interface ExchangeCurrency {
  name: string
  abbreviation: string
  address: string
}

interface ExchangeForm {
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: ExchangeCurrency[]
  email: string
}

function makeEmptyExchange(): ExchangeForm {
  return { name: '', url: '', referralUrl: '', referralCode: '', currencies: [], email: '' }
}

const isEditing = ref(false)
const form = ref<Contact>({ id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' })
const wallets = ref<Partial<Wallet>[]>([])
const currentTab = ref<'general' | 'advanced'>('general')
const selectedEntity = ref<EntityType>('Contacts')
const fileInput = ref<HTMLInputElement | null>(null)
const exchangeForm = ref<ExchangeForm>(makeEmptyExchange())

const modalTitle = computed(() => {
  if (props.contact && selectedEntity.value === 'Contacts') {
    return 'Edit contact'
  }
  return `Add new ${selectedEntity.value.slice(0, -1)}`
})

const ENTITY_ICONS = {
  Contacts: SquareUser,
  Exchanges: Landmark,
  Wallets: WalletIcon,
  Companies: Building2,
} as const

const selectedEntityIcon = computed(() => ENTITY_ICONS[selectedEntity.value])

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      closeExchangeAddressModal()
      closeWalletAddressModal()
      currentTab.value = 'general'
      selectedEntity.value = props.initialEntity
      exchangeForm.value = makeEmptyExchange()
      if (props.contact) {
        isEditing.value = true
        form.value = { ...props.contact }
        loadWallets(props.contact.id!)
      } else {
        isEditing.value = false
        form.value = { id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' }
        wallets.value = []
      }
    }
  }
)

function onDialogOpen(open: boolean) {
  if (!open) {
    closeExchangeAddressModal()
    closeWalletAddressModal()
    emit('close')
  }
}

/**
 * `dropdown.currency` and `dropdown.exchanges` both teleport their option
 * lists to `body`, so radix treats clicks inside those popovers as outside
 * the dialog. Ignore those interactions here.
 */
function isInsideTeleportedDropdown(target: EventTarget | null | undefined): boolean {
  if (!(target instanceof Element)) return false
  return !!(
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper') ||
    target.closest('.ex-dropdown-portal') ||
    target.closest('.ex-dropdown') ||
    target.closest('[data-stacked-modal="input-wallet-address"]')
  )
}

function onDialogPointerDownOutside(event: CustomEvent<{ originalEvent: PointerEvent }>) {
  if (isInsideTeleportedDropdown(event.detail?.originalEvent?.target)) {
    event.preventDefault()
  }
}

function onDialogInteractOutside(event: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) {
  if (isInsideTeleportedDropdown(event.detail?.originalEvent?.target)) {
    event.preventDefault()
  }
}

async function loadWallets(contactId: number) {
  wallets.value = await getWalletsForContact(contactId)
}

function addWalletRow() {
  wallets.value.push({ coinTicker: '', address: '' })
  openWalletAddressModal(wallets.value.length - 1)
}

function removeWallet(index: number) {
  const wallet = wallets.value[index]
  if (wallet.id) {
    deleteWallet(wallet.id)
  }
  wallets.value.splice(index, 1)
}

async function saveContact() {
  const first = form.value.firstname?.trim()
  const last = form.value.lastname?.trim()
  if (!first || !last) {
    currentTab.value = 'general'
    await nextTick()
    document.getElementById('ac-firstname')?.focus()
    return
  }

  let savedContact: Contact
  if (isEditing.value) {
    await updateContact(form.value)
    savedContact = form.value
  } else {
    savedContact = await addContact(form.value)
  }

  for (const wallet of wallets.value) {
    if (wallet.id) {
      await updateWallet(wallet as Wallet)
    } else {
      await addWallet({
        contactId: savedContact.id!,
        coinTicker: wallet.coinTicker || '',
        address: wallet.address || '',
      })
    }
  }

  emit('contact-saved')
  close()
}

function addExchangeCurrencyRow() {
  exchangeForm.value.currencies.push({ name: '', abbreviation: '', address: '' })
  openExchangeAddressModal(exchangeForm.value.currencies.length - 1)
}

function removeExchangeCurrency(index: number) {
  exchangeForm.value.currencies.splice(index, 1)
}

function onExchangeCurrencyPick(index: number, value: string) {
  const row = exchangeForm.value.currencies[index]
  if (!row) return
  row.abbreviation = value
  row.name = value
}

const exchangeAddressModal = ref<{ open: boolean; index: number | null; coinTicker: string }>({
  open: false,
  index: null,
  coinTicker: '',
})

const exchangeAddressModalTitle = computed(() => {
  const ticker = exchangeAddressModal.value.coinTicker
  return ticker ? `Enter ${ticker.toUpperCase()} wallet address` : 'Enter wallet address'
})

function openExchangeAddressModal(index: number) {
  const row = exchangeForm.value.currencies[index]
  if (!row) return
  exchangeAddressModal.value = {
    open: true,
    index,
    coinTicker: row.abbreviation || '',
  }
}

function closeExchangeAddressModal() {
  exchangeAddressModal.value = { open: false, index: null, coinTicker: '' }
}

function onExchangeAddressConfirmed(address: string) {
  const index = exchangeAddressModal.value.index
  if (index !== null) {
    const row = exchangeForm.value.currencies[index]
    if (row) row.address = address
  }
}

function formatWalletAddress(address: string): string {
  if (!address) return ''
  if (address.length <= 18) return address
  return `${address.slice(0, 9)}...${address.slice(-9)}`
}

const walletAddressModal = ref<{ open: boolean; index: number | null; coinTicker: string }>({
  open: false,
  index: null,
  coinTicker: '',
})

const walletAddressModalTitle = computed(() => {
  const ticker = walletAddressModal.value.coinTicker
  return ticker ? `Enter ${ticker.toUpperCase()} wallet address` : 'Enter wallet address'
})

function openWalletAddressModal(index: number) {
  const row = wallets.value[index]
  if (!row) return
  walletAddressModal.value = {
    open: true,
    index,
    coinTicker: row.coinTicker || '',
  }
}

function closeWalletAddressModal() {
  walletAddressModal.value = { open: false, index: null, coinTicker: '' }
}

function onWalletAddressConfirmed(address: string) {
  const index = walletAddressModal.value.index
  if (index !== null) {
    const row = wallets.value[index]
    if (row) row.address = address
  }
}

function onExchangePick(payload: { key: string; label: string; website: string }) {
  if (payload.website) exchangeForm.value.url = payload.website
}

function saveExchange() {
  if (!exchangeForm.value.name?.trim()) return
  emit('exchange-saved', { ...exchangeForm.value })
  close()
}

const triggerFileImport = () => {
  fileInput.value?.click()
}

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const lower = file.name.toLowerCase()

  try {
    if (lower.endsWith('.json')) {
      const result = await parseWalletJsonFile(file)
      wallets.value.push(...result.wallets)
    } else if (lower.endsWith('.vcf') || lower.endsWith('.vcard')) {
      const parsed = await parseFile(file)
      const list = Array.isArray(parsed) ? parsed : []
      if (list.length === 0) {
        alert('No contacts found in this VCF file.')
        return
      }
      if (list.length > 1) {
        alert(
          `Found ${list.length} contacts in the VCF file. Only the first contact will be merged into this form.`,
        )
      }
      const c = list[0] as Record<string, string | undefined>
      if (c.firstname) form.value.firstname = String(c.firstname)
      if (c.lastname) form.value.lastname = String(c.lastname)
      if (c.email) form.value.email = String(c.email)
      if (c.company) form.value.company = String(c.company)
      currentTab.value = 'general'
    } else {
      alert('Unsupported file type. Use .json for wallet import or .vcf / .vcard for contact fields.')
    }
  } catch (error) {
    console.error('Error importing file:', error)
    alert(
      error instanceof Error
        ? error.message
        : 'Error importing file. Use a valid wallet JSON or VCF contact file.',
    )
  }

  if (target) {
    target.value = ''
  }
}

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.ac-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10060;
  animation: ac-modal-fade 0.15s ease;
}

@keyframes ac-modal-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ac-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10061;
  width: min(92vw, 34rem);
  max-height: 85vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ac-modal-pop 0.18s ease;
}

@keyframes ac-modal-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.ac-modal__header {
  padding: 1rem 1.25rem 0.75rem;
}

.ac-modal__header-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.75rem;
}

.ac-modal__entity-trigger {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 8.5rem;
  padding: 0.5rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus-visible {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
}

.ac-modal__entity-value {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
}

.ac-modal__entity-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.ac-modal__select-chevron {
  font-size: 0.65rem;
  color: #6b7280;
}

:deep(.ac-modal__select-content) {
  z-index: 10070;
  min-width: 8.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
}

:deep(.ac-modal__select-viewport) {
  padding: 0.125rem 0;
}

:deep(.ac-modal__select-item) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  padding: 0.5rem 0.65rem;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: #f3f4f6;
  }

  &[data-state='checked'] {
    font-weight: 600;
    color: #2563eb;
  }
}

:deep(.ac-modal__select-item-icon) {
  flex-shrink: 0;
  color: #4b5563;
}

:deep(.ac-modal__select-item[data-state='checked']) .ac-modal__select-item-icon {
  color: #2563eb;
}

.ac-modal__title {
  flex: 1;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  line-height: 1.3;
}

.ac-modal__close {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
}

.ac-modal__separator {
  background: #e5e7eb;
}

.ac-modal__body {
  overflow-y: auto;
  padding: 1rem 1.25rem 1.25rem;
}

.ac-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ac-tabs__list {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 1.25rem;
}

.ac-tabs__trigger {
  position: relative;
  background: none;
  border: none;
  padding: 0.65rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
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

.ac-tabs__content {
  padding-bottom: 0.25rem;
}

/* Shared height so the dialog does not jump between General and Wallets */
.ac-tabs__panel {
  box-sizing: border-box;
  height: 26rem;
  max-height: min(26rem, 52vh);
}

.ac-tabs__panel--general {
  overflow-y: auto;
  padding-right: 0.15rem;
}

.ac-tabs__panel--wallets {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-height: 0;
  overflow: hidden;
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

.ac-wallets__th--action {
  width: 3.5rem;
  text-align: right;
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

.ac-wallets__scroll-root {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.ac-wallets__viewport {
  padding: 0.5rem 0.5rem 0.65rem 0.65rem;
  outline: none;
}

.ac-wallets__list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-right: 0.25rem;
}

.ac-wallets__empty {
  margin: 0;
  padding: 1.25rem 0.5rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #9ca3af;
  line-height: 1.45;
}

:deep(.ac-wallets__scrollbar) {
  display: flex;
  width: 0.5rem;
  padding: 2px;
  margin-right: 2px;
  background: transparent;
  user-select: none;
  touch-action: none;
}

:deep(.ac-wallets__scrollbar[data-orientation='vertical']) {
  border-radius: 999px;
}

:deep(.ac-wallets__thumb) {
  flex: 1;
  min-height: 1.5rem;
  border-radius: 999px;
  background: #d1d5db;
  transition: background 0.15s;
}

:deep(.ac-wallets__thumb:hover) {
  background: #9ca3af;
}

.ac-wallets__toolbar {
  flex-shrink: 0;
  padding-top: 0.15rem;
}

.ac-general-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ac-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.25rem;
}

.ac-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ac-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.ac-input,
.ac-textarea {
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

.ac-textarea {
  min-height: 5rem;
  resize: vertical;
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

.ac-btn-add-wallet {
  align-self: flex-start;
  width: auto;
  padding: 0.45rem 0.85rem;
  font-size: 0.8125rem;
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

  &:hover {
    background: #1d4ed8;
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

.ac-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background: #fff;
}

/* ---------- Exchange form ---------- */

.ac-exch-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ac-exch-form__grid {
  margin-top: 0;
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

.ac-exch-currencies {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.ac-exch-currencies__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.85rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.ac-exch-currencies__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.ac-exch-currencies__tab-icon {
  color: #6b7280;
}

.ac-exch-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border-radius: 999px;
}

.ac-exch-currencies__table {
  display: flex;
  flex-direction: column;
}

.ac-exch-currencies__header,
.ac-exch-currencies__row {
  display: grid;
  grid-template-columns: 1fr 2fr 2rem;
  gap: 0.5rem;
  align-items: center;
  padding: 0.3rem 0.85rem;
}

.ac-exch-currencies__header {
  padding: 0.35rem 0.85rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #4b5563;
}

.ac-exch-currencies__row {
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
}

.ac-exch-currencies__empty {
  margin: 0;
  padding: 0.85rem;
  font-size: 0.8125rem;
  color: #9ca3af;
  text-align: center;
}

.ac-exch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}

.ac-exch-btn--sm {
  padding: 0.3rem 0.55rem;
  font-size: 0.75rem;
}

.ac-exch-btn--ghost {
  background: transparent;
  color: #2563eb;
  border-color: #d1d5db;

  &:hover {
    background: #eff6ff;
    border-color: #2563eb;
  }
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
</style>
