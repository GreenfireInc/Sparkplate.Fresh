<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="exchange-modal-overlay" />
      <DialogContent class="exchange-modal-content" :aria-describedby="undefined">
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
              <div class="flex gap-2 shrink-0">
                <button class="exchange-btn exchange-btn-save" @click="save">Save</button>
                <button class="exchange-btn exchange-btn-test" @click="testPing">Test/Ping</button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
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

function testPing() {
  const e = entity.value
  if (!e) return
  console.log('Test/Ping', e.name)
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
  padding: 1.5rem 2rem;
  min-width: 380px;
  max-width: 90vw;
  z-index: 9999;
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

.exchange-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

.exchange-btn-test:hover {
  background: #f0fdf4;
  border-color: #22c55e;
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
</style>
