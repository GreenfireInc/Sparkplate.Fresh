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
              <FormAddEntryContact
                v-model:form="form"
                v-model:wallets="wallets"
                v-model:current-tab="currentTab"
                @add-wallet="addWalletRow"
                @remove-wallet="removeWallet"
                @open-wallet-address="openWalletAddressModal"
                @file-import="handleFileImport"
                @scan-qr="onWalletTabScanQr"
              />

              <FormAddEntryFooter
                submit-label="Save contact"
                show-import
                @cancel="close"
                @file-import="handleFileImport"
              />
            </form>
          </div>

          <div v-else-if="selectedEntity === 'Exchanges'">
            <FormAddEntryExchange
              v-model="exchangeForm"
              @submit="saveExchange"
              @cancel="close"
              @open-exchange-address="openExchangeAddressModal"
              @file-import="handleExchangeFileImport"
              @scan-qr="onWalletTabScanQr"
            />
          </div>

          <div v-else-if="selectedEntity === 'Wallets'">
            <FormAddEntryExternalWallet
              v-model="externalWalletForm"
              @submit="saveExternalWallet"
              @cancel="close"
              @open-external-wallet-address="openExternalWalletAddressModal"
              @file-import="handleExternalWalletFileImport"
              @scan-qr="onWalletTabScanQr"
            />
          </div>

          <form
            v-else
            class="ac-add-entry-placeholder-form"
            novalidate
            @submit.prevent="onPlaceholderEntitySubmit"
          >
            <div class="ac-placeholder">
              <p>Form for adding a new {{ selectedEntity.slice(0, -1).toLowerCase() }} will be here.</p>
            </div>
            <FormAddEntryFooter
              :submit-label="placeholderFooterSubmitLabel"
              @cancel="close"
            />
          </form>
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
    :coin-ticker="exchangeAddressModal.coinTicker"
    @close="closeExchangeAddressModal"
    @confirm="onExchangeAddressConfirmed"
  />

  <SubModalInputWalletAddress
    :show="walletAddressModal.open && show"
    :coin-ticker="walletAddressModal.coinTicker"
    @close="closeWalletAddressModal"
    @confirm="onWalletAddressConfirmed"
  />

  <SubModalInputWalletAddress
    :show="externalWalletAddressModal.open && show"
    :coin-ticker="externalWalletAddressModal.coinTicker"
    @close="closeExternalWalletAddressModal"
    @confirm="onExternalWalletAddressConfirmed"
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
  Separator,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
} from 'radix-vue'
import { SquareUser, Landmark, Wallet as WalletIcon, Building2 } from 'lucide-vue-next'
import { type Contact, addContact, updateContact } from '@/services/addressBook/contactService'
import { addNote, getNotesForContactId, updateNote } from '@/services/addressBook/service.Note'
import { type Wallet, addWallet, getWalletsForContact, updateWallet, deleteWallet } from '@/services/addressBook/walletService'
import SubModalInputWalletAddress from '@/components/modals/addressbook/subModals/subModal.input.WalletAddress.vue'
import FormAddEntryExchange, {
  type ExchangeForm,
} from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.exchange.vue'
import FormAddEntryFooter from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.footer.vue'
import FormAddEntryContact from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.contact.vue'
import FormAddEntryExternalWallet, {
  makeEmptyExternalWalletForm,
  type ExternalWalletForm,
} from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.externalWallet.vue'
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

const emit = defineEmits(['close', 'contact-saved', 'exchange-saved', 'external-wallet-saved'])

function makeEmptyExchange(): ExchangeForm {
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
const form = ref<Contact>({ id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' })
const wallets = ref<Partial<Wallet>[]>([])
const currentTab = ref<'general' | 'advanced'>('general')
const selectedEntity = ref<EntityType>('Contacts')
const exchangeForm = ref<ExchangeForm>(makeEmptyExchange())
const externalWalletForm = ref<ExternalWalletForm>(makeEmptyExternalWalletForm())

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

const placeholderFooterSubmitLabel = computed(() => 'Add Companies')

function onPlaceholderEntitySubmit() {
  /* Companies add-entry form not implemented yet */
}

function saveExternalWallet() {
  emit('external-wallet-saved', { ...externalWalletForm.value })
  close()
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      closeExchangeAddressModal()
      closeWalletAddressModal()
      closeExternalWalletAddressModal()
      currentTab.value = 'general'
      selectedEntity.value = props.initialEntity
      exchangeForm.value = makeEmptyExchange()
      externalWalletForm.value = makeEmptyExternalWalletForm()
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
    closeExternalWalletAddressModal()
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
    target.closest('.wa-dropdown-portal') ||
    target.closest('.wa-dropdown') ||
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

/** Maps General-tab “Notes” into the contact Notes list (first item). */
async function syncGeneralNotesToNotesTab(contactId: number, editing: boolean) {
  const notesTrimmed = form.value.notes?.trim() ?? ''
  if (!notesTrimmed) return

  if (!editing) {
    await addNote(contactId, {
      title: '',
      content: notesTrimmed,
      isPasswordProtected: false,
    })
    return
  }

  const existing = await getNotesForContactId(contactId)
  if (existing.length === 0) {
    await addNote(contactId, {
      title: '',
      content: notesTrimmed,
      isPasswordProtected: false,
    })
    return
  }

  try {
    await updateNote(contactId, existing[0].id, { content: notesTrimmed })
  } catch {
    await addNote(contactId, {
      title: '',
      content: notesTrimmed,
      isPasswordProtected: false,
    })
  }
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

  await syncGeneralNotesToNotesTab(savedContact.id!, isEditing.value)

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

const exchangeAddressModal = ref<{ open: boolean; index: number | null; coinTicker: string }>({
  open: false,
  index: null,
  coinTicker: '',
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

function onExchangeAddressConfirmed(payload: { address: string; coinTicker: string }) {
  const index = exchangeAddressModal.value.index
  if (index !== null) {
    const row = exchangeForm.value.currencies[index]
    if (row) {
      row.address = payload.address
      row.abbreviation = payload.coinTicker
      row.name = payload.coinTicker
    }
  }
}

const walletAddressModal = ref<{ open: boolean; index: number | null; coinTicker: string }>({
  open: false,
  index: null,
  coinTicker: '',
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

function onWalletAddressConfirmed(payload: { address: string; coinTicker: string }) {
  const index = walletAddressModal.value.index
  if (index !== null) {
    const row = wallets.value[index]
    if (row) {
      row.address = payload.address
      row.coinTicker = payload.coinTicker
    }
  }
}

const externalWalletAddressModal = ref<{ open: boolean; index: number | null; coinTicker: string }>({
  open: false,
  index: null,
  coinTicker: '',
})

function openExternalWalletAddressModal(index: number) {
  const row = externalWalletForm.value.currencies[index]
  if (!row) return
  externalWalletAddressModal.value = {
    open: true,
    index,
    coinTicker: row.abbreviation || '',
  }
}

function closeExternalWalletAddressModal() {
  externalWalletAddressModal.value = { open: false, index: null, coinTicker: '' }
}

function onExternalWalletAddressConfirmed(payload: { address: string; coinTicker: string }) {
  const index = externalWalletAddressModal.value.index
  if (index !== null) {
    const row = externalWalletForm.value.currencies[index]
    if (row) {
      row.address = payload.address
      row.abbreviation = payload.coinTicker
      row.name = payload.coinTicker
    }
  }
}

async function handleExternalWalletFileImport(event: Event) {
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
      externalWalletForm.value.currencies.push({
        name: w.coinTicker,
        abbreviation: w.coinTicker,
        address: w.address,
      })
    }
  } catch (error) {
    console.error('Error importing external wallet addresses:', error)
    alert(
      error instanceof Error
        ? error.message
        : 'Could not import JSON. Use a valid wallet address export.',
    )
  }

  if (target) target.value = ''
}

function saveExchange() {
  if (!exchangeForm.value.name?.trim()) return
  emit('exchange-saved', { ...exchangeForm.value })
  close()
}

function onWalletTabScanQr() {
  alert('QR Code scanning functionality not yet implemented.')
}

async function handleExchangeFileImport(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const lower = file.name.toLowerCase()
  try {
    if (!lower.endsWith('.json')) {
      alert('For exchanges, only wallet address JSON (.json) can be imported. VCF is for the contact form.')
      return
    }
    const result = await parseWalletJsonFile(file)
    for (const w of result.wallets) {
      exchangeForm.value.currencies.push({
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

  if (target) {
    target.value = ''
  }
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

.ac-add-entry-placeholder-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
</style>
