<template>
  <DialogRoot :open="show" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="ac-modal-overlay" />
      <DialogContent class="ac-modal" :aria-describedby="undefined">
        <div class="ac-modal__header">
          <div class="ac-modal__header-row">
            <SelectRoot v-model="selectedEntity">
              <SelectTrigger
                id="ac-entity-type"
                class="ac-modal__entity-trigger"
                aria-label="Record type"
              >
                <SelectValue placeholder="Type" />
                <i class="bi bi-chevron-down ac-modal__select-chevron" aria-hidden />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent class="ac-modal__select-content" position="popper" :side-offset="4">
                  <SelectViewport class="ac-modal__select-viewport">
                    <SelectItem value="Contacts" class="ac-modal__select-item">
                      <SelectItemText>Contacts</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Exchanges" class="ac-modal__select-item">
                      <SelectItemText>Exchanges</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Wallets" class="ac-modal__select-item">
                      <SelectItemText>Wallets</SelectItemText>
                    </SelectItem>
                    <SelectItem value="Companies" class="ac-modal__select-item">
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
                              <input
                                :id="`ac-wallet-addr-${index}`"
                                v-model="wallet.address"
                                type="text"
                                class="ac-input"
                                placeholder="Wallet address"
                                autocomplete="off"
                                :aria-label="`Wallet address, row ${Number(index) + 1}`"
                              />
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
                  accept=".json"
                  class="ac-file-input"
                  @change="handleFileImport"
                />
                <button type="button" class="ac-btn ac-btn--import" @click="triggerFileImport">Import</button>
                <button type="button" class="ac-btn ac-btn--secondary" @click="close">Cancel</button>
                <button type="submit" class="ac-btn ac-btn--primary">Save contact</button>
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
import { type Contact, addContact, updateContact } from '@/services/addressBook/contactService'
import { type Wallet, addWallet, getWalletsForContact, updateWallet, deleteWallet } from '@/services/addressBook/walletService'
import CurrencyDropdown from '../../dropdown/dropdown.currency.vue'
import { parseWalletJsonFile } from '@/lib/cores/importStandard/importWallet.json'

defineOptions({ name: 'AddContactModal' })

const props = defineProps<{
  show: boolean
  contact: Contact | null
}>()

const emit = defineEmits(['close', 'contact-saved'])

const isEditing = ref(false)
const form = ref<Contact>({ id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' })
const wallets = ref<Partial<Wallet>[]>([])
const currentTab = ref<'general' | 'advanced'>('general')
const selectedEntity = ref<'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'>('Contacts')
const fileInput = ref<HTMLInputElement | null>(null)

const modalTitle = computed(() => {
  if (props.contact && selectedEntity.value === 'Contacts') {
    return 'Edit contact'
  }
  return `Add new ${selectedEntity.value.slice(0, -1)}`
})

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      currentTab.value = 'general'
      selectedEntity.value = 'Contacts'
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
    emit('close')
  }
}

async function loadWallets(contactId: number) {
  wallets.value = await getWalletsForContact(contactId)
}

function addWalletRow() {
  wallets.value.push({ coinTicker: '', address: '' })
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

const triggerFileImport = () => {
  fileInput.value?.click()
}

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  try {
    const result = await parseWalletJsonFile(file)
    wallets.value.push(...result.wallets)
  } catch (error) {
    console.error('Error importing file:', error)
    alert(error instanceof Error ? error.message : 'Error importing file. Please ensure it is a valid JSON file.')
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
</style>
