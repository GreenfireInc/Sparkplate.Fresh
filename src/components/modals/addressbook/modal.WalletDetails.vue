<template>
  <DialogRoot :open="true" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="wd-overlay" />
      <DialogContent class="wd-modal" :aria-describedby="undefined">

        <!-- Header -->
        <div class="wd-header">
          <div class="wd-header__row">
            <div class="wd-header__title-group">
              <DialogTitle class="wd-header__title">{{ wallet.name }}</DialogTitle>
              <span class="wd-header__subtitle">ID #{{ wallet.id }}</span>
            </div>
            <DialogClose class="wd-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="wd-separator" />

        <!-- Body -->
        <div class="wd-body">

          <!-- Currencies -->
          <div class="wd-section">
            <div class="wd-section__heading">
              <span class="wd-section__title">Currencies</span>
              <span class="wd-badge">{{ wallet.currencies.length }}</span>
            </div>

            <div v-if="wallet.currencies.length > 0" class="wd-currencies">
              <div class="wd-currencies__header">
                <span>Name</span>
                <span>Ticker</span>
                <span>Address</span>
              </div>
              <div
                v-for="currency in wallet.currencies"
                :key="currency.abbreviation"
                class="wd-currencies__row"
              >
                <span class="wd-currencies__name">{{ currency.name }}</span>
                <span class="wd-currencies__ticker">{{ currency.abbreviation }}</span>
                <code class="wd-currencies__address" :title="currency.address">
                  {{ truncateAddress(currency.address) }}
                </code>
              </div>
            </div>

            <p v-else class="wd-empty">No currencies on this wallet.</p>
          </div>

        </div>

        <Separator class="wd-separator" />

        <!-- Footer -->
        <div class="wd-footer">
          <DialogClose class="wd-btn wd-btn--ghost">Close</DialogClose>
        </div>

      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose,
  Separator,
} from 'radix-vue'

defineOptions({ name: 'ModalWalletDetails' })

interface Currency {
  name: string
  abbreviation: string
  address: string
}

interface Wallet {
  id: number
  name: string
  currencies: Currency[]
}

defineProps<{ wallet: Wallet }>()
const emit = defineEmits<{ close: [] }>()

function onDialogOpen(open: boolean) { if (!open) emit('close') }

function truncateAddress(address: string): string {
  if (!address || address.length <= 14) return address
  return `${address.slice(0, 7)}…${address.slice(-7)}`
}
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────── */
.wd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9000;
  animation: wd-fade 0.15s ease;
}

@keyframes wd-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Modal shell ─────────────────────────────────────────── */
.wd-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9001;
  width: min(95vw, 36rem);
  max-height: 80vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: wd-pop 0.18s ease;
}

@keyframes wd-pop {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* ── Header ──────────────────────────────────────────────── */
.wd-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.wd-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.wd-header__title-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.wd-header__title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wd-header__subtitle {
  font-size: 0.75rem;
  color: #6b7280;
}

.wd-header__close {
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

  svg { width: 1rem; height: 1rem; }
  &:hover { background: #e5e7eb; color: #111827; }
}

/* ── Separator ───────────────────────────────────────────── */
.wd-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body ────────────────────────────────────────────────── */
.wd-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.125rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Section ─────────────────────────────────────────────── */
.wd-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wd-section__heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wd-section__title {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b7280;
}

.wd-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.3rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #374151;
  background: #e5e7eb;
  border-radius: 999px;
}

/* ── Currencies table ────────────────────────────────────── */
.wd-currencies {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
}

.wd-currencies__header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.wd-currencies__row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.8125rem;

  &:last-child { border-bottom: none; }
}

.wd-currencies__name {
  color: #111827;
  font-weight: 500;
}

.wd-currencies__ticker {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.wd-currencies__address {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.775rem;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wd-empty {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
  padding: 0.5rem 0;
}

/* ── Footer ──────────────────────────────────────────────── */
.wd-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.25rem;
}

.wd-btn {
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
  transition: background 0.12s, border-color 0.12s;
}

.wd-btn--ghost {
  background: transparent;
  border-color: #d1d5db;
  color: #374151;
  &:hover { background: #f3f4f6; }
}
</style>
