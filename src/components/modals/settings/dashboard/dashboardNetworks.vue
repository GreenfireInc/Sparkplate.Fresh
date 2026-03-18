<!--
  Dashboard Networks Modal — Shows all RPC endpoints for a given currency.
  Usage: <DashboardNetworks :currency="currency" :get-icon="getIcon" />
-->

<template>
  <DialogRoot :open="modalOpen" @update:open="closeModal">
    <DialogPortal>
      <DialogOverlay class="rpc-overlay" />
      <DialogContent class="rpc-modal" aria-describedby="rpc-modal-desc">
        <div class="rpc-modal__header">
          <div class="rpc-modal__title-row">
            <img
              v-if="modalCurrency && getIcon(modalCurrency.basicInfo.symbolTicker)"
              :src="getIcon(modalCurrency.basicInfo.symbolTicker)"
              :alt="modalCurrency?.basicInfo.symbolTicker"
              class="rpc-modal__coin-icon"
            />
            <span v-else-if="modalCurrency" class="rpc-modal__coin-fallback">{{ modalCurrency.basicInfo.symbolTicker.slice(0, 2) }}</span>
            <div>
              <DialogTitle class="rpc-modal__title">{{ modalCurrency?.basicInfo.name }} RPC Endpoints</DialogTitle>
              <p id="rpc-modal-desc" class="rpc-modal__subtitle">{{ modalCurrency?.basicInfo.symbolTicker.toUpperCase() }} — {{ modalEndpoints.length }} endpoint{{ modalEndpoints.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>

          <!-- Network filter tabs -->
          <div class="rpc-modal__tabs">
            <button
              v-for="tab in modalNetworkTabs"
              :key="tab"
              class="rpc-modal__tab"
              :class="{ 'rpc-modal__tab--active': modalNetworkFilter === tab }"
              @click="modalNetworkFilter = tab"
            >
              {{ tab === 'all' ? 'All' : capitalize(tab) }}
              <span class="rpc-modal__tab-count">{{ getTabCount(tab) }}</span>
            </button>
          </div>

          <DialogClose class="rpc-modal__close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </DialogClose>
        </div>

        <div class="rpc-modal__body">
          <div v-if="filteredModalEndpoints.length === 0" class="rpc-modal__empty">
            No endpoints found for this network.
          </div>
          <div
            v-for="ep in filteredModalEndpoints"
            :key="ep.url + ep.name"
            class="rpc-endpoint-card"
          >
            <div class="rpc-endpoint-card__top">
              <div class="rpc-endpoint-card__meta">
                <span class="rpc-endpoint-card__name">{{ ep.name }}</span>
                <span class="rpc-endpoint-card__badges">
                  <span v-if="ep.network" class="rpc-badge" :class="`rpc-badge--${ep.network}`">{{ ep.network }}</span>
                  <span v-if="ep.serviceType" class="rpc-badge rpc-badge--service">{{ ep.serviceType }}</span>
                </span>
              </div>
              <button
                class="rpc-endpoint-card__copy"
                :aria-label="`Copy URL for ${ep.name}`"
                @click="copyUrl(ep.url)"
              >
                <svg v-if="copiedUrl !== ep.url" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </button>
            </div>
            <a :href="ep.url" target="_blank" rel="noopener noreferrer" class="rpc-endpoint-card__url">{{ ep.url }}</a>
            <p v-if="ep.type" class="rpc-endpoint-card__type">{{ ep.type }}</p>
            <p v-if="ep.description" class="rpc-endpoint-card__desc">{{ ep.description }}</p>
            <div v-if="ep.npmPackage || ep.documentation" class="rpc-endpoint-card__links">
              <a v-if="ep.npmPackage" :href="`https://www.npmjs.com/package/${ep.npmPackage}`" target="_blank" rel="noopener noreferrer" class="rpc-endpoint-card__link rpc-endpoint-card__link--npm">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M0 0v24h24V0zm4 4h16v11.3H12V8H8v7.3H4z"/></svg>
                {{ ep.npmPackage }}
              </a>
              <a v-if="ep.documentation" :href="ep.documentation" target="_blank" rel="noopener noreferrer" class="rpc-endpoint-card__link rpc-endpoint-card__link--docs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Docs
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue'
import type { CurrencyData } from '@/lib/cores/currencyCore/currencies'

defineOptions({ name: 'DashboardNetworks' })

interface Props {
  getIcon: (ticker: string) => string | null
}

defineProps<Props>()

interface RpcEndpoint {
  name: string
  url: string
  port?: number
  protocol?: string
  type?: string
  description?: string
  npmPackage?: string
  documentation?: string
  network?: string
  serviceType?: string
}

const modalOpen = ref(false)
const modalCurrency = ref<CurrencyData | null>(null)
const modalNetworkFilter = ref<string>('all')
const copiedUrl = ref<string | null>(null)

const modalEndpoints = computed<RpcEndpoint[]>(() => {
  if (!modalCurrency.value) return []
  const endpoints = (modalCurrency.value as Record<string, unknown>)['rpcEndpoints']
  return Array.isArray(endpoints) ? (endpoints as RpcEndpoint[]) : []
})

const modalNetworkTabs = computed<string[]>(() => {
  const networks = new Set<string>(['all'])
  modalEndpoints.value.forEach((ep) => { if (ep.network) networks.add(ep.network) })
  return Array.from(networks)
})

const filteredModalEndpoints = computed<RpcEndpoint[]>(() => {
  if (modalNetworkFilter.value === 'all') return modalEndpoints.value
  return modalEndpoints.value.filter((ep) => ep.network === modalNetworkFilter.value)
})

function getTabCount(tab: string): number {
  if (tab === 'all') return modalEndpoints.value.length
  return modalEndpoints.value.filter((ep) => ep.network === tab).length
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function closeModal(open: boolean) {
  if (!open) {
    modalOpen.value = false
    modalCurrency.value = null
  }
}

let copyTimeout: ReturnType<typeof setTimeout> | null = null
function copyUrl(url: string) {
  navigator.clipboard.writeText(url).catch(() => {})
  copiedUrl.value = url
  if (copyTimeout) clearTimeout(copyTimeout)
  copyTimeout = setTimeout(() => { copiedUrl.value = null }, 2000)
}

function open(currency: CurrencyData) {
  modalCurrency.value = currency
  modalNetworkFilter.value = 'all'
  copiedUrl.value = null
  modalOpen.value = true
}

defineExpose({ open })
</script>

<style>
/* ── RPC Endpoints Modal ──────────────────────────────────────────────────── */

.rpc-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9998;
  animation: rpc-fade-in 0.15s ease;
}

.rpc-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: min(92vw, 52rem);
  max-height: 85vh;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  animation: rpc-slide-in 0.18s ease;
  overflow: hidden;
}

@keyframes rpc-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rpc-slide-in {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
}

.rpc-modal__header {
  position: relative;
  padding: 1.25rem 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.rpc-modal__title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.rpc-modal__coin-icon {
  width: 2.25rem;
  height: 2.25rem;
  object-fit: contain;
  flex-shrink: 0;
}

.rpc-modal__coin-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #6b7280;
  flex-shrink: 0;
}

.rpc-modal__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.rpc-modal__subtitle {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0.125rem 0 0;
}

.rpc-modal__tabs {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  padding-bottom: 0.875rem;
}

.rpc-modal__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3125rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.rpc-modal__tab:hover {
  background: #f3f4f6;
  color: #374151;
}

.rpc-modal__tab--active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.rpc-modal__tab--active:hover {
  background: #1d4ed8;
  color: #fff;
}

.rpc-modal__tab-count {
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 9999px;
  padding: 0 0.375rem;
  line-height: 1.4;
}

.rpc-modal__tab--active .rpc-modal__tab-count {
  background: rgba(255, 255, 255, 0.25);
}

.rpc-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
}

.rpc-modal__close svg {
  width: 1rem;
  height: 1rem;
}

.rpc-modal__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.rpc-modal__body {
  overflow-y: auto;
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rpc-modal__empty {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

/* ── Endpoint card ─────────────────────────────────────────────────────────── */

.rpc-endpoint-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  transition: box-shadow 0.12s;
}

.rpc-endpoint-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.rpc-endpoint-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.rpc-endpoint-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.rpc-endpoint-card__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.rpc-endpoint-card__badges {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.rpc-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.rpc-badge--mainnet {
  background: #dcfce7;
  color: #166534;
}

.rpc-badge--testnet {
  background: #fef9c3;
  color: #854d0e;
}

.rpc-badge--liquid,
.rpc-badge--regtest,
.rpc-badge--devnet,
.rpc-badge--signet {
  background: #f3e8ff;
  color: #6b21a8;
}

.rpc-badge--service {
  background: #e0f2fe;
  color: #0369a1;
}

.rpc-endpoint-card__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background: #fff;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.rpc-endpoint-card__copy svg {
  width: 0.875rem;
  height: 0.875rem;
}

.rpc-endpoint-card__copy:hover {
  background: #f3f4f6;
  color: #111827;
}

.rpc-endpoint-card__url {
  display: block;
  font-size: 0.8125rem;
  color: #2563eb;
  text-decoration: none;
  font-family: ui-monospace, monospace;
  word-break: break-all;
  margin-bottom: 0.25rem;
}

.rpc-endpoint-card__url:hover {
  text-decoration: underline;
}

.rpc-endpoint-card__type {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0 0 0.25rem;
  font-style: italic;
}

.rpc-endpoint-card__desc {
  font-size: 0.8125rem;
  color: #4b5563;
  margin: 0 0 0.5rem;
  line-height: 1.45;
}

.rpc-endpoint-card__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.rpc-endpoint-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  transition: background 0.12s;
}

.rpc-endpoint-card__link svg {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.rpc-endpoint-card__link--npm {
  color: #cb3837;
  background: #fff0f0;
}

.rpc-endpoint-card__link--npm svg {
  fill: #cb3837;
  stroke: none;
}

.rpc-endpoint-card__link--npm:hover {
  background: #ffe0e0;
}

.rpc-endpoint-card__link--docs {
  color: #374151;
  background: #f3f4f6;
}

.rpc-endpoint-card__link--docs:hover {
  background: #e5e7eb;
}
</style>
