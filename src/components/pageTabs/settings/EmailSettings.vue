<template>
  <div class="email-settings">
    <div class="email-settings-header">
      <h3 class="email-settings-title">Email Configuration</h3>
      <p class="email-settings-desc">
        Fill out this form to set up email delivery for your account. Use OAuth for Gmail or configure SMTP manually.
      </p>
    </div>

    <TabsRoot v-model="activeTab" class="email-tabs" default-value="oauth">
      <TabsList class="email-tabs-list" aria-label="Email configuration method">
        <TabsTrigger value="oauth" class="email-tabs-trigger">
          <i class="bi bi-google"></i> OAuth
        </TabsTrigger>
        <TabsTrigger value="smtp" class="email-tabs-trigger">
          <i class="bi bi-envelope"></i> SMTP
        </TabsTrigger>
      </TabsList>

      <!-- OAuth Tab -->
      <TabsContent value="oauth" class="email-tabs-content">
        <div class="email-oauth-panel">
          <p class="email-oauth-desc">
            Connect to Google using OAuth 2.0 to securely send emails through Gmail.
          </p>
          <div class="email-oauth-actions">
            <button
              v-if="!isOauthEnabled"
              type="button"
              class="email-btn email-btn-connect"
              @click="initGoauthConnect"
            >
              <i class="bi bi-link-45deg"></i> Connect to Google
            </button>
            <template v-else>
              <button type="button" class="email-btn email-btn-disconnect" @click="initGoauthDisconnect">
                <i class="bi bi-x-circle"></i> Disconnect from Google
              </button>
              <button type="button" class="email-btn email-btn-test" @click="testEmailConfig">
                <i class="bi bi-send-check"></i> Test
              </button>
            </template>
          </div>
        </div>
      </TabsContent>

      <!-- SMTP Tab -->
      <TabsContent value="smtp" class="email-tabs-content">
        <div class="email-smtp-panel">
          <!-- Overlay when OAuth is active -->
          <div v-if="isOauthEnabled" class="email-smtp-overlay">
            <div class="email-smtp-overlay-content">
              <i class="bi bi-lock-fill email-smtp-overlay-icon"></i>
              <strong>To configure SMTP, disconnect your account from Google OAuth first.</strong>
              <span>You are currently connected with OAuth. Disconnect to enable manual SMTP configuration.</span>
            </div>
          </div>

          <div v-else class="email-smtp-form">
            <div class="email-form-grid">
              <div class="email-form-group">
                <label class="email-form-label">Email Address</label>
                <input
                  v-model="username"
                  type="email"
                  class="email-input"
                  placeholder="you@example.com"
                />
              </div>

              <div class="email-form-group email-form-group--password">
                <label class="email-form-label">Password</label>
                <div class="email-password-wrap">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="email-input"
                    placeholder="App password or account password"
                  />
                  <button
                    type="button"
                    class="email-password-toggle"
                    :title="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
            </div>

            <CollapsibleRoot v-model:open="showMoreConfiguration" class="email-collapsible">
              <CollapsibleTrigger class="email-collapsible-trigger" as-child>
                <button type="button" class="email-btn email-btn-secondary">
                  <i class="bi" :class="showMoreConfiguration ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                  {{ showMoreConfiguration ? 'Hide' : 'Show more' }} settings
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent class="email-collapsible-content">
                <div class="email-form-grid email-form-grid--advanced">
                  <div class="email-form-group">
                    <label class="email-form-label">Host SMTP</label>
                    <input v-model="host" type="text" class="email-input" placeholder="smtp.gmail.com" />
                  </div>
                  <div class="email-form-group">
                    <label class="email-form-label">Port</label>
                    <input v-model.number="port" type="number" class="email-input" placeholder="587" />
                  </div>
                  <div class="email-form-group">
                    <label class="email-form-label">Use TLS</label>
                    <select v-model="tls" class="email-select">
                      <option :value="true">Enable</option>
                      <option :value="false">Disabled</option>
                    </select>
                  </div>
                </div>
              </CollapsibleContent>
            </CollapsibleRoot>

            <div class="email-smtp-actions">
              <button type="button" class="email-btn email-btn-test" @click="testEmailConfig">
                <i class="bi bi-send-check"></i> Test
              </button>
              <button type="button" class="email-btn email-btn-save" @click="saveEmailConfig">
                <i class="bi bi-floppy"></i> Save
              </button>
            </div>
          </div>
        </div>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'radix-vue'

const STORAGE_PREFIX = 'sparkplate_email_'

const activeTab = ref<'oauth' | 'smtp'>('oauth')
const service = ref<string | null>(null)
const username = ref('')
const password = ref('')
const host = ref('')
const port = ref<number>(587)
const tls = ref(true)
const showMoreConfiguration = ref(false)
const showPassword = ref(false)

const isOauthEnabled = computed(() => service.value === 'gmail')

const SUPPORTED_MAILS = [
  { prefix: '@gmail.com', smtp: 'smtp.gmail.com', port: 465, tls: false },
  { prefix: '@yahoo.com', smtp: 'smtp.mail.yahoo.com', port: 465, tls: false },
  { prefix: '@outlook.com', smtp: 'smtp.office365.com', port: 587, tls: true },
] as const

function generateConfig() {
  const config = SUPPORTED_MAILS.find((m) => username.value.toLowerCase().endsWith(m.prefix))
  return config ?? null
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + 'config')
    if (!raw) return
    const data = JSON.parse(raw) as {
      service?: string | null
      username?: string
      password?: string
      host?: string
      port?: number
      tls?: boolean
    }
    if (data.service) service.value = data.service
    if (data.username != null) username.value = data.username
    if (data.password != null) password.value = data.password
    if (data.host != null) host.value = data.host
    if (data.port != null) port.value = data.port
    if (data.tls != null) tls.value = data.tls
  } catch { /* ignore */ }
}

function saveEmailConfig() {
  const payload: Record<string, unknown> = { service: service.value }
  if (activeTab.value === 'smtp') {
    payload.username = username.value
    payload.password = password.value
    payload.host = host.value
    payload.port = port.value
    payload.tls = tls.value
  }
  try {
    localStorage.setItem(STORAGE_PREFIX + 'config', JSON.stringify(payload))
    // TODO: wire to userSettings/updateEmailConfig when available
    alert('Email configuration saved.')
  } catch {
    alert('Unable to save.')
  }
}

async function initGoauthConnect() {
  try {
    // TODO: wire to window.emailService.initGmailOAuthConnect when available
    service.value = 'gmail'
    saveEmailConfig()
    alert('Connected to Google.')
  } catch (e) {
    alert((e as Error).message ?? 'Unable to connect.')
  }
}

async function initGoauthDisconnect() {
  try {
    // TODO: wire to emailClient.disconnectOAuth when available
    service.value = null
    saveEmailConfig()
    alert('Disconnected from Google.')
  } catch (e) {
    alert((e as Error).message ?? 'Unable to disconnect.')
  }
}

async function testEmailConfig() {
  try {
    // TODO: wire to EmailClientService.sendMail when available
    alert('Test email would be sent. Wire EmailClientService for real delivery.')
  } catch (e) {
    alert((e as Error).message ?? 'Unable to send test email.')
  }
}

watch(username, (val) => {
  if (!val) return
  const cfg = generateConfig()
  if (cfg) {
    host.value = cfg.smtp
    port.value = cfg.port
    tls.value = cfg.tls
  } else {
    showMoreConfiguration.value = true
  }
})

onMounted(() => {
  loadFromStorage()
  if (isOauthEnabled.value) activeTab.value = 'oauth'
})
</script>

<style lang="scss" scoped>
.email-settings {
  max-width: 640px;
}

.email-settings-header {
  margin-bottom: 1.5rem;
}

.email-settings-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.email-settings-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* ── Tabs ───────────────────────────────────────────────────────────────── */
.email-tabs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.email-tabs-list {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  width: fit-content;
}

.email-tabs-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover { color: #374151; }

  &[data-state='active'] {
    color: #1f2937;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
}

.email-tabs-content {
  margin: 0;
  outline: none;

  &[data-state='inactive'] { display: none; }
}

/* ── OAuth panel ─────────────────────────────────────────────────────────── */
.email-oauth-panel {
  padding: 1rem 0;
}

.email-oauth-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.email-oauth-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* ── SMTP panel ──────────────────────────────────────────────────────────── */
.email-smtp-panel {
  position: relative;
  padding: 1rem 0;
}

.email-smtp-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.92);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.email-smtp-overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  max-width: 340px;
  text-align: center;
  color: #4b5563;
  font-size: 0.9rem;

  strong { color: #374151; }
  span { font-size: 0.8rem; opacity: 0.9; }
}

.email-smtp-overlay-icon {
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

.email-smtp-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.email-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.email-form-grid--advanced {
  margin-top: 0.5rem;
}

.email-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.email-form-group--password {
  grid-column: span 2;
}

@media (min-width: 640px) {
  .email-form-group--password { grid-column: span 1; }
}

.email-form-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
}

.email-input,
.email-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &::placeholder { color: #9ca3af; }
}

.email-password-wrap {
  position: relative;
}

.email-password-wrap .email-input {
  padding-right: 2.5rem;
}

.email-password-toggle {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;

  &:hover { color: #374151; }
}

/* ── Collapsible ─────────────────────────────────────────────────────────── */
.email-collapsible-trigger {
  all: unset;
  cursor: pointer;
}

.email-collapsible-content {
  overflow: hidden;
}

.email-collapsible-content[data-state='open'] {
  animation: email-fade-in 0.18s ease;
}

@keyframes email-fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Buttons ────────────────────────────────────────────────────────────── */
.email-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.email-btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border-color: #e5e7eb;

  &:hover { background: #e5e7eb; }
}

.email-btn-connect {
  background: #2563eb;
  color: white;

  &:hover { background: #1d4ed8; }
}

.email-btn-disconnect {
  background: #dc2626;
  color: white;

  &:hover { background: #b91c1c; }
}

.email-btn-test {
  background: #4b5563;
  color: white;

  &:hover { background: #374151; }
}

.email-btn-save {
  background: #059669;
  color: white;

  &:hover { background: #047857; }
}

.email-smtp-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
