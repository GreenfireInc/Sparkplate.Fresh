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
            <DialogTitle class="cd-header__title">Company details</DialogTitle>
            <div class="cd-header__actions">
              <ActionsDropdown
                v-if="company"
                :contact="companyActionsContactStub"
                :is-editing="false"
                @add-currency-request="emit('add-currency-request', companyActionsContactStub)"
                @generate-qrcode-png="emit('generate-qrcode-png', $event)"
                @generate-qrcode-svg="emit('generate-qrcode-svg', $event)"
                @export-csv="emit('export-csv', $event)"
                @export-vcf="emit('export-vcf', $event)"
                @export-md="emit('export-md', $event)"
                @export-json="noopCompanyModalActions"
                @currency-added="noopCompanyModalActions"
                @save-changes="noopCompanyModalActions"
                @update:edit-mode="noopCompanyModalActions"
                @delete-requested="onCompanyActionsDeleteRequested"
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

        <div class="cd-body" v-if="company">
          <div class="cd-grid">
            <div class="cd-sidebar">
              <div class="cd-avatar" :style="{ backgroundColor: avatarBackgroundColor }">
                <span>{{ companyInitials }}</span>
              </div>

              <h2 class="cd-name">{{ company.name }}</h2>

              <p v-if="companyContacts.length > 1" class="cd-sidebar__meta">
                {{ companyContacts.length }} contacts at this company
              </p>

              <AspectSocialMedia
                v-if="companyContacts.length > 0"
                :contact="companyAspectContact"
                @edit-requested="onCompanySocialEditRequested"
              />
            </div>

            <div class="cd-main">
              <TabsRoot v-model="activeTab" class="cd-tabs">
                <TabsList class="cd-tabs__list" aria-label="Company sections">
                  <TabsTrigger value="general" class="cd-tabs__trigger">
                    <Building2 :size="14" class="cd-tabs__icon" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="wallets" class="cd-tabs__trigger">
                    <WalletIcon :size="14" class="cd-tabs__icon" />
                    Wallets
                    <span class="cd-badge">{{ companyWallets.length }}</span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" class="cd-tabs__trigger">
                    <NotebookPen :size="14" class="cd-tabs__icon" />
                    Notes
                    <span class="cd-badge">{{ companyNotesCount }}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" class="cd-tabs__content">
                  <div class="cd-co-form">
                    <div class="cd-co-form-grid">
                      <div class="cd-co-field">
                        <label class="cd-label">Company name</label>
                        <div class="cd-readonly-value">{{ dash(company.name) }}</div>
                      </div>
                      <div class="cd-co-field">
                        <label class="cd-label">Company website</label>
                        <div class="cd-readonly-value">{{ dash(displayWebsite) }}</div>
                      </div>
                    </div>
                    <div class="cd-co-form-grid">
                      <div class="cd-co-field">
                        <label class="cd-label">Main contact first name</label>
                        <div class="cd-readonly-value">{{ dash(primaryContact?.firstname) }}</div>
                      </div>
                      <div class="cd-co-field">
                        <label class="cd-label">Main contact last name</label>
                        <div class="cd-readonly-value">{{ dash(primaryContact?.lastname) }}</div>
                      </div>
                    </div>
                    <div class="cd-co-form-grid">
                      <div class="cd-co-field">
                        <label class="cd-label">Main contact email address</label>
                        <div class="cd-readonly-value">{{ dash(displayEmail) }}</div>
                      </div>
                      <div class="cd-co-field">
                        <label class="cd-label">Position</label>
                        <div class="cd-readonly-value">{{ dash(company.position) }}</div>
                      </div>
                    </div>
                    <div class="cd-co-field cd-co-field--full">
                      <label class="cd-label">Notes</label>
                      <div class="cd-readonly-value cd-readonly-value--multiline">{{ dash(displayNotes) }}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wallets" class="cd-tabs__content">
                  <!-- Layout mirrors modal.details.Exchange.vue currencies tab / tab.details.Contact.Wallets.vue -->
                  <div class="cd-exch-wallets-tab">
                    <div v-if="companyWallets.length === 0" class="cd-exch-wallets-empty">
                      <p>No wallet addresses linked to contacts at this company.</p>
                    </div>
                    <div v-else class="cd-exch-wallets-list">
                      <template v-for="w in companyWallets" :key="w.id">
                        <CardWalletAddress
                          v-if="isWalletRowComplete(w)"
                          :wallet="w"
                          @delete="onCompanyWalletDelete"
                          @copy="onCompanyWalletCopy"
                        />
                        <div
                          v-else
                          class="cd-exch-currency-card cd-exch-currency-card--editing cd-exch-currency-card--no-remove"
                        >
                          <div class="cd-exch-currencies__row">
                            <span class="cd-exch-co-readonly-ticker">{{ w.coinTicker?.trim() || '—' }}</span>
                            <span class="cd-exch-currencies__sep" aria-hidden="true">://</span>
                            <span class="cd-exch-co-readonly-addr">{{ w.address?.trim() || '—' }}</span>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" class="cd-tabs__content">
                  <TabDetailsContactNotes
                    v-if="company != null && company.id != null"
                    :contact-id="company.id"
                    :contact-name="company.name"
                    note-owner-kind="company"
                  />
                  <div v-else class="cd-coming-soon">
                    <NotebookPen :size="32" class="cd-coming-soon__icon" />
                    <p>Save this company to start adding notes.</p>
                  </div>
                </TabsContent>
              </TabsRoot>
            </div>
          </div>
        </div>

        <Separator class="cd-separator" />

        <div class="cd-footer">
          <button type="button" class="cd-footer-btn cd-footer-btn--ghost" @click="emitClose">Close</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <SubModalSocialMedia
    v-if="showCompanySocialModal && primaryContact"
    :show="showCompanySocialModal"
    :contact="primaryContact"
    @close="showCompanySocialModal = false"
    @save="onCompanySocialSave"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
import { Building2, Wallet as WalletIcon, NotebookPen } from 'lucide-vue-next'
import type { Company } from '@/services/addressBook/service.addressBook.Company'
import { getContacts, updateContact, type Contact } from '@/services/addressBook/service.addressBook.Contact'
import {
  getWalletsForContact,
  deleteWallet,
  type Wallet,
} from '@/services/addressBook/service.addressBook.Wallet'
import CardWalletAddress from '@/components/structure/card.WalletAddress.vue'
import TabDetailsContactNotes from '@/components/modals/addressbook/tabsFor.details/tab.details.Contact.Notes.vue'
import AspectSocialMedia from '@/components/modals/addressbook/aspects/aspect.socialMedia.vue'
import SubModalSocialMedia from '@/components/modals/addressbook/subModals/subModal.socialMedia.vue'
import ActionsDropdown from '@/components/dropdown/dropdown.actions.vue'
import { notesRevision, getNotesForOwnerId } from '@/services/addressBook/service.addressBook.Note'

defineOptions({ name: 'ModalCompanyDetails' })

const props = defineProps<{ company: Company | null }>()
/** Mirrors the events bubbled from `tab.addressBook.Company.vue`'s row dropdown so
 *  the modal participates in the same upstream pipeline (parent listens once, regardless
 *  of which surface fires the action). `update:edit-mode`, `save-changes`, `currency-added`,
 *  and `export-json` stay no-ops here — they have no row-level meaning when already inside
 *  the details modal. */
const emit = defineEmits<{
  close: []
  'delete-requested': [company: Company]
  'add-currency-request': [contact: Contact]
  'generate-qrcode-png': [contact: Contact]
  'generate-qrcode-svg': [contact: Contact]
  'export-csv': [contact: Contact]
  'export-vcf': [contact: Contact]
  'export-md': [contact: Contact]
}>()

const dialogOpen = computed(() => !!props.company)
const activeTab = ref('general')
const companyContacts = ref<Contact[]>([])
const companyWallets = ref<Wallet[]>([])
const companyNotesCount = ref(0)
const showCompanySocialModal = ref(false)

const primaryContact = computed(() => companyContacts.value[0] ?? null)

const displayWebsite = computed(() => {
  const c = companyContacts.value.find((x) => x.website?.trim())
  return c?.website?.trim() || ''
})

const displayEmail = computed(() => {
  if (props.company?.email?.trim()) return props.company.email.trim()
  return primaryContact.value?.email?.trim() ?? ''
})

const displayNotes = computed(() => {
  const notes = companyContacts.value.map((c) => c.notes?.trim()).filter(Boolean) as string[]
  if (notes.length === 0) return ''
  return [...new Set(notes)].join('\n\n')
})

/** Merged from all contacts at this company for `AspectSocialMedia` display. */
function firstNonEmptyFromContacts(contacts: Contact[], keys: string[]): string {
  for (const key of keys) {
    for (const c of contacts) {
      const v = (c as unknown as Record<string, unknown>)[key]
      if (v != null && String(v).trim() !== '') return String(v).trim()
    }
  }
  return ''
}

const companyAspectContact = computed<Record<string, unknown>>(() => {
  const list = companyContacts.value
  if (list.length === 0) return {}
  return {
    bio: firstNonEmptyFromContacts(list, ['bio']) || '',
    phone: firstNonEmptyFromContacts(list, ['phone']) || '',
    location: firstNonEmptyFromContacts(list, ['location']) || '',
    email: displayEmail.value || '',
    website: displayWebsite.value || firstNonEmptyFromContacts(list, ['website']) || '',
    github: firstNonEmptyFromContacts(list, ['github']) || '',
    twitter: firstNonEmptyFromContacts(list, ['twitter']) || '',
    linkedin: firstNonEmptyFromContacts(list, ['linkedin']) || '',
    instagram: firstNonEmptyFromContacts(list, ['instagram']) || '',
    bluesky: firstNonEmptyFromContacts(list, ['bluesky']) || '',
    telegram: firstNonEmptyFromContacts(list, ['telegram']) || '',
  }
})

function onCompanySocialEditRequested() {
  if (primaryContact.value?.id) showCompanySocialModal.value = true
}

/** Contact-shaped payload for header `ActionsDropdown` (matches Companies row pattern). */
const companyActionsContactStub = computed<Contact>(() => ({
  id: props.company?.id ?? 0,
  type: 'addressbook_company',
  firstname: props.company?.name ?? '',
  lastname: '',
  company: props.company?.name ?? '',
  email: props.company?.email ?? '',
  notes: displayNotes.value,
}))

function onCompanyActionsDeleteRequested() {
  if (props.company) emit('delete-requested', props.company)
}

/** Header dropdown emits a few actions still without modal-level meaning
 *  (`export-json`, `currency-added`, `save-changes`, `update:edit-mode`) —
 *  kept as inert no-ops. */
function noopCompanyModalActions() {}

async function onCompanySocialSave(fields: Record<string, unknown>) {
  const c = primaryContact.value
  if (!c?.id) return
  const contactToSave = { ...c, ...fields, id: c.id } as Contact
  await updateContact(contactToSave)
  showCompanySocialModal.value = false
  await refreshCompanyContext()
}

const companyInitials = computed(() => {
  const n = props.company?.name?.trim() || ''
  if (!n) return '—'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
})

const avatarBackgroundColor = computed(() => {
  const name = props.company?.name || 'company'
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

function dash(v: string | undefined | null): string {
  const t = v?.trim()
  return t && t.length > 0 ? t : '—'
}

async function refreshCompanyContext() {
  companyWallets.value = []
  companyContacts.value = []
  if (!props.company?.name?.trim()) return

  const all = await getContacts()
  const name = props.company.name.trim()
  companyContacts.value = all.filter((c) => (c.company || '').trim() === name)

  const rows: Wallet[] = []
  for (const c of companyContacts.value) {
    if (!c.id) continue
    const ws = await getWalletsForContact(c.id)
    for (const w of ws) {
      rows.push(w)
    }
  }
  companyWallets.value = rows
}

function isWalletRowComplete(w: Wallet): boolean {
  return !!w?.coinTicker?.trim() && !!w?.address?.trim()
}

async function onCompanyWalletDelete(walletId: number) {
  if (!confirm('Are you sure you want to delete this wallet?')) return
  await deleteWallet(walletId)
  await refreshCompanyContext()
}

function onCompanyWalletCopy(address: string) {
  console.log('Company details: wallet address copied to clipboard:', address)
}

watch(
  () => props.company,
  async () => {
    activeTab.value = 'general'
    await refreshCompanyContext()
  },
  { immediate: true, deep: true },
)

watch(
  [() => props.company?.id, notesRevision],
  async () => {
    const id = props.company?.id
    if (id == null) {
      companyNotesCount.value = 0
      return
    }
    companyNotesCount.value = (await getNotesForOwnerId(id, 'company')).length
  },
  { immediate: true },
)

function onDialogOpen(open: boolean) {
  if (!open) emitClose()
}

function emitClose() {
  emit('close')
}

function onDialogPointerDownOutside(event: CustomEvent<{ originalEvent: PointerEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (target.closest('.currency-dropdown-portal') || target.closest('.custom-select-wrapper')) {
    event.preventDefault()
  }
}

function onDialogInteractOutside(event: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (target.closest('.currency-dropdown-portal') || target.closest('.custom-select-wrapper')) {
    event.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
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
  max-height: 88vh;
  height: 88vh;
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

.cd-avatar {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
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
  line-height: 1.35;
}

.cd-sidebar__meta {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}

.cd-main {
  min-height: 0;
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
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #111827;
    box-shadow: inset 0 -2px 0 #2563eb;
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
}

.cd-tabs__content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem;
}

/* General — field layout aligned with form.addEntry.company.vue */
.cd-co-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 48rem;
}

.cd-co-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.25rem;
}

.cd-co-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cd-co-field--full {
  grid-column: 1 / -1;
}

.cd-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.cd-readonly-value {
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  line-height: 1.45;
}

.cd-readonly-value--multiline {
  white-space: pre-wrap;
  min-height: 4.5rem;
}

/* Wallets tab — same structure as modal.details.Exchange.vue `.cd-exch-wallets-*` + cards */
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

.cd-exch-currency-card--no-remove {
  padding-top: 0.75rem;
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

.cd-exch-co-readonly-ticker {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.cd-exch-co-readonly-addr {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
  color: #374151;
  word-break: break-all;
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

.cd-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.25rem;
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
</style>
