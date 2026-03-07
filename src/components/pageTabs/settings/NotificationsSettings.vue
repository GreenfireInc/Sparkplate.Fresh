<template>
  <div class="notifications-settings">
    <div class="notifications-header">
      <h3 class="notifications-title">Notification Settings</h3>
      <p class="notifications-desc">
        Control which notifications you receive. When minimized to the system tray, notifications will still pop up for enabled types.
      </p>
    </div>

    <TabsRoot v-model="activeTab" class="notifications-tabs" default-value="general">
      <TabsList class="notifications-tabs-list" aria-label="Notification categories">
        <TabsTrigger value="general" class="notifications-tabs-trigger">
          <i class="bi bi-gear"></i> General
        </TabsTrigger>
        <TabsTrigger value="currency" class="notifications-tabs-trigger">
          <i class="bi bi-currency-exchange"></i> Currency
        </TabsTrigger>
        <TabsTrigger value="display" class="notifications-tabs-trigger">
          <i class="bi bi-display"></i> Display
        </TabsTrigger>
      </TabsList>

      <!-- General Tab -->
      <TabsContent value="general" class="notifications-tabs-content">
        <div class="notifications-panel">
          <div class="notifications-section">
            <h4 class="notifications-section-title">Master Control</h4>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Enable all notifications</span>
                <span class="notifications-row-hint">Master switch for all notification types</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.enabled"
                class="notifications-switch"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
          </div>

          <div class="notifications-section">
            <h4 class="notifications-section-title">Notifications For</h4>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Application updates</span>
                <span class="notifications-row-hint">New versions and feature announcements</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.updates"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Security alerts</span>
                <span class="notifications-row-hint">Important security events</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.security"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Backup reminders</span>
                <span class="notifications-row-hint">Periodic backup prompts</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.backup"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
          </div>
        </div>
      </TabsContent>

      <!-- Currency Tab -->
      <TabsContent value="currency" class="notifications-tabs-content">
        <div class="notifications-panel">
          <div class="notifications-section">
            <h4 class="notifications-section-title">Currency Notifications</h4>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Currency coming in</span>
                <span class="notifications-row-hint">When funds arrive at a tracked wallet</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.currencyIncoming"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Major value changes</span>
                <span class="notifications-row-hint">Significant portfolio value movements</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.majorValueChanges"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Currency news</span>
                <span class="notifications-row-hint">Market and asset news</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.currencyNews"
                class="notifications-switch"
                :disabled="!prefs.enabled"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
          </div>

          <div class="notifications-section notifications-section--balance">
            <h4 class="notifications-section-title">Balance Update Format</h4>
            <p class="notifications-format-desc">
              Balance notifications use this format. Currency updates show the logo of the currency itself.
            </p>
            <div class="notifications-format-block">
              <code class="notifications-format-code">
                %ICON% %ticker%://%publicWalletAddress% +/-*.** (%BALANCE%) $(%VALUE%)
              </code>
            </div>
            <p class="notifications-format-example">
              Example message: <em>Balance updated from 10.50 by +2.25 to 12.75</em>
            </p>
          </div>
        </div>
      </TabsContent>

      <!-- Display Tab -->
      <TabsContent value="display" class="notifications-tabs-content">
        <div class="notifications-panel">
          <div class="notifications-section">
            <h4 class="notifications-section-title">Display Options</h4>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Show currency logo</span>
                <span class="notifications-row-hint">Display the currency icon in balance and value notifications</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.showCurrencyLogo"
                class="notifications-switch"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Auto-dismiss after 5 seconds</span>
                <span class="notifications-row-hint">Notifications disappear automatically</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.autoDismiss5s"
                class="notifications-switch"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
            <div class="notifications-row">
              <div class="notifications-row-text">
                <span class="notifications-row-label">Show when minimized to tray</span>
                <span class="notifications-row-hint">Pop up notifications even when app is in system tray</span>
              </div>
              <SwitchRoot
                v-model:checked="prefs.showWhenMinimized"
                class="notifications-switch"
                @update:checked="savePrefs"
              >
                <SwitchThumb class="notifications-switch-thumb" />
              </SwitchRoot>
            </div>
          </div>
        </div>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  SwitchRoot,
  SwitchThumb,
} from 'radix-vue'

const STORAGE_KEY = 'sparkplate_notification_prefs'

interface NotificationPrefs {
  enabled: boolean
  updates: boolean
  security: boolean
  backup: boolean
  currencyIncoming: boolean
  majorValueChanges: boolean
  currencyNews: boolean
  showCurrencyLogo: boolean
  autoDismiss5s: boolean
  showWhenMinimized: boolean
}

const defaultPrefs: NotificationPrefs = {
  enabled: true,
  updates: true,
  security: true,
  backup: false,
  currencyIncoming: true,
  majorValueChanges: true,
  currencyNews: false,
  showCurrencyLogo: true,
  autoDismiss5s: true,
  showWhenMinimized: true,
}

const prefs = reactive<NotificationPrefs>({ ...defaultPrefs })
const activeTab = ref('general')

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<NotificationPrefs>
      Object.assign(prefs, { ...defaultPrefs, ...parsed })
    }
  } catch {
    // keep defaults
  }
}

function savePrefs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
}

onMounted(loadPrefs)
</script>

<style lang="scss" scoped>
.notifications-settings {
  .notifications-header {
    margin-bottom: 1.5rem;
  }

  .notifications-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .notifications-desc {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
  }

  .notifications-tabs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notifications-tabs-list {
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    width: fit-content;
  }

  .notifications-tabs-trigger {
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
    transition: all 0.2s ease;

    &:hover {
      color: #374151;
      background: rgba(255, 255, 255, 0.7);
    }

    &[data-state='active'] {
      color: #3b82f6;
      background: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  }

  .notifications-tabs-content {
    outline: none;
  }

  .notifications-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .notifications-section {
    padding: 1rem;
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 0.5rem;

    &--balance {
      background: #fffbeb;
      border-color: #fef3c7;
    }
  }

  .notifications-section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.75rem 0;
  }

  .notifications-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-of-type {
      padding-top: 0;
    }
  }

  .notifications-row-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .notifications-row-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
  }

  .notifications-row-hint {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .notifications-switch {
    position: relative;
    width: 2.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    background: #d1d5db;
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s ease;

    &[data-state='checked'] {
      background: #22c55e;
    }

    &[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .notifications-switch-thumb {
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }

  .notifications-switch[data-state='checked'] .notifications-switch-thumb {
    transform: translateX(1rem);
  }

  .notifications-format-desc {
    font-size: 0.8125rem;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .notifications-format-block {
    padding: 0.75rem 1rem;
    background: #1f2937;
    border-radius: 0.375rem;
    margin-bottom: 0.5rem;
  }

  .notifications-format-code {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    color: #e5e7eb;
    word-break: break-all;
  }

  .notifications-format-example {
    font-size: 0.8125rem;
    color: #6b7280;
    margin: 0;
    font-style: normal;

    em {
      font-style: italic;
      color: #374151;
    }
  }
}
</style>
