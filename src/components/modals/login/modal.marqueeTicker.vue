<template>
  <DialogRoot :open="!!coin" @update:open="onDialogOpenChange">
    <DialogPortal>
      <DialogOverlay class="mt-modal-overlay" />
      <DialogContent
        class="mt-modal"
        :aria-describedby="coin ? 'mt-marquee-dialog-desc' : undefined"
      >
        <div v-if="coin" class="mt-modal__shell">
          <div class="mt-modal__header">
            <div class="mt-modal__header-row">
              <div class="mt-modal__title-group">
                <img
                  :src="`./assets/icons/crypto/${coin.symbol.toLowerCase()}.svg`"
                  :alt="''"
                  class="mt-modal__icon"
                  aria-hidden="true"
                />
                <DialogTitle :id="'mt-marquee-dialog-title'" class="mt-modal__title">
                  {{ coin.name }} ({{ coin.symbol }})
                </DialogTitle>
              </div>
              <!-- <DialogClose class="mt-modal__close" aria-label="Close" type="button">
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
              </DialogClose> -->
            </div>
          </div>

          <DialogDescription :id="'mt-marquee-dialog-desc'" class="mt-modal__visually-hidden">
            {{ coin.name }} ({{ coin.symbol }}): {{ t('currentPrice') }}, {{ t('change24h') }},
            {{ t('marketCap') }}.
          </DialogDescription>

          <Separator class="mt-modal__separator" />

          <div class="mt-modal__body">
            <div class="mt-modal__metrics">
              <div class="mt-modal__row">
                <span class="mt-modal__label">{{ t('currentPrice') }}</span>
                <span class="mt-modal__value">${{ formatPrice(coin.price) }}</span>
              </div>
              <div class="mt-modal__row">
                <span class="mt-modal__label">{{ t('change24h') }}</span>
                <span
                  class="mt-modal__value"
                  :class="coin.priceChange > 0 ? 'mt-modal__value--up' : 'mt-modal__value--down'"
                >
                  {{ coin.priceChange > 0 ? '+' : '' }}{{ coin.priceChange.toFixed(2) }}%
                </span>
              </div>
              <div class="mt-modal__row">
                <span class="mt-modal__label">{{ t('marketCap') }}</span>
                <span class="mt-modal__value">${{ formatMarketCap(coin.marketCap) }}</span>
              </div>
            </div>
          </div>

          <Separator class="mt-modal__separator" />

          <div class="mt-modal__footer">
            <a
              href="https://gemini.com/share/jwqzg5fe"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-modal__link-primary"
            >
              {{ t('tradeOnGemini') }}
              <img
                src="/assets/icons/exchanges/gemini.svg"
                alt=""
                class="mt-modal__link-primary-icon"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Separator,
} from 'radix-vue'
import { useI18n } from '@/composables/useI18n'

export type MarqueeTickerCoin = {
  id: string
  symbol: string
  name: string
  price: number
  priceChange: number
  marketCap: number
}

defineProps<{
  coin: MarqueeTickerCoin | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  }).format(price)
}

function formatMarketCap(marketCap: number) {
  if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`
  if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`
  if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`
  return marketCap.toFixed(2)
}

function onDialogOpenChange(open: boolean) {
  if (!open) emit('close')
}
</script>

<!-- Unscoped: DialogPortal teleports to body -->
<style>
/* Overlay + panel: align with app radix modals (e.g. addEntry ac-modal z-index stack) */
.mt-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10060;
  animation: mt-modal-fade 0.15s ease;
}

@keyframes mt-modal-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.mt-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10061;
  width: min(92vw, 22rem);
  max-height: 85vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  animation: mt-modal-pop 0.18s ease;
}

@keyframes mt-modal-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.mt-modal:focus {
  outline: none;
}

.mt-modal__shell {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.mt-modal__header {
  padding: 1rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.mt-modal__header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.75rem;
}

.mt-modal__title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
}

.mt-modal__icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  object-fit: contain;
}

.mt-modal__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
  text-align: left;
}

.mt-modal__close {
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
  flex-shrink: 0;
}

.mt-modal__close svg {
  width: 1rem;
  height: 1rem;
}

.mt-modal__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.mt-modal__close:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}

.mt-modal__visually-hidden {
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

.mt-modal__separator {
  background: #e5e7eb;
  flex-shrink: 0;
}

.mt-modal__body {
  padding: 1rem 1.25rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.mt-modal__metrics {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.mt-modal__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.mt-modal__label {
  color: #6b7280;
  font-weight: 500;
}

.mt-modal__value {
  color: #111827;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.mt-modal__value--up {
  color: #16a34a;
}

.mt-modal__value--down {
  color: #dc2626;
}

.mt-modal__footer {
  padding: 0 1.25rem 1.25rem;
  flex-shrink: 0;
}

.mt-modal__link-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  background: #2563eb;
  color: #fff;
  padding: 0.55rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: background 0.15s, box-shadow 0.15s;
  border: 1px solid transparent;
}

.mt-modal__link-primary:hover {
  background: #1d4ed8;
}

.mt-modal__link-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35);
}

.mt-modal__link-primary-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}
</style>
