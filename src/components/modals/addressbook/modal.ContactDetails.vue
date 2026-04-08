<template>
  <DialogRoot :open="!!show && !!contact" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cd-overlay" />
      <DialogContent class="cd-modal" :aria-describedby="undefined">

        <!-- Header -->
        <div class="cd-header">
          <div class="cd-header__row">
            <DialogTitle class="cd-header__title">Contact Details</DialogTitle>
            <div class="cd-header__actions">
              <ActionsDropdown
                v-if="contact"
                :contact="contact"
                :isEditing="isEditing"
                @update:edit-mode="toggleEditMode"
                @save-changes="saveChanges"
                @cancel-edit="cancelEdit"
                @add-currency-request="showAddCurrencyModal = true"
                @generate-qrcode-png="onGenerateQrCodePng"
                @generate-qrcode-svg="onGenerateQrCodeSvg"
                @export-csv="onExportCsv"
                @export-vcf="onExportVcf"
              />
            </div>
            <DialogClose class="cd-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cd-separator" />

        <!-- Body -->
        <div class="cd-body" v-if="contact">
          <div class="cd-grid">

            <!-- Sidebar -->
            <div class="cd-sidebar">
              <div class="cd-avatar" :style="{ backgroundColor: avatarBackgroundColor }">
                <span>{{ contactInitials }}</span>
              </div>

              <h2 class="cd-name">
                {{ contact.firstname }} {{ contact.lastname }}
                <QrCode :size="18" class="cd-name__icon" />
              </h2>

              <!-- Relationship -->
              <div class="cd-field">
                <label class="cd-label" for="cd-relationship">Relationship</label>
                <SelectRoot v-model="selectedRelationship">
                  <SelectTrigger id="cd-relationship" class="cd-select__trigger" aria-label="Relationship">
                    <SelectValue placeholder="Select relationship" />
                    <i class="bi bi-chevron-down cd-select__chevron" aria-hidden />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent class="cd-select__content" position="popper" :side-offset="4">
                      <SelectViewport class="cd-select__viewport">
                        <SelectItem value="" class="cd-select__item"><SelectItemText>— None —</SelectItemText></SelectItem>
                        <SelectItem value="Friend" class="cd-select__item"><SelectItemText>Friend</SelectItemText></SelectItem>
                        <SelectItem value="Co-Worker" class="cd-select__item"><SelectItemText>Co-Worker</SelectItemText></SelectItem>
                        <SelectItem value="Family" class="cd-select__item"><SelectItemText>Family</SelectItemText></SelectItem>
                        <SelectItem value="Acquaintance" class="cd-select__item"><SelectItemText>Acquaintance</SelectItemText></SelectItem>
                        <SelectItem value="Business" class="cd-select__item"><SelectItemText>Business</SelectItemText></SelectItem>
                        <SelectItem value="Other" class="cd-select__item"><SelectItemText>Other</SelectItemText></SelectItem>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
              </div>

              <!-- Bio -->
              <div class="cd-bio">
                <template v-if="!isEditing">
                  <p class="cd-bio__text">{{ editedContact.bio || 'No bio yet.' }}</p>
                </template>
                <template v-else>
                  <textarea
                    v-model="(editedContact as any).bio"
                    placeholder="Bio description"
                    class="cd-bio__textarea"
                    rows="3"
                  />
                </template>
              </div>

              <!-- Contact links -->
              <ul class="cd-links">
                <li class="cd-links__item">
                  <Phone :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.phone" :href="`tel:${editedContact.phone}`" class="cd-links__value">{{ editedContact.phone }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="tel" v-model="(editedContact as any).phone" placeholder="Phone number" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <MapPinned :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <span class="cd-links__value" :class="{ 'cd-links__value--empty': !editedContact.location }">{{ editedContact.location || 'N/A' }}</span>
                  </template>
                  <template v-else>
                    <input type="text" v-model="(editedContact as any).location" placeholder="Location" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Mailbox :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a :href="`mailto:${contact.email}`" class="cd-links__value">{{ contact.email }}</a>
                  </template>
                  <template v-else>
                    <input type="email" v-model="editedContact.email" placeholder="Email address" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Globe :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.website" :href="editedContact.website" target="_blank" class="cd-links__value">{{ editedContact.website }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="url" v-model="(editedContact as any).website" placeholder="Website URL" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Github :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.github" :href="`https://github.com/${editedContact.github}`" target="_blank" class="cd-links__value">{{ editedContact.github }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="text" v-model="(editedContact as any).github" placeholder="GitHub username" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Twitter :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.twitter" :href="`https://twitter.com/${editedContact.twitter}`" target="_blank" class="cd-links__value">@{{ editedContact.twitter }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="text" v-model="(editedContact as any).twitter" placeholder="Twitter handle" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Linkedin :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.linkedin" :href="editedContact.linkedin" target="_blank" class="cd-links__value">{{ editedContact.linkedin }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="url" v-model="(editedContact as any).linkedin" placeholder="LinkedIn URL" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <Instagram :size="14" class="cd-links__icon" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.instagram" :href="`https://instagram.com/${editedContact.instagram}`" target="_blank" class="cd-links__value">@{{ editedContact.instagram }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="text" v-model="(editedContact as any).instagram" placeholder="Instagram handle" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <i class="bi bi-bluesky cd-links__icon cd-links__icon--bs" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.bluesky" :href="editedContact.bluesky" target="_blank" class="cd-links__value">{{ editedContact.bluesky }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="url" v-model="(editedContact as any).bluesky" placeholder="Bluesky URL" class="cd-links__input" />
                  </template>
                </li>

                <li class="cd-links__item">
                  <i class="bi bi-telegram cd-links__icon cd-links__icon--bs" />
                  <template v-if="!isEditing">
                    <a v-if="editedContact.telegram" :href="editedContact.telegram" target="_blank" class="cd-links__value">{{ editedContact.telegram }}</a>
                    <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
                  </template>
                  <template v-else>
                    <input type="url" v-model="(editedContact as any).telegram" placeholder="Telegram URL" class="cd-links__input" />
                  </template>
                </li>
              </ul>
            </div>

            <!-- Main content with tabs -->
            <div class="cd-main">
              <TabsRoot v-model="activeTab" class="cd-tabs">
                <TabsList class="cd-tabs__list" aria-label="Contact sections">
                  <TabsTrigger value="wallets" class="cd-tabs__trigger">
                    <WalletIcon :size="14" class="cd-tabs__icon" />
                    Wallets
                    <span class="cd-badge">{{ walletCount }}</span>
                  </TabsTrigger>
                  <TabsTrigger value="gpg" class="cd-tabs__trigger">
                    <FileKey :size="14" class="cd-tabs__icon" />
                    GPG Keys
                    <span class="cd-badge">{{ gpgKeysCount }}</span>
                  </TabsTrigger>
                  <TabsTrigger value="invoices" class="cd-tabs__trigger">
                    <ReceiptText :size="14" class="cd-tabs__icon" />
                    Invoices
                    <span class="cd-badge">0</span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" class="cd-tabs__trigger">
                    <NotebookPen :size="14" class="cd-tabs__icon" />
                    Notes
                    <span class="cd-badge">0</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="wallets" class="cd-tabs__content">
                  <WalletsTab
                    v-if="contact?.id"
                    :contactId="contact.id"
                    @wallet-deleted="refreshWalletCount"
                    ref="walletsTabRef"
                  />
                </TabsContent>

                <TabsContent value="gpg" class="cd-tabs__content">
                  <div v-if="gpgKeys.length === 0" class="cd-empty">
                    <p>No GPG public keys found for this contact.</p>
                  </div>
                  <div v-else class="cd-gpg-list">
                    <div v-for="wallet in gpgKeys" :key="wallet.id" class="cd-gpg-item">
                      <div class="cd-gpg-item__header">
                        <strong class="cd-gpg-item__ticker">{{ wallet.coinTicker }}</strong>
                        <span v-if="wallet.keyFingerprint" class="cd-gpg-item__fingerprint">
                          <code>{{ wallet.keyFingerprint }}</code>
                        </span>
                      </div>
                      <div v-if="wallet.gpgPublicKey" class="cd-gpg-item__body">
                        <pre class="cd-gpg-item__key"><code>{{ wallet.gpgPublicKey }}</code></pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoices" class="cd-tabs__content">
                  <div class="cd-coming-soon">
                    <ReceiptText :size="32" class="cd-coming-soon__icon" />
                    <p>Invoices coming soon.</p>
                  </div>
                </TabsContent>

                <TabsContent value="notes" class="cd-tabs__content">
                  <div class="cd-coming-soon">
                    <NotebookPen :size="32" class="cd-coming-soon__icon" />
                    <p>Notes coming soon.</p>
                  </div>
                </TabsContent>
              </TabsRoot>
            </div>

          </div>
        </div>

      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <!-- Child modals rendered outside the dialog portal -->
  <AddCurrencyModal
    v-if="contact?.id && showAddCurrencyModal"
    :show="showAddCurrencyModal"
    :contactId="contact.id"
    @close="showAddCurrencyModal = false"
    @currency-added="handleCurrencyAdded"
    @wallets-imported="handleWalletsImported"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose,
  Separator,
  TabsRoot, TabsList, TabsTrigger, TabsContent,
  SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectItemText, SelectValue, SelectPortal, SelectViewport,
} from 'radix-vue'
import type { Contact } from '@/services/addressBook/contactService'
import { updateContact } from '@/services/addressBook/contactService'
import ActionsDropdown from '@/components/dropdown/dropdown.actions.vue'
import AddCurrencyModal from '@/components/modals/addressbook/AddCurrencyModal.vue'
import WalletsTab from '@/components/modals/addressbook/tabsFor.contactDetails/WalletsTab.vue'
import {
  addWallet, getWalletCountForContact, getWalletsForContact, type Wallet,
} from '@/services/addressBook/walletService'
import {
  Wallet as WalletIcon, FileKey, ReceiptText, NotebookPen,
  Github, MapPinned, Globe, Mailbox, Twitter, Instagram, Linkedin,
  QrCode, Phone,
} from 'lucide-vue-next'

defineOptions({ name: 'ContactDetailsModal' })

const props = defineProps<{
  show: boolean
  contact: Contact | null
}>()

const emit = defineEmits(['close', 'contact-updated', 'contact-deleted'])

const isEditing = ref(false)
const editedContact = ref<Partial<Contact>>({})
const selectedRelationship = ref('')
const showAddCurrencyModal = ref(false)
const activeTab = ref('wallets')
const walletCount = ref(0)
const walletsTabRef = ref<InstanceType<typeof WalletsTab> | null>(null)
const gpgKeys = ref<Wallet[]>([])
const gpgKeysCount = computed(() => gpgKeys.value.length)

const contactInitials = computed(() => {
  if (!props.contact) return ''
  const f = props.contact.firstname?.charAt(0) ?? ''
  const l = props.contact.lastname?.charAt(0) ?? ''
  return `${f}${l}`.toUpperCase()
})

const avatarBackgroundColor = computed(() => {
  if (!props.contact) return '#cccccc'
  const name = `${props.contact.firstname}${props.contact.lastname}`
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

watch(
  () => props.contact,
  async (newContact) => {
    if (newContact) {
      editedContact.value = { ...newContact }
      selectedRelationship.value = (newContact as any).relationship ?? ''
      isEditing.value = false
      await refreshWalletCount()
      await refreshGpgKeys()
    } else {
      editedContact.value = {}
      selectedRelationship.value = ''
      walletCount.value = 0
      gpgKeys.value = []
    }
  },
  { immediate: true },
)

watch(selectedRelationship, async (newValue) => {
  if (!props.contact?.id) return
  const contactToSave = {
    ...editedContact.value,
    id: props.contact.id,
    relationship: newValue,
  } as Contact
  await updateContact(contactToSave)
  editedContact.value = { ...contactToSave }
  emit('contact-updated')
})

function onDialogOpen(open: boolean) {
  if (!open) close()
}

const toggleEditMode = (value: boolean) => {
  isEditing.value = value
  if (!isEditing.value && props.contact) {
    editedContact.value = { ...props.contact }
    selectedRelationship.value = (props.contact as any).relationship ?? ''
  }
}

const saveChanges = async () => {
  if (!props.contact?.id) return
  const contactToSave = {
    ...editedContact.value,
    id: props.contact.id,
    relationship: selectedRelationship.value,
  } as Contact
  await updateContact(contactToSave)
  editedContact.value = { ...contactToSave }
  isEditing.value = false
  emit('contact-updated')
}

const cancelEdit = () => {
  if (props.contact) {
    editedContact.value = { ...props.contact }
    selectedRelationship.value = (props.contact as any).relationship ?? ''
  }
  isEditing.value = false
}

const handleCurrencyAdded = async (currencyData: { contactId: number; network: string; address: string }) => {
  const existingWallets = await getWalletsForContact(currencyData.contactId)
  const isDuplicate = existingWallets.some(
    (w) => w.coinTicker === currencyData.network && w.address === currencyData.address,
  )
  if (isDuplicate) {
    alert('This wallet already exists for this contact.')
    return
  }
  await addWallet({
    contactId: currencyData.contactId,
    coinTicker: currencyData.network,
    address: currencyData.address,
  })
  showAddCurrencyModal.value = false
  await refreshWalletCount()
  await refreshGpgKeys()
  walletsTabRef.value?.refresh()
}

const handleWalletsImported = async () => {
  await refreshWalletCount()
  await refreshGpgKeys()
  walletsTabRef.value?.refresh()
}

const refreshWalletCount = async () => {
  if (props.contact?.id) {
    walletCount.value = await getWalletCountForContact(props.contact.id)
  }
}

const refreshGpgKeys = async () => {
  if (props.contact?.id) {
    const wallets = await getWalletsForContact(props.contact.id)
    gpgKeys.value = wallets.filter((w) => w.gpgPublicKey)
  } else {
    gpgKeys.value = []
  }
}

const onGenerateQrCodePng = (contact: Contact) => console.log(`QR PNG: ${contact.id}`)
const onGenerateQrCodeSvg = (contact: Contact) => console.log(`QR SVG: ${contact.id}`)
const onExportCsv = (contact: Contact) => console.log(`CSV: ${contact.id}`)
const onExportVcf = (contact: Contact) => console.log(`VCF: ${contact.id}`)

const close = () => {
  isEditing.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────── */
.cd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10060;
  animation: cd-fade 0.15s ease;
}

@keyframes cd-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Dialog shell ────────────────────────────────────────── */
.cd-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10061;
  width: min(95vw, 62rem);
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
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* ── Header ──────────────────────────────────────────────── */
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

/* ── Separator ───────────────────────────────────────────── */
.cd-separator {
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body ────────────────────────────────────────────────── */
.cd-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── Grid ────────────────────────────────────────────────── */
.cd-grid {
  display: grid;
  grid-template-columns: 17rem 1fr;
  height: 100%;
  min-height: 0;
}

/* ── Sidebar ─────────────────────────────────────────────── */
.cd-sidebar {
  border-right: 1px solid #e5e7eb;
  padding: 1.25rem 1rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.cd-avatar {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.cd-name {
  margin: 0.75rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  line-height: 1.35;
}

.cd-name__icon {
  flex-shrink: 0;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.12s;

  &:hover { color: #374151; }
}

/* Relationship select */
.cd-field {
  width: 100%;
  margin-top: 1rem;
}

.cd-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.35rem;
}

.cd-select__trigger {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.65rem;
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
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
}

.cd-select__chevron {
  font-size: 0.6rem;
  color: #6b7280;
}

:deep(.cd-select__content) {
  z-index: 10070;
  min-width: 12rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
}

:deep(.cd-select__viewport) {
  padding: 0.125rem 0;
}

:deep(.cd-select__item) {
  font-size: 0.8125rem;
  padding: 0.45rem 0.65rem;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;

  &[data-highlighted] { background: #f3f4f6; }
  &[data-state='checked'] { font-weight: 600; color: #2563eb; }
}

/* Bio */
.cd-bio {
  width: 100%;
  margin-top: 0.875rem;
}

.cd-bio__text {
  margin: 0;
  font-size: 0.8125rem;
  color: #374151;
  line-height: 1.55;
}

.cd-bio__textarea {
  width: 100%;
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
}

/* Links list */
.cd-links {
  list-style: none;
  margin: 0.875rem 0 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cd-links__item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  min-width: 0;
}

.cd-links__icon {
  flex-shrink: 0;
  color: #6b7280;
}

.cd-links__icon--bs {
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
}

.cd-links__value {
  color: #374151;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[href]:hover { text-decoration: underline; color: #2563eb; }
}

.cd-links__value--empty {
  color: #9ca3af;
}

.cd-links__input {
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.45rem;
  font-size: 0.8125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
}

/* ── Main ────────────────────────────────────────────────── */
.cd-main {
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Tabs ────────────────────────────────────────────────── */
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
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  transition: color 0.15s;

  &:hover { color: #111827; }

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
}

/* ── GPG tab ─────────────────────────────────────────────── */
.cd-gpg-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.cd-gpg-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.875rem;
  background: #fff;
}

.cd-gpg-item__header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.cd-gpg-item__ticker {
  font-size: 0.9375rem;
  color: #111827;
}

.cd-gpg-item__fingerprint code {
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  background: #f3f4f6;
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  word-break: break-all;
}

.cd-gpg-item__key {
  margin: 0;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-family: 'Courier New', monospace;
  font-size: 0.6875rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-x: auto;

  code { background: transparent; padding: 0; border: none; color: #374151; }
}

/* ── Empty / coming-soon states ──────────────────────────── */
.cd-empty {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
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
