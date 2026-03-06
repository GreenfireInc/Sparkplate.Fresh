<!--
2FA Controls modal — configure when 2FA is required (login, signing invoices, etc.).
-->

<template>
  <DialogRoot :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogPortal>
      <DialogOverlay class="mfa-controls-overlay" />
      <DialogContent class="mfa-controls-content" :aria-describedby="undefined">
        <DialogTitle class="mfa-controls-title">
          <span>2FA Controls</span>
          <button type="button" class="mfa-controls-close" aria-label="Close" @click="emit('update:modelValue', false)">
            <i class="bi bi-x-lg" aria-hidden />
          </button>
        </DialogTitle>
        <div class="mfa-controls-body">
          <div class="mfa-controls-row">
            <Label for="mfa-login-modal" class="mfa-controls-row-title">Login</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-login-modal" type="checkbox" :checked="mfaRequireOnLogin" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnLogin', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-sign-invoice-modal" class="mfa-controls-row-title">Signing Invoices</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-sign-invoice-modal" type="checkbox" :checked="mfaRequireOnSignInvoice" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnSignInvoice', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-email-invoice-modal" class="mfa-controls-row-title">Email Invoices</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-email-invoice-modal" type="checkbox" :checked="mfaRequireOnEmailInvoice" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnEmailInvoice', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-paperwallet-modal" class="mfa-controls-row-title">Creating Paperwallet Iterations</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-paperwallet-modal" type="checkbox" :checked="mfaRequireOnCreatePaperWallet" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnCreatePaperWallet', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-dashboard-send-modal" class="mfa-controls-row-title">Dashboard Sending</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-dashboard-send-modal" type="checkbox" :checked="mfaRequireOnDashboardSend" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnDashboardSend', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-quick-exchange-modal" class="mfa-controls-row-title">Quick Exchange</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-quick-exchange-modal" type="checkbox" :checked="mfaRequireOnQuickExchange" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnQuickExchange', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
          <Separator class="mfa-controls-separator" />
          <div class="mfa-controls-row">
            <Label for="mfa-web3-modal" class="mfa-controls-row-title">Web3 Requests</Label>
            <label class="mfa-controls-toggle" :class="{ 'mfa-controls-toggle--disabled': !mfaEnabled }">
              <input id="mfa-web3-modal" type="checkbox" :checked="mfaRequireOnWeb3Requests" class="sr-only" :disabled="!mfaEnabled" @change="emit('update:mfaRequireOnWeb3Requests', ($event.target as HTMLInputElement).checked)" />
              <span class="mfa-controls-toggle-track" />
            </label>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  Label,
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  Separator,
} from 'radix-vue'

defineProps<{
  modelValue: boolean
  mfaEnabled: boolean
  mfaRequireOnLogin: boolean
  mfaRequireOnSignInvoice: boolean
  mfaRequireOnEmailInvoice: boolean
  mfaRequireOnCreatePaperWallet: boolean
  mfaRequireOnDashboardSend: boolean
  mfaRequireOnQuickExchange: boolean
  mfaRequireOnWeb3Requests: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:mfaRequireOnLogin': [value: boolean]
  'update:mfaRequireOnSignInvoice': [value: boolean]
  'update:mfaRequireOnEmailInvoice': [value: boolean]
  'update:mfaRequireOnCreatePaperWallet': [value: boolean]
  'update:mfaRequireOnDashboardSend': [value: boolean]
  'update:mfaRequireOnQuickExchange': [value: boolean]
  'update:mfaRequireOnWeb3Requests': [value: boolean]
}>()
</script>

<style scoped>
.mfa-controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.5rem;
}

.mfa-controls-row-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.mfa-controls-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.75rem 0;
}

.mfa-controls-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.mfa-controls-toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.mfa-controls-toggle-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #d1d5db;
  transition: background 0.2s;
  border: none;
}

.mfa-controls-toggle-track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.mfa-controls-toggle input:checked + .mfa-controls-toggle-track {
  background: #3b82f6;
}

.mfa-controls-toggle input:checked + .mfa-controls-toggle-track::after {
  transform: translateX(1.25rem);
}

.mfa-controls-toggle input:focus-visible + .mfa-controls-toggle-track {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}
</style>

<!-- Unscoped: Dialog portals to body -->
<style>
.mfa-controls-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.mfa-controls-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 2rem;
  min-width: 360px;
  max-width: 90vw;
  z-index: 9999;
}

.mfa-controls-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.mfa-controls-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.15s, background 0.15s;
}

.mfa-controls-close:hover {
  color: #111827;
  background: #f3f4f6;
}

.mfa-controls-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
