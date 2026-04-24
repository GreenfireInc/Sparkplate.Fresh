<template>
  <DialogRoot :open="true" @update:open="onDialogOpen">
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
            <DialogTitle class="cd-header__title">Wallet details</DialogTitle>
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

        <div class="cd-body">
          <div class="cd-grid">
            <div class="cd-sidebar">
              <div
                class="cd-exch-logo"
                :class="{ 'cd-exch-logo--fallback': !walletLogoSrc }"
                :style="!walletLogoSrc ? { backgroundColor: avatarBackgroundColor } : undefined"
              >
                <img
                  v-if="walletLogoSrc"
                  :src="walletLogoSrc"
                  :alt="wallet.name || 'Wallet'"
                  class="cd-exch-logo__img"
                  @error="onWalletLogoError"
                />
                <span v-else class="cd-exch-logo__initials">{{ walletInitials }}</span>
              </div>

              <h2 class="cd-name">
                {{ wallet.name || 'Wallet' }}
              </h2>

              <div class="cd-exch-field cd-sidebar__id-field">
                <label class="cd-label">Wallet ID</label>
                <div class="cd-readonly-value">#{{ wallet.id }}</div>
              </div>

              <a
                v-if="walletOfficialWebsite"
                :href="walletOfficialWebsite"
                target="_blank"
                rel="noopener noreferrer"
                class="cd-exch-sidebar-social__link cd-sidebar__website-row"
                :title="walletOfficialWebsite"
              >
                <Globe :size="16" class="cd-exch-sidebar-social__icon" aria-hidden="true" />
                <span class="cd-exch-sidebar-social__text">{{ displaySocialUrl(walletOfficialWebsite) }}</span>
              </a>

              <div v-if="walletSocialLinks.length" class="cd-exch-sidebar-social">
                <ul class="cd-exch-sidebar-social__list" aria-label="Wallet social media">
                  <li v-for="item in walletSocialLinks" :key="item.platform">
                    <a
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="cd-exch-sidebar-social__link"
                      :title="item.url"
                    >
                      <component
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
                <TabsList class="cd-tabs__list" aria-label="Wallet sections">
                  <TabsTrigger value="general" class="cd-tabs__trigger">
                    <WalletIcon :size="14" class="cd-tabs__icon" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="currencies" class="cd-tabs__trigger">
                    <Coins :size="14" class="cd-tabs__icon" />
                    Currencies
                    <span class="cd-badge">{{ wallet.currencies.length }}</span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" class="cd-tabs__trigger">
                    <NotebookPen :size="14" class="cd-tabs__icon" />
                    Notes
                    <span class="cd-badge">0</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" class="cd-tabs__content">
                  <div class="cd-exch-form">
                    <div class="cd-form-grid cd-form-grid--mnemonic-row">
                      <div class="cd-exch-field cd-field--length">
                        <label class="cd-label" for="cd-wallet-mnemonic-len">Mnemonic length</label>
                        <select
                          id="cd-wallet-mnemonic-len"
                          class="cd-input cd-select"
                          :value="walletMnemonicLengthSelect"
                          disabled
                        >
                          <option v-if="walletMnemonicLengthSelect === ''" value="">—</option>
                          <option v-for="n in MNEMONIC_LENGTH_OPTIONS" :key="n" :value="n">
                            {{ n }}
                          </option>
                        </select>
                      </div>
                      <div class="cd-exch-field">
                        <label class="cd-label" for="cd-wallet-mnemonic-first">Mnemonic first</label>
                        <input
                          id="cd-wallet-mnemonic-first"
                          :value="wallet.mnemonicFirst ?? ''"
                          type="text"
                          class="cd-input"
                          readonly
                          autocomplete="off"
                          autocapitalize="off"
                          spellcheck="true"
                          placeholder="First word of phrase"
                        />
                      </div>
                      <div class="cd-exch-field">
                        <label class="cd-label" for="cd-wallet-mnemonic-last">Mnemonic last</label>
                        <input
                          id="cd-wallet-mnemonic-last"
                          :value="wallet.mnemonicLast ?? ''"
                          type="text"
                          class="cd-input"
                          readonly
                          autocomplete="off"
                          autocapitalize="off"
                          spellcheck="true"
                          placeholder="Last word of phrase"
                        />
                      </div>
                    </div>
                    <div class="cd-exch-field cd-exch-field--full">
                      <label class="cd-label" for="cd-wallet-notes">Notes</label>
                      <textarea
                        id="cd-wallet-notes"
                        :value="wallet.notes ?? ''"
                        class="cd-input cd-textarea"
                        rows="3"
                        readonly
                        autocomplete="off"
                      />
                    </div>
                    <div class="cd-exch-field cd-exch-field--full">
                      <label class="cd-label" for="cd-wallet-password-hint">Password hint</label>
                      <input
                        id="cd-wallet-password-hint"
                        :value="wallet.passwordHint ?? ''"
                        type="text"
                        class="cd-input"
                        readonly
                        autocomplete="off"
                        placeholder="Hint only — never the actual password"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="currencies" class="cd-tabs__content">
                  <!-- Layout mirrors tab.details.Contact.Wallets.vue (tabsFor.details):
                       .wallets-tab > .empty-state | .wallets-list with CardWalletAddress children.
                       Read-only — the card's delete button is hidden via scoped :deep(). -->
                  <div class="cd-exch-wallets-tab">
                    <div v-if="wallet.currencies.length === 0" class="cd-exch-wallets-empty">
                      <p>No currencies on this wallet.</p>
                    </div>
                    <div v-else class="cd-exch-wallets-list cd-exch-wallets-list--readonly">
                      <CardWalletAddress
                        v-for="(currency, index) in wallet.currencies"
                        :key="`${currency.abbreviation}-${index}`"
                        :wallet="toWalletLike(currency, index)"
                        @copy="onWalletCurrencyCopy"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" class="cd-tabs__content">
                  <div class="cd-coming-soon">
                    <NotebookPen :size="32" class="cd-coming-soon__icon" />
                    <p>Wallet notes are not available yet.</p>
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
  Wallet as WalletIcon,
  Coins,
  NotebookPen,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Send,
  MessageCircle,
  Share2,
  Github,
  BookOpen,
} from 'lucide-vue-next'
import {
  getWalletPickerOptions,
  getWalletIconSrc,
  getWalletSocialMediaForDisplayName,
} from '@/lib/cores/currencyCore/walletProviders/walletPickerOptions'
import CardWalletAddress from '@/components/structure/card.WalletAddress.vue'
import type { Wallet as WalletRecord } from '@/services/addressBook/service.addressBook.Wallet'

const SOCIAL_PLATFORM_ICONS: Record<string, Component> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  telegram: Send,
  discord: MessageCircle,
  reddit: Share2,
  github: Github,
  medium: BookOpen,
}

function socialIconForPlatform(platform: string): Component {
  return SOCIAL_PLATFORM_ICONS[platform.toLowerCase()] ?? Globe
}

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

defineOptions({ name: 'ModalWalletDetails' })

interface Currency {
  name: string
  abbreviation: string
  address: string
}

const MNEMONIC_LENGTH_OPTIONS = [12, 15, 17, 23, 24] as const

interface Wallet {
  id: number
  name: string
  currencies: Currency[]
  mnemonicWordCount?: number
  mnemonicFirst?: string
  mnemonicLast?: string
  notes?: string
  passwordHint?: string
}

const props = defineProps<{ wallet: Wallet }>()
const emit = defineEmits<{ close: [] }>()

const walletMnemonicLengthSelect = computed(() => {
  const n = props.wallet.mnemonicWordCount
  if (n == null) return ''
  return (MNEMONIC_LENGTH_OPTIONS as readonly number[]).includes(n) ? n : ''
})

const activeTab = ref('general')
const walletLogoLoadFailed = ref(false)

watch(
  () => props.wallet.id,
  () => {
    walletLogoLoadFailed.value = false
    activeTab.value = 'general'
  },
)

const walletPickerOptions = computed(() => getWalletPickerOptions())

const matchedWalletOption = computed(() => {
  const name = props.wallet.name?.trim() ?? ''
  if (!name) return undefined
  const head = name.split(' · ')[0]?.trim() ?? name
  return walletPickerOptions.value.find(
    (o) => head === o.label || name.startsWith(`${o.label} ·`) || name.startsWith(o.label),
  )
})

const walletLogoSrc = computed(() => {
  if (walletLogoLoadFailed.value) return null
  const iconFile = matchedWalletOption.value?.iconFile
  if (!iconFile) return null
  return getWalletIconSrc(iconFile)
})

const walletOfficialWebsite = computed(() => {
  const url = matchedWalletOption.value?.website?.trim()
  return url && url.length > 0 ? url : null
})

const walletSocialLinks = computed(() => {
  const sm = getWalletSocialMediaForDisplayName(props.wallet.name)
  if (!sm) return []
  return Object.entries(sm).map(([platform, url]) => ({
    platform,
    url,
    icon: socialIconForPlatform(platform),
  }))
})

function onWalletLogoError() {
  walletLogoLoadFailed.value = true
}

const walletInitials = computed(() => {
  const n = props.wallet.name?.trim() || 'W'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
})

const avatarBackgroundColor = computed(() => {
  const name = props.wallet.name || 'wallet'
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

function onDialogOpen(open: boolean) {
  if (!open) emitClose()
}

function emitClose() {
  emit('close')
}

function onDialogPointerDownOutside(event: CustomEvent<{ originalEvent: PointerEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper') ||
    target.closest('.wa-dropdown-portal') ||
    target.closest('.wa-dropdown')
  ) {
    event.preventDefault()
  }
}

function onDialogInteractOutside(event: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) {
  const target = event.detail?.originalEvent?.target
  if (!(target instanceof Element)) return
  if (
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper') ||
    target.closest('.wa-dropdown-portal') ||
    target.closest('.wa-dropdown')
  ) {
    event.preventDefault()
  }
}

/* Shape a `Currency` entry as a `Wallet`-like object so it can be rendered by
 * `CardWalletAddress` in the same way as `tab.details.Contact.Wallets.vue`.
 * The synthetic `id` is the row index; `contactId` is repurposed for the
 * parent wallet's id so QR / copy semantics still make sense. */
function toWalletLike(currency: Currency, index: number): WalletRecord {
  return {
    id: index,
    contactId: props.wallet.id,
    coinTicker: currency.abbreviation,
    address: currency.address,
  }
}

function onWalletCurrencyCopy(address: string) {
  console.log('Wallet currency address copied to clipboard:', address)
}
</script>

<style lang="scss" scoped>
/* Shell aligned with modal.details.Exchange.vue (cd-*) */

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
  /* Fixed height so switching tabs (General / Notes vs populated Currencies)
     does not resize the modal. Matches the tallest state — the Currencies
     grid of CardWalletAddress tiles. */
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

/* After `.cd-exch-field` in this file, so use two classes so `flex-direction: row` wins */
.cd-exch-field.cd-sidebar__id-field {
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  box-sizing: border-box;

  .cd-label {
    flex-shrink: 0;
    margin: 0;
  }

  .cd-readonly-value {
    width: auto;
    flex: 0 1 auto;
    min-width: 0;
    padding: 0.35rem 0.5rem;
    text-align: center;
  }
}

.cd-sidebar__meta {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}

.cd-exch-sidebar-social {
  width: 100%;
  margin-top: 0.75rem;
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

.cd-exch-form {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 48rem;
}

.cd-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.25rem;
}

.cd-form-grid--mnemonic-row {
  grid-template-columns: minmax(5.5rem, 0.75fr) minmax(0, 1fr) minmax(0, 1fr);
}

.cd-field--length {
  min-width: 0;
}

.cd-input,
.cd-select {
  width: 100%;
  padding: 0.6rem 0.65rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  box-sizing: border-box;
  line-height: 1.45;
  color: #374151;
}

.cd-input:read-only,
.cd-select:disabled {
  background: #f9fafb;
  color: #374151;
  cursor: default;
  opacity: 1;
}

.cd-select {
  cursor: not-allowed;
  min-height: 2.75rem;
}

.cd-textarea {
  display: block;
  margin: 0;
  resize: vertical;
  font-family: inherit;
  min-height: 4.5rem;
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

.cd-readonly-value {
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #374151;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  line-height: 1.45;
}

.cd-exch-currencies {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

/* Mirrors tabsFor.details / tab.details.Contact.Wallets.vue `.wallets-tab` +
   `.wallets-list` + card shell (CardWalletAddress `.cwa-card`). */
.cd-exch-wallets-tab {
  flex: 1;
  min-height: 0;
  padding: 1rem 0;
  max-height: 60vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
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

/* Wallet details is a fully read-only view; suppress the card's delete action. */
.cd-exch-wallets-list--readonly :deep(.cwa-delete) {
  display: none;
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
