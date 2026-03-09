<template>
  <DialogRoot v-model:open="isVisible">
    <DialogPortal>
      <DialogOverlay class="dsm-overlay" />
      <DialogContent class="dsm-content" :aria-describedby="undefined">
        <div class="dsm-header">
          <DialogTitle class="dsm-title">Profile Information</DialogTitle>
          <DialogClose class="dsm-close">&times;</DialogClose>
        </div>

        <TabsRoot v-model="activeMode" class="dsm-tabs-root">
          <TabsList class="dsm-tabs-list" aria-label="Profile sections">
            <TabsTrigger value="domains" class="dsm-tabs-trigger">
              Human Readable Addresses
            </TabsTrigger>
            <TabsTrigger value="social" class="dsm-tabs-trigger">
              Social Media Presence
            </TabsTrigger>
          </TabsList>

          <!-- Human Readable Addresses -->
          <TabsContent value="domains" class="dsm-tabs-content">
            <div class="dsm-grid">
              <div class="dsm-col">
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/nfDomains.svg" alt="" class="dsm-icon" />
                    <a href="https://app.nf.domains" target="_blank" rel="noopener noreferrer" class="dsm-label-link">NF Domains (Algorand)</a>
                  </Label>
                  <input v-model="domains.ada" type="text" class="dsm-input" placeholder="example.ada" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/ethereumNameService.svg" alt="" class="dsm-icon" />
                    <a href="https://app.ens.domains" target="_blank" rel="noopener noreferrer" class="dsm-label-link">Ethereum Name Service</a>
                  </Label>
                  <input v-model="domains.ens" type="text" class="dsm-input" placeholder="example.eth" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/solanaNameService.svg" alt="" class="dsm-icon" />
                    <a href="https://sns.id" target="_blank" rel="noopener noreferrer" class="dsm-label-link">Solana Name Service</a>
                  </Label>
                  <input v-model="domains.solana" type="text" class="dsm-input" placeholder="example.sol" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/tezosDomains.svg" alt="" class="dsm-icon" />
                    <a href="https://tezos.domains" target="_blank" rel="noopener noreferrer" class="dsm-label-link">Tezos Domains</a>
                  </Label>
                  <input v-model="domains.tezos" type="text" class="dsm-input" placeholder="example.tez" />
                </div>
              </div>

              <div class="dsm-col">
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/bitcoinNameService.svg" alt="" class="dsm-icon" />
                    <a href="https://btc.us" target="_blank" rel="noopener noreferrer" class="dsm-label-link">BTC.us</a>
                  </Label>
                  <input v-model="domains.btcus" type="text" class="dsm-input" placeholder="example.btc" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/icns.svg" alt="" class="dsm-icon" />
                    <a href="https://icns.xyz" target="_blank" rel="noopener noreferrer" class="dsm-label-link">Interchain Name Service (Cosmos)</a>
                  </Label>
                  <input v-model="domains.icns" type="text" class="dsm-input" placeholder="example.cosmos" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-globe dsm-icon-bi"></i>
                    Terra Name Service
                  </Label>
                  <input v-model="domains.terra" type="text" class="dsm-input" placeholder="example.ust" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/domains/unstoppableDomains.svg" alt="" class="dsm-icon" />
                    <a href="https://unstoppabledomains.com/?ref=e52554b57f07488" target="_blank" rel="noopener noreferrer" class="dsm-label-link">Unstoppable Domains</a>
                  </Label>
                  <input v-model="domains.unstoppable" type="text" class="dsm-input" placeholder="example.crypto" />
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- Social Media Presence -->
          <TabsContent value="social" class="dsm-tabs-content">
            <div class="dsm-grid">
              <!-- Col 1: Github · LinkedIn · TikTok · Twitter/X · Medium · Instagram · Threads -->
              <div class="dsm-col">
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-github dsm-icon-bi"></i>
                    Github
                  </Label>
                  <input v-model="social.github" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-linkedin dsm-icon-bi"></i>
                    LinkedIn
                  </Label>
                  <input v-model="social.linkedin" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-tiktok dsm-icon-bi"></i>
                    TikTok
                  </Label>
                  <input v-model="social.tiktok" type="text" class="dsm-input" placeholder="@username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-twitter-x dsm-icon-bi"></i>
                    Twitter / X
                  </Label>
                  <input v-model="social.twitter" type="text" class="dsm-input" placeholder="@username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-medium dsm-icon-bi"></i>
                    Medium
                  </Label>
                  <input v-model="social.medium" type="text" class="dsm-input" placeholder="@username or publication" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-instagram dsm-icon-bi"></i>
                    Instagram
                  </Label>
                  <input v-model="social.instagram" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-threads dsm-icon-bi"></i>
                    Threads
                  </Label>
                  <input v-model="social.threads" type="text" class="dsm-input" placeholder="@username" />
                </div>
              </div>

              <!-- Col 2: Twitch · YouTube · fxHash · Telegram · Discord · Bluesky · Mastodon -->
              <div class="dsm-col">
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-twitch dsm-icon-bi"></i>
                    Twitch
                  </Label>
                  <input v-model="social.twitch" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-youtube dsm-icon-bi"></i>
                    YouTube
                  </Label>
                  <input v-model="social.youtube" type="text" class="dsm-input" placeholder="channel name" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <img src="/assets/icons/social/fx_.black.svg" alt="" class="dsm-icon" />
                    fxHash
                  </Label>
                  <input v-model="social.fxhash" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-telegram dsm-icon-bi"></i>
                    Telegram
                  </Label>
                  <input v-model="social.telegram" type="text" class="dsm-input" placeholder="@username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-discord dsm-icon-bi"></i>
                    Discord
                  </Label>
                  <input v-model="social.discord" type="text" class="dsm-input" placeholder="username" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-bluesky dsm-icon-bi"></i>
                    Bluesky
                  </Label>
                  <input v-model="social.bluesky" type="text" class="dsm-input" placeholder="@username.bsky.social" />
                </div>
                <div class="dsm-field">
                  <Label class="dsm-label">
                    <i class="bi bi-mastodon dsm-icon-bi"></i>
                    Mastodon
                  </Label>
                  <input v-model="social.mastodon" type="text" class="dsm-input" placeholder="@username@instance.social" />
                </div>
              </div>
            </div>
          </TabsContent>
        </TabsRoot>

        <div class="dsm-footer">
          <button class="dsm-btn dsm-btn--ghost" @click="isVisible = false">Cancel</button>
          <button class="dsm-btn dsm-btn--primary" @click="saveChanges">Save Changes</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
  Label,
} from 'radix-vue'

const emit = defineEmits<{
  save: [payload: { domains: typeof domains.value; social: typeof social.value }]
  opened: []
  closed: []
}>()

const isVisible = ref(false)
const activeMode = ref<'domains' | 'social'>('domains')

const domains = ref({
  ada: '',
  btcus: '',
  ens: '',
  icns: '',
  solana: '',
  terra: '',
  tezos: '',
  unstoppable: '',
})

const social = ref({
  github: '',
  instagram: '',
  linkedin: '',
  medium: '',
  threads: '',
  tiktok: '',
  twitch: '',
  twitter: '',
  fxhash: '',
  youtube: '',
  telegram: '',
  discord: '',
  bluesky: '',
  mastodon: '',
})

function showModal(tab?: 'domains' | 'social') {
  if (tab) activeMode.value = tab
  isVisible.value = true
  emit('opened')
}

function hideModal() {
  isVisible.value = false
  emit('closed')
}

function saveChanges() {
  emit('save', { domains: domains.value, social: social.value })
  hideModal()
}

defineExpose({ showModal, hideModal, activeMode })
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────────────────────── */
.dsm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  animation: dsm-fade-in 0.15s ease;
}

/* ── Dialog content ──────────────────────────────────────────────────────── */
.dsm-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  max-width: calc(100vw - 2rem);
  max-height: 90vh;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
  animation: dsm-slide-up 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 1.5rem;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.dsm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.75rem;
}

.dsm-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.dsm-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.dsm-tabs-root {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.dsm-tabs-list {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.25rem;
  flex-shrink: 0;
}

.dsm-tabs-trigger {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: -1px;
  outline: none;

  &:hover {
    color: #374151;
  }

  &[data-state='active'] {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }
}

.dsm-tabs-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0 0.5rem;
  min-height: 0;
}

/* ── Form grid ───────────────────────────────────────────────────────────── */
.dsm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2rem;
}

.dsm-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Field / Label / Input ───────────────────────────────────────────────── */
.dsm-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dsm-label {
  display: flex !important;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.2;
}

.dsm-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  object-fit: contain;
}

.dsm-icon-bi {
  font-size: 16px;
  flex-shrink: 0;
  color: #6b7280;
  line-height: 1;
}

.dsm-label-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
}

.dsm-input {
  width: 100%;
  padding: 0.4rem 0.65rem;
  font-size: 0.8rem;
  color: #111827;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
.dsm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.75rem;
  flex-shrink: 0;
}

.dsm-btn {
  padding: 0.4rem 0.875rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  outline: none;

  &--primary {
    background: #2563eb;
    color: #ffffff;

    &:hover {
      background: #1d4ed8;
    }
  }

  &--ghost {
    background: transparent;
    color: #374151;
    border-color: #d1d5db;

    &:hover {
      background: #f3f4f6;
    }
  }
}

/* ── Animations ──────────────────────────────────────────────────────────── */
@keyframes dsm-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes dsm-slide-up {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}
</style>
