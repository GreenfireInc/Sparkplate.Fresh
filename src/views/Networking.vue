<template>
  <div class="nt-view">
    <header class="nt-view__header">
      <h1 class="nt-view__title">
        <Network :size="22" class="nt-view__title-icon" aria-hidden="true" />
        Network discovery
      </h1>
      <p class="nt-view__subtitle">
        Inspect local networking status, run discovery, and review instances and logs — fits the main panel; only tab content scrolls.
      </p>
    </header>

    <Separator class="nt-view__separator" />

    <section class="nt-view__section" aria-label="Network tools">
      <TabsRoot v-model="activeTab" class="nt-tabs">
        <TabsList class="nt-tabs__list" aria-label="Network sections">
          <TabsTrigger value="overview" class="nt-tabs__trigger">
            <Network :size="14" class="nt-tabs__icon" aria-hidden="true" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="instances" class="nt-tabs__trigger">
            <Server :size="14" class="nt-tabs__icon" aria-hidden="true" />
            Instances
            <span v-if="discoveredInstances.length" class="nt-tabs__badge">{{ discoveredInstances.length }}</span>
          </TabsTrigger>
          <TabsTrigger value="log" class="nt-tabs__trigger">
            <ScrollText :size="14" class="nt-tabs__icon" aria-hidden="true" />
            Log
            <span v-if="connectionLog.length" class="nt-tabs__badge nt-tabs__badge--muted">{{ connectionLog.length }}</span>
          </TabsTrigger>
        </TabsList>

        <div class="nt-panel-shell">
          <TabsContent value="overview" class="nt-tabs__panel">
            <div class="nt-scroll nt-scroll--pad">
              <div class="nt-grid nt-grid--top">
                <div class="nt-card">
                  <h3 class="nt-card-header">Network status</h3>
                  <div class="nt-card-row">
                    <div class="nt-card-main">
                      <NetworkStatus
                        :vertical="true"
                        :show-local-ip="true"
                        :show-public-ip="true"
                        :show-country="false"
                      />
                    </div>
                    <div class="nt-machine">
                      <div class="nt-machine-icon-wrap">
                        <Monitor :size="28" class="nt-machine-icon-lu" aria-hidden="true" />
                      </div>
                      <p class="nt-machine-prompt">{{ machinePrompt }}</p>
                    </div>
                  </div>
                </div>

                <div class="nt-card">
                  <h3 class="nt-card-header">Discovery controls</h3>
                  <div class="nt-actions">
                    <button
                      type="button"
                      class="nt-btn nt-btn--primary"
                      :disabled="isScanning"
                      @click="startDiscovery"
                    >
                      {{ isScanning ? 'Scanning…' : 'Start network scan' }}
                    </button>
                    <button
                      type="button"
                      class="nt-btn nt-btn--secondary"
                      @click="refreshInstances"
                    >
                      Refresh list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="instances" class="nt-tabs__panel">
            <div class="nt-scroll nt-scroll--pad">
              <div class="nt-card nt-card--flush">
                <h3 class="nt-card-header">Discovered instances ({{ discoveredInstances.length }})</h3>

                <div v-if="discoveredInstances.length === 0" class="nt-empty">
                  <p>No Sparkplate instances found on the network.</p>
                  <p>Use <strong>Start network scan</strong> on the Overview tab.</p>
                </div>

                <div v-else class="nt-grid nt-grid--instances">
                  <div
                    v-for="instance in discoveredInstances"
                    :key="instance.id"
                    class="nt-instance"
                  >
                    <div class="nt-instance-header">
                      <h4 class="nt-instance-name">{{ instance.name }}</h4>
                      <span
                        class="nt-instance-badge"
                        :class="instance.online ? 'nt-instance-badge--online' : 'nt-instance-badge--offline'"
                      >
                        {{ instance.online ? 'Online' : 'Offline' }}
                      </span>
                    </div>
                    <div class="nt-instance-details">
                      <div class="nt-instance-row">
                        <span class="nt-instance-label">IP</span>
                        <span class="nt-instance-value">{{ instance.ip }}</span>
                      </div>
                      <div class="nt-instance-row">
                        <span class="nt-instance-label">Port</span>
                        <span class="nt-instance-value">{{ instance.port }}</span>
                      </div>
                      <div class="nt-instance-row">
                        <span class="nt-instance-label">Version</span>
                        <span class="nt-instance-value">{{ instance.version }}</span>
                      </div>
                      <div class="nt-instance-row">
                        <span class="nt-instance-label">Last seen</span>
                        <span class="nt-instance-value">{{ formatTime(instance.lastSeen) }}</span>
                      </div>
                    </div>
                    <div class="nt-instance-actions">
                      <button
                        type="button"
                        class="nt-btn nt-btn--sm nt-btn--primary"
                        :disabled="!instance.online"
                        @click="connectToInstance(instance)"
                      >
                        Connect
                      </button>
                      <button
                        type="button"
                        class="nt-btn nt-btn--sm nt-btn--secondary"
                        @click="pingInstance(instance)"
                      >
                        Ping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="log" class="nt-tabs__panel">
            <div class="nt-log-panel">
              <div class="nt-card nt-card--flush nt-log-panel__card">
                <h3 class="nt-card-header">Connection log</h3>
                <div class="nt-log">
                  <div
                    v-for="(log, index) in connectionLog"
                    :key="index"
                    class="nt-log-entry"
                    :class="`nt-log-entry--${log.type}`"
                  >
                    <span class="nt-log-time">{{ formatTime(log.timestamp) }}</span>
                    <span class="nt-log-msg">{{ log.message }}</span>
                  </div>
                  <p v-if="connectionLog.length === 0" class="nt-log-empty">No log entries yet.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </TabsRoot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import { Network, Server, ScrollText, Monitor } from 'lucide-vue-next'
import NetworkStatus from '@/components/global/NetworkStatus.vue'

defineOptions({ name: 'Networking' })

const activeTab = ref<'overview' | 'instances' | 'log'>('overview')

const machinePrompt = computed(() => {
  const hostname = window.appData?.hostname ?? ''
  const username = window.appData?.username ?? ''
  if (!hostname && !username) return '—'
  return `${hostname}@${username}$`
})

interface NetworkInstance {
  id: string
  name: string
  ip: string
  port: number
  version: string
  online: boolean
  lastSeen: Date
}

interface LogEntry {
  timestamp: Date
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
}

const isScanning = ref(false)
const discoveredInstances = ref<NetworkInstance[]>([])
const connectionLog = ref<LogEntry[]>([])

const addLog = (type: LogEntry['type'], message: string) => {
  connectionLog.value.unshift({
    timestamp: new Date(),
    type,
    message,
  })
  if (connectionLog.value.length > 50) {
    connectionLog.value = connectionLog.value.slice(0, 50)
  }
}

const startDiscovery = async () => {
  isScanning.value = true
  addLog('info', 'Starting network discovery…')

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockInstances: NetworkInstance[] = [
      {
        id: '1',
        name: 'Sparkplate-Dev',
        ip: '192.168.1.101',
        port: 3344,
        version: '2.0.0',
        online: true,
        lastSeen: new Date(),
      },
      {
        id: '2',
        name: 'Sparkplate-Test',
        ip: '192.168.1.102',
        port: 3345,
        version: '1.9.5',
        online: true,
        lastSeen: new Date(Date.now() - 60000),
      },
    ]

    discoveredInstances.value = mockInstances
    addLog('success', `Discovery complete. Found ${mockInstances.length} instances.`)
    activeTab.value = 'instances'
  } catch (error) {
    addLog('error', `Network discovery failed: ${(error as Error).message}`)
  } finally {
    isScanning.value = false
  }
}

const refreshInstances = () => {
  addLog('info', 'Refreshing instance list…')
  discoveredInstances.value.forEach((instance) => {
    instance.lastSeen = new Date()
  })
  addLog('success', 'Instance list refreshed.')
}

const connectToInstance = (instance: NetworkInstance) => {
  addLog('info', `Attempting to connect to ${instance.name} (${instance.ip}:${instance.port})…`)
  activeTab.value = 'log'
  setTimeout(() => {
    if (Math.random() > 0.3) {
      addLog('success', `Successfully connected to ${instance.name}`)
    } else {
      addLog('error', `Failed to connect to ${instance.name}`)
    }
  }, 1000)
}

const pingInstance = (instance: NetworkInstance) => {
  addLog('info', `Pinging ${instance.name}…`)
  activeTab.value = 'log'
  setTimeout(() => {
    const latency = Math.floor(Math.random() * 100) + 10
    addLog('success', `Ping to ${instance.name}: ${latency}ms`)
  }, 500)
}

const formatTime = (date: Date) => date.toLocaleTimeString()

onMounted(() => {
  addLog('info', 'Network discovery module initialized')
})
</script>

<style lang="scss" scoped>
.nt-view {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem 1.25rem 0.75rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
  color: #111827;
}

.nt-view__header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.nt-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.nt-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.nt-view__subtitle {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  max-width: 44rem;
}

.nt-view__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0 0 0.5rem;
  background: #e5e7eb;
}

.nt-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  overflow: hidden;
}

.nt-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.nt-tabs__list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0.65rem;
  background: #f9fafb;
}

.nt-tabs__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

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
}

.nt-tabs__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.nt-tabs__badge {
  margin-left: 0.15rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
  background: #dbeafe;
  color: #1d4ed8;
  line-height: 1.4;

  &--muted {
    background: #e5e7eb;
    color: #4b5563;
  }
}

.nt-panel-shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.nt-tabs__panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(37, 99, 235, 0.35);
  }
}

.nt-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.nt-scroll--pad {
  padding: 0.65rem 0.85rem 0.85rem;
  box-sizing: border-box;
}

.nt-log-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.65rem 0.85rem 0.85rem;
  box-sizing: border-box;
  overflow: hidden;
}

.nt-log-panel__card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nt-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &--flush {
    margin: 0;
    height: 100%;
    min-height: 0;
  }
}

.nt-card-header {
  flex-shrink: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0 0 0.85rem;
  color: #111827;
}

.nt-card-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.25rem;
}

.nt-card-main {
  flex: 1;
  min-width: 0;
}

.nt-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.nt-machine-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nt-machine-icon-lu {
  color: #6b7280;
}

.nt-machine-prompt {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  word-break: break-all;
  text-align: center;
  max-width: 12rem;
}

.nt-grid {
  display: grid;
  gap: 0.85rem;
}

.nt-grid--top {
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .nt-grid--top {
    grid-template-columns: 1fr 1fr;
  }
}

.nt-grid--instances {
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .nt-grid--instances {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 64rem) {
  .nt-grid--instances {
    grid-template-columns: repeat(3, 1fr);
  }
}

.nt-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nt-btn {
  padding: 0.5rem 0.85rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: #2563eb;
    border-color: #2563eb;
    color: #fff;

    &:hover:not(:disabled) {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
  }

  &--secondary {
    background: #fff;
    border-color: #d1d5db;
    color: #374151;

    &:hover:not(:disabled) {
      background: #f9fafb;
    }
  }

  &--sm {
    padding: 0.35rem 0.65rem;
    font-size: 0.75rem;
  }
}

.nt-empty {
  text-align: center;
  padding: 1.5rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;

  p {
    margin: 0 0 0.35rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.nt-instance {
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.85rem;
}

.nt-instance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  gap: 0.5rem;
}

.nt-instance-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.nt-instance-badge {
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  flex-shrink: 0;

  &--online {
    background: #d1fae5;
    color: #065f46;
  }

  &--offline {
    background: #fee2e2;
    color: #991b1b;
  }
}

.nt-instance-details {
  margin-bottom: 0.6rem;
}

.nt-instance-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.75rem;
  gap: 0.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
}

.nt-instance-label {
  font-weight: 500;
  color: #6b7280;
}

.nt-instance-value {
  color: #111827;
  text-align: right;
  word-break: break-all;
}

.nt-instance-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.nt-log {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-top: 0.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 0.65rem;
}

.nt-log-empty {
  margin: 1rem 0;
  text-align: center;
  font-size: 0.8125rem;
  color: #9ca3af;
}

.nt-log-entry {
  display: flex;
  gap: 0.85rem;
  padding: 0.35rem 0;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
}

.nt-log-time {
  flex-shrink: 0;
  min-width: 4.75rem;
  color: #6b7280;
}

.nt-log-msg {
  color: inherit;
  word-break: break-word;
}

.nt-log-entry--info .nt-log-msg {
  color: #2563eb;
}

.nt-log-entry--success .nt-log-msg {
  color: #059669;
}

.nt-log-entry--warning .nt-log-msg {
  color: #d97706;
}

.nt-log-entry--error .nt-log-msg {
  color: #dc2626;
}
</style>
