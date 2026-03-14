<template>
  <div class="net-view">
    <div class="net-content">
      <h1 class="net-title">Network Discovery</h1>
      <p class="net-subtitle">
        Discover other Sparkplate instances running on your local network
      </p>

      <div class="net-grid net-grid--top">
        <div class="net-card">
          <h3 class="net-card-header">Network Status</h3>
          <div class="net-card-row">
            <div class="net-card-main">
              <NetworkStatus :vertical="true" :showLocalIp="true" :showPublicIp="true" :showCountry="false" />
            </div>
            <div class="net-machine">
              <div class="net-machine-icon-wrap">
                <i class="bi bi-pc-display net-machine-icon" aria-hidden />
              </div>
              <p class="net-machine-prompt">{{ machinePrompt }}</p>
            </div>
          </div>
        </div>

        <div class="net-card">
          <h3 class="net-card-header">Discovery Controls</h3>
          <div class="net-actions">
            <button
              type="button"
              class="net-btn net-btn--primary"
              :disabled="isScanning"
              @click="startDiscovery"
            >
              {{ isScanning ? 'Scanning...' : 'Start Network Scan' }}
            </button>
            <button
              type="button"
              class="net-btn net-btn--secondary"
              @click="refreshInstances"
            >
              Refresh List
            </button>
          </div>
        </div>
      </div>

      <div class="net-card">
        <h3 class="net-card-header">Discovered Instances ({{ discoveredInstances.length }})</h3>

        <div v-if="discoveredInstances.length === 0" class="net-empty">
          <p>No Sparkplate instances found on the network.</p>
          <p>Click "Start Network Scan" to search for instances.</p>
        </div>

        <div v-else class="net-grid net-grid--instances">
          <div
            v-for="instance in discoveredInstances"
            :key="instance.id"
            class="net-instance"
          >
            <div class="net-instance-header">
              <h4 class="net-instance-name">{{ instance.name }}</h4>
              <span class="net-instance-badge" :class="instance.online ? 'net-instance-badge--online' : 'net-instance-badge--offline'">
                {{ instance.online ? 'Online' : 'Offline' }}
              </span>
            </div>
            <div class="net-instance-details">
              <div class="net-instance-row">
                <span class="net-instance-label">IP:</span>
                <span class="net-instance-value">{{ instance.ip }}</span>
              </div>
              <div class="net-instance-row">
                <span class="net-instance-label">Port:</span>
                <span class="net-instance-value">{{ instance.port }}</span>
              </div>
              <div class="net-instance-row">
                <span class="net-instance-label">Version:</span>
                <span class="net-instance-value">{{ instance.version }}</span>
              </div>
              <div class="net-instance-row">
                <span class="net-instance-label">Last Seen:</span>
                <span class="net-instance-value">{{ formatTime(instance.lastSeen) }}</span>
              </div>
            </div>
            <div class="net-instance-actions">
              <button
                type="button"
                class="net-btn net-btn--sm net-btn--primary"
                :disabled="!instance.online"
                @click="connectToInstance(instance)"
              >
                Connect
              </button>
              <button
                type="button"
                class="net-btn net-btn--sm net-btn--secondary"
                @click="pingInstance(instance)"
              >
                Ping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="net-card">
        <h3 class="net-card-header">Connection Log</h3>
        <div class="net-log">
          <div
            v-for="(log, index) in connectionLog"
            :key="index"
            class="net-log-entry"
            :class="`net-log-entry--${log.type}`"
          >
            <span class="net-log-time">{{ formatTime(log.timestamp) }}</span>
            <span class="net-log-msg">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NetworkStatus from '@/components/global/NetworkStatus.vue'

defineOptions({ name: 'Networking' })

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

const networkStatus = ref({
  connected: true,
  localIP: '192.168.1.100',
  port: 3344
})

const isScanning = ref(false)
const discoveredInstances = ref<NetworkInstance[]>([])
const connectionLog = ref<LogEntry[]>([])

const addLog = (type: LogEntry['type'], message: string) => {
  connectionLog.value.unshift({
    timestamp: new Date(),
    type,
    message
  })
  if (connectionLog.value.length > 50) {
    connectionLog.value = connectionLog.value.slice(0, 50)
  }
}

const startDiscovery = async () => {
  isScanning.value = true
  addLog('info', 'Starting network discovery...')

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockInstances: NetworkInstance[] = [
      {
        id: '1',
        name: 'Sparkplate-Dev',
        ip: '192.168.1.101',
        port: 3344,
        version: '2.0.0',
        online: true,
        lastSeen: new Date()
      },
      {
        id: '2',
        name: 'Sparkplate-Test',
        ip: '192.168.1.102',
        port: 3345,
        version: '1.9.5',
        online: true,
        lastSeen: new Date(Date.now() - 60000)
      }
    ]

    discoveredInstances.value = mockInstances
    addLog('success', `Discovery complete. Found ${mockInstances.length} instances.`)
  } catch (error) {
    addLog('error', 'Network discovery failed: ' + (error as Error).message)
  } finally {
    isScanning.value = false
  }
}

const refreshInstances = () => {
  addLog('info', 'Refreshing instance list...')
  discoveredInstances.value.forEach(instance => {
    instance.lastSeen = new Date()
  })
  addLog('success', 'Instance list refreshed.')
}

const connectToInstance = (instance: NetworkInstance) => {
  addLog('info', `Attempting to connect to ${instance.name} (${instance.ip}:${instance.port})...`)
  setTimeout(() => {
    if (Math.random() > 0.3) {
      addLog('success', `Successfully connected to ${instance.name}`)
    } else {
      addLog('error', `Failed to connect to ${instance.name}`)
    }
  }, 1000)
}

const pingInstance = (instance: NetworkInstance) => {
  addLog('info', `Pinging ${instance.name}...`)
  setTimeout(() => {
    const latency = Math.floor(Math.random() * 100) + 10
    addLog('success', `Ping to ${instance.name}: ${latency}ms`)
  }, 500)
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString()
}

onMounted(() => {
  addLog('info', 'Network discovery module initialized')
})
</script>

<style lang="scss" scoped>
.net-view {
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
  min-height: 0;
  background: #fff;
}

.net-content {
  max-width: 64rem;
  margin: 0 auto;
}

.net-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 0.5rem;
  color: #1f2937;
}

.net-subtitle {
  font-size: 1rem;
  text-align: center;
  margin: 0 0 1.5rem;
  color: #6b7280;
}

/* ── Cards ───────────────────────────────────────────────────────────────── */
.net-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.net-card-header {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #1f2937;
}

.net-card-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
}

.net-card-main {
  flex: 1;
  min-width: 0;
}

.net-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.net-machine-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.net-machine-icon {
  font-size: 1.75rem;
  color: #6b7280;
}

.net-machine-prompt {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  word-break: break-all;
}

/* ── Grid ─────────────────────────────────────────────────────────────────── */
.net-grid {
  display: grid;
  gap: 1rem;
}

.net-grid--top {
  grid-template-columns: 1fr;
  margin-bottom: 1rem;
}

@media (min-width: 48rem) {
  .net-grid--top {
    grid-template-columns: 1fr 1fr;
  }
}

.net-grid--instances {
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .net-grid--instances {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 64rem) {
  .net-grid--instances {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.net-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.net-btn {
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--net-accent, #3b82f6);
    color: #fff;

    &:hover:not(:disabled) {
      background: var(--net-accent-hover, #2563eb);
    }
  }

  &--secondary {
    background: #e5e7eb;
    color: #374151;

    &:hover:not(:disabled) {
      background: #d1d5db;
    }
  }

  &--sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
}

/* ── Empty state ───────────────────────────────────────────────────────────── */
.net-empty {
  text-align: center;
  padding: 2rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;

  p {
    margin: 0 0 0.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* ── Instances ────────────────────────────────────────────────────────────── */
.net-instance {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
}

.net-instance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.net-instance-name {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.net-instance-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;

  &--online {
    background: #d1fae5;
    color: #065f46;
  }

  &--offline {
    background: #fee2e2;
    color: #991b1b;
  }
}

.net-instance-details {
  margin-bottom: 0.75rem;
}

.net-instance-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.8125rem;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
}

.net-instance-label {
  font-weight: 500;
  color: #6b7280;
}

.net-instance-value {
  color: #1f2937;
}

.net-instance-actions {
  display: flex;
  gap: 0.5rem;
}

/* ── Log ─────────────────────────────────────────────────────────────────── */
.net-log {
  max-height: 16rem;
  overflow-y: auto;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.75rem;
}

.net-log-entry {
  display: flex;
  gap: 1rem;
  padding: 0.375rem 0;
  font-family: ui-monospace, monospace;
  font-size: 0.8125rem;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
}

.net-log-time {
  flex-shrink: 0;
  min-width: 5rem;
  color: #6b7280;
}

.net-log-msg {
  color: inherit;
}

.net-log-entry--info .net-log-msg {
  color: #2563eb;
}

.net-log-entry--success .net-log-msg {
  color: #059669;
}

.net-log-entry--warning .net-log-msg {
  color: #d97706;
}

.net-log-entry--error .net-log-msg {
  color: #dc2626;
}
</style>
