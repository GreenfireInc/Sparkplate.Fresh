<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="exchange-modal-overlay" />
      <DialogContent
        class="exchange-modal-content"
        :class="{ 'exchange-modal-content--wide': consoleOpen }"
        :aria-describedby="undefined"
      >
        <div class="exchange-modal-layout">
        <div class="exchange-form-panel">
        <DialogTitle class="exchange-modal-title">
          <div class="exchange-modal-title-left flex items-center gap-2 min-w-0">
            <img
              v-if="entity && iconMap[entity.id]"
              :src="iconMap[entity.id]"
              :alt="entity.name"
              class="exchange-title-icon"
            />
            <i v-else-if="entity" class="bi bi-currency-exchange exchange-title-icon exchange-title-icon-bi"></i>
            <span class="wrap-break-word">{{ entity?.name }} API Configuration</span>
          </div>
          <span v-if="exchangeFlag" class="exchange-flag shrink-0" :title="exchangeMeta?.country">{{ exchangeFlag }}</span>
        </DialogTitle>
        <div v-if="entity" class="exchange-modal-body">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                v-model="formData.apiKey"
                type="password"
                class="exchange-input"
                placeholder="API Key"
                autocomplete="off"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
              <input
                v-model="formData.apiSecret"
                type="password"
                class="exchange-input"
                placeholder="API Secret"
                autocomplete="off"
              />
            </div>
            <div class="flex flex-wrap gap-2 pt-2 justify-between items-center">
              <div v-if="hasExchangeLinks" class="flex flex-wrap gap-3 items-center text-sm">
                <a
                  v-if="exchangeMeta?.apiDocs"
                  :href="exchangeMeta.apiDocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="exchange-link"
                  title="API Documentation"
                >
                  <i class="bi bi-code-slash"></i>
                </a>
                <a
                  v-if="exchangeMeta?.socialMedia?.github"
                  :href="exchangeMeta.socialMedia.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="exchange-link"
                  title="GitHub"
                >
                  <i class="bi bi-github"></i>
                </a>
                <a
                  v-if="exchangeMeta?.socialMedia?.twitter"
                  :href="exchangeMeta.socialMedia.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="exchange-link"
                  title="Twitter / X"
                >
                  <i class="bi bi-twitter-x"></i>
                </a>
                <a
                  v-if="exchangeMeta?.socialMedia?.telegram"
                  :href="exchangeMeta.socialMedia.telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="exchange-link"
                  title="Telegram"
                >
                  <i class="bi bi-telegram"></i>
                </a>
              </div>
              <div class="flex gap-2 shrink-0 items-center">
                <input ref="importFileEl" type="file" accept=".json" class="hidden" @change="importKeys" />

                <button class="exchange-btn exchange-btn-save" @click="save">
                  <i class="bi bi-floppy"></i> Save
                </button>

                <DropdownMenuRoot v-model:open="actionsOpen">
                  <DropdownMenuTrigger class="exchange-btn exchange-actions-trigger" :class="{ 'exchange-actions-trigger--pinging': pinging }">
                    <span v-if="pinging" class="exchange-ping-dot" />
                    Actions
                    <i class="bi bi-chevron-down exchange-actions-chevron" :class="{ 'exchange-actions-chevron--open': actionsOpen }"></i>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuContent class="exchange-actions-menu" :side-offset="6" align="end">
                      <DropdownMenuItem class="exchange-actions-item" @click="importFileEl?.click()">
                        <i class="bi bi-box-arrow-in-down"></i> Import
                      </DropdownMenuItem>
                      <DropdownMenuItem class="exchange-actions-item" @click="exportKeys">
                        <i class="bi bi-box-arrow-up"></i> Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator class="exchange-actions-separator" />
                      <DropdownMenuItem
                        class="exchange-actions-item exchange-actions-item--ping"
                        :disabled="pinging"
                        @click="testPing"
                      >
                        <span v-if="pinging" class="exchange-ping-dot" />
                        <i v-else class="bi bi-reception-4"></i>
                        {{ pinging ? 'Pinging…' : 'Test / Ping' }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenuRoot>
              </div>
            </div>
          </div>
        </div>
        </div><!-- /.exchange-form-panel -->

        <!-- ── Console panel ─────────────────────────────────────────────── -->
        <Transition name="exchange-console">
          <div v-if="consoleOpen" class="exchange-console-panel">
            <div class="exchange-console-header">
              <span class="exchange-console-dots">
                <span class="exchange-console-dot exchange-console-dot--red" />
                <span class="exchange-console-dot exchange-console-dot--yellow" />
                <span class="exchange-console-dot exchange-console-dot--green" />
              </span>
              <span class="exchange-console-title">console</span>
              <button class="exchange-console-close" title="Close" @click="consoleOpen = false">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div ref="consoleScrollEl" class="exchange-console-body">
              <div
                v-for="entry in consoleLogs"
                :key="entry.id"
                :class="['exchange-console-line', `exchange-console-line--${entry.level}`]"
              >
                <span class="exchange-console-ts">{{ entry.ts }}</span>
                <span class="exchange-console-msg">{{ entry.msg }}</span>
              </div>
              <div v-if="pinging" class="exchange-console-line exchange-console-line--info">
                <span class="exchange-console-ts">{{ timestamp() }}</span>
                <span class="exchange-console-msg exchange-console-cursor">▋</span>
              </div>
            </div>
          </div>
        </Transition>

        </div><!-- /.exchange-modal-layout -->
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useExchangeConsole } from './ext/console.exchanges'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { CryptoExchanges } from '@/lib/cores/currencyCore/exchanges'

const STORAGE_PREFIX = 'sparkplate_api_'

// Icons from public/assets/icons/exchanges (matches Exchanges.vue)
const iconMap: Record<string, string> = {
  binance: '/assets/icons/exchanges/binance.svg',
  bitfinex: '/assets/icons/exchanges/bitfinex.svg',
  bitget: '/assets/icons/exchanges/bitget.svg',
  bitflyer: '/assets/icons/exchanges/bitflyer.svg',
  bitstamp: '/assets/icons/exchanges/bitstamp.svg',
  bybit: '/assets/icons/exchanges/bybit.svg',
  coinbase: '/assets/icons/exchanges/coinbase.svg',
  gateio: '/assets/icons/exchanges/gateio.svg',
  gemini: '/assets/icons/exchanges/gemini.svg',
  huobi: '/assets/icons/exchanges/htx.svg',
  kraken: '/assets/icons/exchanges/kraken.svg',
  kucoin: '/assets/icons/exchanges/kucoin.svg',
  mexc: '/assets/icons/exchanges/mexc.svg',
  okx: '/assets/icons/exchanges/okx.svg',
  upbit: '/assets/icons/exchanges/upbit.svg',
}

interface ExchangeEntity {
  id: string
  name: string
  apiKey: string
  apiSecret: string
}

const EXCHANGE_ENTITIES: ExchangeEntity[] = Object.keys(CryptoExchanges).map((name) => {
  const id = name.toLowerCase()
  return {
    id,
    name,
    apiKey: `${id}_api_key`,
    apiSecret: `${id}_api_secret`,
  }
})

const props = defineProps<{
  modelValue: boolean
  exchangeId: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const entity = computed(() => EXCHANGE_ENTITIES.find((e) => e.id === props.exchangeId) ?? null)

const exchangeMeta = computed(() => {
  const e = entity.value
  if (!e) return null
  const ex = CryptoExchanges[e.name as keyof typeof CryptoExchanges] as {
    info?: { apiDocs?: string; country?: string }
    socialMedia?: Record<string, string>
  } | undefined
  if (!ex?.info && !ex?.socialMedia) return null
  return {
    apiDocs: ex?.info?.apiDocs,
    socialMedia: ex?.socialMedia,
    country: ex?.info?.country,
  }
})

// Map country name (from exchange info) to flag emoji
const COUNTRY_FLAGS: Record<string, string> = {
  'British Virgin Islands': '🇻🇬',
  'Cayman Islands': '🇰🇾',
  Global: '🌐',
  Japan: '🇯🇵',
  Luxembourg: '🇱🇺',
  Seychelles: '🇸🇨',
  Singapore: '🇸🇬',
  'South Korea': '🇰🇷',
  'United States': '🇺🇸',
}

const exchangeFlag = computed(() => {
  const country = exchangeMeta.value?.country
  return country ? (COUNTRY_FLAGS[country] ?? '') : ''
})

const hasExchangeLinks = computed(() => {
  const m = exchangeMeta.value
  if (!m) return false
  return !!(m.apiDocs || m.socialMedia?.github || m.socialMedia?.twitter || m.socialMedia?.telegram)
})

const formData = reactive({
  apiKey: '',
  apiSecret: '',
})

// ── Actions dropdown ────────────────────────────────────────────────────────
const actionsOpen = ref(false)
const importFileEl = ref<HTMLInputElement | null>(null)

// ── Console panel — ext/console.exchanges.ts ────────────────────────────────
const { consoleOpen, pinging, consoleLogs, consoleScrollEl, timestamp, testPing } =
  useExchangeConsole(entity, formData)

function loadFormData() {
  const e = entity.value
  if (!e) return
  try {
    formData.apiKey = localStorage.getItem(STORAGE_PREFIX + e.apiKey) || ''
    formData.apiSecret = localStorage.getItem(STORAGE_PREFIX + e.apiSecret) || ''
  } catch {
    formData.apiKey = ''
    formData.apiSecret = ''
  }
}

function save() {
  const e = entity.value
  if (!e) return
  try {
    if (formData.apiKey) localStorage.setItem(STORAGE_PREFIX + e.apiKey, formData.apiKey)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiKey)
    if (formData.apiSecret) localStorage.setItem(STORAGE_PREFIX + e.apiSecret, formData.apiSecret)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiSecret)
  } catch {
    // ignore
  }
}

function exportKeys() {
  const e = entity.value
  if (!e) return
  const payload: Record<string, string> = {}
  if (formData.apiKey) payload.apiKey = formData.apiKey
  if (formData.apiSecret) payload.apiSecret = formData.apiSecret
  const blob = new Blob([JSON.stringify({ exchange: e.id, keys: payload }, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${e.id}-api-keys.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importKeys(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string) as { keys?: Record<string, string> }
      const keys = json?.keys ?? {}
      if (keys.apiKey) formData.apiKey = keys.apiKey
      if (keys.apiSecret) formData.apiSecret = keys.apiSecret
    } catch { /* malformed file — ignore */ }
    if (importFileEl.value) importFileEl.value.value = ''
  }
  reader.readAsText(file)
}


watch(open, (v) => {
  if (v) loadFormData()
})

watch(() => props.exchangeId, () => {
  if (open.value) loadFormData()
})
</script>

<style scoped>
.exchange-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.exchange-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-width: 380px;
  max-width: 92vw;
  z-index: 9999;
  overflow: hidden;
  transition: min-width 0.3s ease;
}

.exchange-modal-layout {
  display: flex;
  align-items: stretch;
}

.exchange-form-panel {
  padding: 1.5rem 2rem;
  min-width: 380px;
  flex-shrink: 0;
}

.exchange-modal-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.exchange-flag {
  font-size: 1.5rem;
  line-height: 1;
}

.exchange-title-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.exchange-title-icon-bi {
  font-size: 1.5rem;
  color: #6b7280;
  object-fit: unset;
}

.exchange-modal-body {
  margin-bottom: 0.5rem;
}

.exchange-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.exchange-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.exchange-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: white;
}

.exchange-btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.exchange-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

/* ── Actions dropdown ────────────────────────────────────────────────────── */
.exchange-actions-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding-right: 0.6rem;
}

.exchange-actions-trigger--pinging {
  background: #f0fdf4;
  border-color: #22c55e;
}

.exchange-actions-chevron {
  font-size: 0.65rem;
  transition: transform 0.18s ease;
  opacity: 0.6;
}

.exchange-actions-chevron--open {
  transform: rotate(180deg);
}

.exchange-ping-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: exchange-blink 0.9s infinite;
}

@keyframes exchange-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.exchange-link {
  display: inline-flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s;
}

.exchange-link:hover {
  color: #3b82f6;
}

.exchange-link .bi {
  font-size: 1.125rem;
}

/* ── Console panel ───────────────────────────────────────────────────────── */
.exchange-console-panel {
  width: 340px;
  background: #0d1117;
  border-left: 1px solid #21262d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.exchange-console-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  user-select: none;
}

.exchange-console-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.exchange-console-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.exchange-console-dot--red    { background: #ff5f57; }
.exchange-console-dot--yellow { background: #febc2e; }
.exchange-console-dot--green  { background: #28c840; }

.exchange-console-title {
  flex: 1;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.7rem;
  color: #6e7681;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: lowercase;
}

.exchange-console-close {
  background: none;
  border: none;
  color: #6e7681;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  font-size: 0.75rem;
  transition: color 0.15s;
}

.exchange-console-close:hover { color: #e6edf3; }

.exchange-console-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.625rem 0.75rem;
  min-height: 180px;
  max-height: 320px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  scrollbar-width: thin;
  scrollbar-color: #30363d #0d1117;
}

.exchange-console-body::-webkit-scrollbar       { width: 4px; }
.exchange-console-body::-webkit-scrollbar-track { background: #0d1117; }
.exchange-console-body::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }

.exchange-console-line {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

.exchange-console-ts {
  color: #484f58;
  flex-shrink: 0;
  font-size: 0.65rem;
}

.exchange-console-msg { flex: 1; }

.exchange-console-line--info    .exchange-console-msg { color: #8b949e; }
.exchange-console-line--request .exchange-console-msg { color: #c084fc; }
.exchange-console-line--success .exchange-console-msg { color: #3fb950; }
.exchange-console-line--error   .exchange-console-msg { color: #f85149; }
.exchange-console-line--warn    .exchange-console-msg { color: #d29922; }

.exchange-console-cursor {
  animation: exchange-cursor-blink 1s steps(1) infinite;
}

@keyframes exchange-cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Slide-in transition ─────────────────────────────────────────────────── */
.exchange-console-enter-active,
.exchange-console-leave-active {
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.22s ease;
  overflow: hidden;
}

.exchange-console-enter-from,
.exchange-console-leave-to {
  width: 0 !important;
  opacity: 0;
}

.exchange-console-enter-to,
.exchange-console-leave-from {
  width: 340px;
  opacity: 1;
}
</style>

<!-- Unscoped: DropdownMenuPortal teleports to <body>, outside the scoped tree -->
<style>
.exchange-actions-menu {
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -3px rgba(0, 0, 0, 0.08);
  padding: 0.25rem;
  z-index: 10000;
  animation: exchange-menu-in 0.12s ease;
}

@keyframes exchange-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.exchange-actions-separator {
  height: 1px;
  background: #f3f4f6;
  margin: 0.25rem 0;
}

.exchange-actions-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #374151;
  text-align: left;
  transition: background 0.1s;
  outline: none;
  user-select: none;
}

.exchange-actions-item:hover,
.exchange-actions-item[data-highlighted] {
  background: #f3f4f6;
  color: #111827;
}

.exchange-actions-item[data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.exchange-actions-item--ping:hover,
.exchange-actions-item--ping[data-highlighted] {
  background: #f0fdf4;
  color: #16a34a;
}
</style>
