<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="ed-overlay" />
      <DialogContent
        class="ed-modal"
        :aria-describedby="undefined"
        @pointer-down-outside="onInteractOutside"
        @interact-outside="onInteractOutside"
      >

        <!-- Header -->
        <div class="ed-header">
          <div class="ed-header__row">
            <DialogTitle class="ed-header__title">
              {{ isEditing ? 'Edit Exchange' : 'Add Exchange' }}
            </DialogTitle>
            <DialogClose class="ed-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="ed-separator" />

        <!-- Body -->
        <div class="ed-body">
          <form class="ed-form" @submit.prevent="saveExchange">

            <!-- Name | Email -->
            <div class="ed-row">
              <div class="ed-field">
                <label class="ed-label" for="ed-name">Exchange Name</label>
                <DropdownExchanges
                  id="ed-name"
                  v-model="form.name"
                  placeholder="Select exchange…"
                  @pick="onExchangePick"
                />
              </div>
              <div class="ed-field">
                <label class="ed-label" for="ed-email">Associated Email</label>
                <input id="ed-email" type="email" v-model="form.email" placeholder="you@example.com" class="ed-input" />
              </div>
            </div>

            <!-- URL | Referral URL -->
            <div class="ed-row">
              <div class="ed-field">
              <label class="ed-label" for="ed-referralCode">Referral Code</label>
              <input id="ed-referralCode" type="text" v-model="form.referralCode" placeholder="e.g. ABC123" class="ed-input" />
            </div>
              <div class="ed-field">
                <label class="ed-label" for="ed-referralUrl">Referral URL</label>
                <input id="ed-referralUrl" type="url" v-model="form.referralUrl" placeholder="https://exchange.com/ref/…" class="ed-input" />
              </div>
            </div>

            <!-- Referral Code -->
            

            <!-- Currencies -->
            <div class="ed-currencies">
              <div class="ed-currencies__heading">
                <div class="ed-currencies__tab">
                  <Coins :size="14" class="ed-currencies__tab-icon" />
                  Currencies
                  <span class="ed-badge">{{ form.currencies.length }}</span>
                </div>
                <button type="button" class="ed-btn ed-btn--ghost ed-btn--sm" @click="addCurrencyRow">
                  <Plus :size="13" /> Add
                </button>
              </div>

              <div v-if="form.currencies.length > 0" class="ed-currencies__table">
                <div class="ed-currencies__header">
                  <span>Currency</span>
                  <span class="ed-currencies__sep" aria-hidden="true">://</span>
                  <span>Address</span>
                  <span />
                </div>
                <div
                  v-for="(currency, index) in form.currencies"
                  :key="index"
                  class="ed-currencies__row"
                >
                  <DropdownCurrency
                    :model-value="currency.abbreviation"
                    @update:model-value="(v) => onCurrencyPick(index, v)"
                  />
                  <span class="ed-currencies__sep" aria-hidden="true">://</span>
                  <input type="text" v-model="currency.address" placeholder="Wallet address" class="ed-input ed-input--sm" />
                  <button type="button" class="ed-remove-btn" aria-label="Remove currency" @click="removeCurrency(index)">
                    <Trash2 :size="13" />
                  </button>
                </div>
              </div>

              <p v-else class="ed-currencies__empty">No currencies added yet.</p>
            </div>

          </form>
        </div>

        <Separator class="ed-separator" />

        <!-- Footer -->
        <div class="ed-footer">
          <button type="button" class="ed-btn ed-btn--ghost" @click="close">Cancel</button>
          <button type="button" class="ed-btn ed-btn--primary" @click="saveExchange">
            {{ isEditing ? 'Save Changes' : 'Add Exchange' }}
          </button>
        </div>

      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose,
  Separator,
} from 'radix-vue'
import { Plus, Trash2, Coins } from 'lucide-vue-next'
import DropdownExchanges from '@/components/dropdown/dropdown.exchanges.vue'
import DropdownCurrency from '@/components/dropdown/dropdown.currency.vue'

defineOptions({ name: 'ModalExchangeDetails' })

interface Currency {
  name: string
  abbreviation: string
  address: string
}

interface Exchange {
  id?: number
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: Currency[]
  email: string
}

const props = defineProps<{ exchange: Exchange | null }>()
const emit = defineEmits<{ close: []; 'exchange-saved': [exchange: Exchange] }>()

const dialogOpen = computed(() => !!props.exchange)

function onDialogOpen(open: boolean) { if (!open) close() }

/**
 * Radix Vue's DialogContent auto-closes on any pointerdown outside its DOM
 * subtree. The exchange dropdown Teleports its option list to <body>, which
 * is outside DialogContent, so selecting an option triggers a close. Ignore
 * those interactions here.
 */
function onInteractOutside(event: Event) {
  const target = event.target as HTMLElement | null
  if (!target) return
  if (
    target.closest('.ex-dropdown-portal') ||
    target.closest('.ex-dropdown') ||
    target.closest('.currency-dropdown-portal') ||
    target.closest('.custom-select-wrapper')
  ) {
    event.preventDefault()
  }
}

const isEditing = ref(false)
const form = ref<Exchange>({ name: '', url: '', referralUrl: '', referralCode: '', currencies: [], email: '' })

watch(
  () => props.exchange,
  (ex) => {
    if (ex) {
      isEditing.value = true
      form.value = JSON.parse(JSON.stringify(ex))
    } else {
      isEditing.value = false
      form.value = { name: '', url: '', referralUrl: '', referralCode: '', currencies: [], email: '' }
    }
  },
  { immediate: true, deep: true },
)

function addCurrencyRow() {
  form.value.currencies.push({ name: '', abbreviation: '', address: '' })
}

function removeCurrency(index: number) {
  form.value.currencies.splice(index, 1)
}

/**
 * Keep `name` and `abbreviation` in sync with the ticker chosen from
 * DropdownCurrency so downstream consumers that expect either field still
 * work.
 */
function onCurrencyPick(index: number, value: string) {
  const row = form.value.currencies[index]
  if (!row) return
  row.abbreviation = value
  row.name = value
}

function onExchangePick(payload: { key: string; label: string; website: string }) {
  if (payload.website) {
    form.value.url = payload.website
  }
}

function saveExchange() {
  if (!form.value.name?.trim()) return
  emit('exchange-saved', form.value)
  close()
}

function close() { emit('close') }
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────── */
.ed-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9000;
  animation: ed-fade 0.15s ease;
}

@keyframes ed-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Modal shell ─────────────────────────────────────────── */
.ed-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9001;
  width: min(95vw, 42rem);
  max-height: 88vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ed-pop 0.18s ease;
}

@keyframes ed-pop {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* ── Header ──────────────────────────────────────────────── */
.ed-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.ed-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.ed-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.ed-header__close {
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

/* ── Separators ──────────────────────────────────────────── */
.ed-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body ────────────────────────────────────────────────── */
.ed-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.125rem 1.25rem 0;
}

/* ── Form ────────────────────────────────────────────────── */
.ed-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ed-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.ed-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ed-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.ed-input {
  width: 100%;
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;

  &::placeholder { color: #9ca3af; }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
}

.ed-input--sm {
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
}

/* ── Currencies ──────────────────────────────────────────── */
.ed-currencies {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* pull heading flush with body edges to span full width like a tab bar */
  margin: 0 -1.25rem;
}

.ed-currencies__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.25rem;
}

.ed-currencies__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 0.85rem 0.65rem 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #2563eb;
  position: relative;

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

.ed-currencies__tab-icon {
  flex-shrink: 0;
}

.ed-badge {
  background: #e5e7eb;
  color: #374151;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.4;
}

.ed-currencies__table {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
  margin: 0 1.25rem;
}

.ed-currencies__header {
  display: grid;
  grid-template-columns: 1fr auto 2fr 2rem;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #4b5563;
}

.ed-currencies__row {
  display: grid;
  grid-template-columns: 1fr auto 2fr 2rem;
  gap: 0.5rem;
  align-items: center;
  padding: 0.3rem 1rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child { border-bottom: none; }
}

.ed-currencies__sep {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
  color: #9ca3af;
  user-select: none;
}

.ed-currencies__empty {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
  padding: 0.75rem 1.25rem;
}

.ed-remove-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #9ca3af;
  transition: background 0.12s, color 0.12s;

  &:hover { background: #fee2e2; color: #ef4444; }
}

/* ── Footer ──────────────────────────────────────────────── */
.ed-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
}

.ed-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.45rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}

.ed-btn--sm {
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
}

.ed-btn--ghost {
  background: transparent;
  border-color: #d1d5db;
  color: #374151;
  &:hover { background: #f3f4f6; }
}

.ed-btn--primary {
  background: #2563eb;
  color: #fff;
  &:hover { background: #1d4ed8; }
}
</style>
