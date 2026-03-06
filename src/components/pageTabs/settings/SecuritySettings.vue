<!--
Contributors: Aciel Ochoa

Description: This component is imported into the settings view to handle
  rendering the Security tab. Structured after Greenery Security with
  radix-vue for styling.
-->

<template>
  <div class="security-settings">
    <h2 class="security-title">Security Settings</h2>

    <div class="security-layout">
      <!-- Two Factor Authentication -->
      <div class="security-section">
        <h3 class="security-section-title">Two Factor Authentication</h3>
        <div class="security-section-content">
          <figure v-if="!mfaEnabled" class="security-qr-figure">
            <div class="security-qr-placeholder" />
            <figcaption class="security-qr-caption">
              Set up your authenticator app before enabling 2FA. We recommend using
              <em>Google Authenticator</em>.
            </figcaption>
          </figure>
          <div class="security-row security-row--inline">
            <Label for="mfa-enabled" class="security-row-title">Enable</Label>
            <label class="security-toggle">
              <input id="mfa-enabled" type="checkbox" v-model="mfaEnabled" class="sr-only" />
              <span class="security-toggle-track" />
            </label>
            <button type="button" class="security-2fa-controls-btn" @click="twoFAControlsOpen = true">2FA Controls</button>
          </div>
        </div>
      </div>

      <!-- Misc Security -->
      <div class="security-section">
        <h3 class="security-section-title">Misc Security</h3>
        <div class="security-section-content">
          <div class="security-row">
            <div class="security-row-text">
              <Label for="analytics" class="security-row-title">Opt into Analytics</Label>
              <p class="security-row-desc">Allow anonymous usage data collection</p>
            </div>
            <label class="security-toggle">
              <input id="analytics" type="checkbox" v-model="optIntoAnalytics" class="sr-only" />
              <span class="security-toggle-track" />
            </label>
          </div>
          <Separator class="security-separator" />
          <div class="security-field">
            <Label for="idle-timeout" class="security-label">Set Idle Timeout (Seconds)</Label>
            <SelectRoot v-model="idleTimeout">
              <SelectTrigger id="idle-timeout" class="security-select-trigger" aria-label="Idle timeout">
                <SelectValue placeholder="Choose" />
                <i class="bi bi-chevron-down security-select-chevron" aria-hidden />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent class="security-select-content" position="popper" :side-offset="4">
                  <SelectViewport class="security-select-viewport">
                    <SelectItem value="10" class="security-select-item">
                      <SelectItemText>10</SelectItemText>
                    </SelectItem>
                    <SelectItem value="60" class="security-select-item">
                      <SelectItemText>60</SelectItemText>
                    </SelectItem>
                    <SelectItem value="180" class="security-select-item">
                      <SelectItemText>180</SelectItemText>
                    </SelectItem>
                    <SelectItem value="360" class="security-select-item">
                      <SelectItemText>360</SelectItemText>
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
          <Separator class="security-separator" />
          <div class="security-actions-grid">
            <button type="button" class="security-action-btn" @click="hdWalletManagementOpen = true">
              <span class="security-action-title">HD Wallet Management</span>
              <span class="security-action-desc">Reveal seed phrase or backup private keys</span>
            </button>
            <button type="button" class="security-action-btn" @click="passwordManagementOpen = true">
              <span class="security-action-title">Password Management</span>
              <span class="security-action-desc">Reveal or reset your account password</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <HDWalletManagement
      v-model="hdWalletManagementOpen"
      @reveal-h-d-wallet="revealHDWallet"
      @backup-private-keys="backupPrivateKeys"
    />
    <PasswordManagement
      v-model="passwordManagementOpen"
      @reveal-password="revealPassword"
      @reset-password="resetPassword"
    />
    <TwoFactorAuthControls
      v-model="twoFAControlsOpen"
      v-model:mfa-require-on-login="mfaRequireOnLogin"
      v-model:mfa-require-on-sign-invoice="mfaRequireOnSignInvoice"
      v-model:mfa-require-on-email-invoice="mfaRequireOnEmailInvoice"
      v-model:mfa-require-on-create-paper-wallet="mfaRequireOnCreatePaperWallet"
      v-model:mfa-require-on-dashboard-send="mfaRequireOnDashboardSend"
      v-model:mfa-require-on-quick-exchange="mfaRequireOnQuickExchange"
      v-model:mfa-require-on-web3-requests="mfaRequireOnWeb3Requests"
      :mfa-enabled="mfaEnabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
  Separator,
} from 'radix-vue'
import TwoFactorAuthControls from '@/components/modals/settings/security/TwoFactorAuthControls.vue'
import PasswordManagement from '@/components/modals/settings/security/PasswordManagement.vue'
import HDWalletManagement from '@/components/modals/settings/security/HDWalletManagement.vue'

const mfaEnabled = ref(false)
const twoFAControlsOpen = ref(false)
const passwordManagementOpen = ref(false)
const hdWalletManagementOpen = ref(false)
const mfaRequireOnLogin = ref(false)
const mfaRequireOnSignInvoice = ref(false)
const mfaRequireOnEmailInvoice = ref(false)
const mfaRequireOnCreatePaperWallet = ref(false)
const mfaRequireOnDashboardSend = ref(false)
const mfaRequireOnQuickExchange = ref(false)
const mfaRequireOnWeb3Requests = ref(false)

const optIntoAnalytics = ref(false)
const idleTimeout = ref('60')

function revealHDWallet() {
  console.log('Reveal HD Wallet clicked')
}

function revealPassword() {
  console.log('Reveal Password clicked')
}

function resetPassword() {
  console.log('Reset Password clicked')
}

function backupPrivateKeys() {
  console.log('Backup Private Keys clicked')
}
</script>

<style lang="scss" scoped>
.security-settings {
  width: 100%;
}

.security-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

.security-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.security-section {
  flex: 1;
  min-width: 280px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.security-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.security-section-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.security-qr-figure {
  margin: 0 0 1rem;
  text-align: center;
}

.security-qr-placeholder {
  width: 200px;
  height: 200px;
  margin: 0 auto 0.5rem;
  background: #e5e7eb;
  border-radius: 0.375rem;
}

.security-qr-caption {
  font-size: 0.8125rem;
  color: #6b7280;
  max-width: 16rem;
  margin: 0 auto;
  line-height: 1.4;
}

.security-row--inline .security-2fa-controls-btn {
  margin-top: 0;
}

.security-2fa-controls-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;
}

.security-2fa-controls-btn:hover {
  background: #2563eb;
}

.security-2fa-controls-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}

.security-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.5rem;
}

.security-row-text {
  flex: 1;
  min-width: 0;
}

.security-row-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.security-row-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.security-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.75rem 0;
}

.security-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.security-toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.security-toggle-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #d1d5db;
  transition: background 0.2s;
  border: none;
}

.security-toggle-track::after {
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

.security-toggle input:checked + .security-toggle-track {
  background: #3b82f6;
}

.security-toggle input:checked + .security-toggle-track::after {
  transform: translateX(1.25rem);
}

.security-toggle input:focus-visible + .security-toggle-track {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}

.security-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.security-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.security-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.security-select-trigger:hover {
  border-color: #9ca3af;
}

.security-select-trigger[data-state='open'] {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.security-select-chevron {
  font-size: 0.75rem;
  color: #6b7280;
  pointer-events: none;
  transition: transform 0.15s;
}

.security-select-trigger[data-state='open'] .security-select-chevron {
  transform: rotate(180deg);
}

.security-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.security-action-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s;
}

.security-action-btn:hover {
  background: #f9fafb;
  border-color: #3b82f6;
}

.security-action-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.security-action-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.security-action-desc {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
</style>

<!-- Unscoped: SelectContent portals to body -->
<style>
.security-select-content {
  z-index: 10000;
  min-width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -3px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  animation: security-select-in 0.12s ease;
}

@keyframes security-select-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.security-select-viewport {
  padding: 0;
}

.security-select-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.security-select-item[data-highlighted] {
  background: #eff6ff;
  color: #1d4ed8;
}

.security-select-item[data-state='checked'] {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}
</style>
