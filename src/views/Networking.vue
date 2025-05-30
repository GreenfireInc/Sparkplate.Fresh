<template>
  <div class="view networking">
    <div class="content">
      <h1 class="text-3xl font-bold mb-8 text-center">Network Discovery</h1>
      <p class="text-lg mb-6 text-center text-gray-600">
        Discover other Sparkplate instances running on your local network
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Network Status</h3>
          <div class="status-item">
            <span class="label">Connection:</span>
            <span class="status connected">{{ networkStatus.connected ? 'Connected' : 'Disconnected' }}</span>
          </div>
          <div class="status-item">
            <span class="label">Local IP:</span>
            <span class="value">{{ networkStatus.localIP }}</span>
          </div>
          <div class="status-item">
            <span class="label">Port:</span>
            <span class="value">{{ networkStatus.port }}</span>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Discovery Controls</h3>
          <div class="space-y-3">
            <button 
              @click="startDiscovery" 
              :disabled="isScanning"
              class="btn btn-primary w-full"
            >
              {{ isScanning ? 'Scanning...' : 'Start Network Scan' }}
            </button>
            <button 
              @click="refreshInstances" 
              class="btn btn-secondary w-full"
            >
              Refresh List
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-xl font-semibold mb-4">Discovered Instances ({{ discoveredInstances.length }})</h3>
        
        <div v-if="discoveredInstances.length === 0" class="text-center py-8 text-gray-500">
          No Sparkplate instances found on the network.
          <br>Click "Start Network Scan" to search for instances.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="instance in discoveredInstances" 
            :key="instance.id"
            class="instance-card"
          >
            <div class="instance-header">
              <h4 class="font-semibold">{{ instance.name }}</h4>
              <span class="status-badge" :class="instance.online ? 'online' : 'offline'">
                {{ instance.online ? 'Online' : 'Offline' }}
              </span>
            </div>
            <div class="instance-details">
              <div class="detail-item">
                <span class="label">IP:</span>
                <span class="value">{{ instance.ip }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Port:</span>
                <span class="value">{{ instance.port }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Version:</span>
                <span class="value">{{ instance.version }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Last Seen:</span>
                <span class="value">{{ formatTime(instance.lastSeen) }}</span>
              </div>
            </div>
            <div class="instance-actions">
              <button 
                @click="connectToInstance(instance)" 
                class="btn btn-sm btn-primary"
                :disabled="!instance.online"
              >
                Connect
              </button>
              <button 
                @click="pingInstance(instance)" 
                class="btn btn-sm btn-secondary"
              >
                Ping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-xl font-semibold mb-4">Connection Log</h3>
        <div class="log-container">
          <div 
            v-for="(log, index) in connectionLog" 
            :key="index"
            class="log-entry"
            :class="log.type"
          >
            <span class="timestamp">{{ formatTime(log.timestamp) }}</span>
            <span class="message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
    // Simulate network discovery
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock discovered instances
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
  // Simulate connection attempt
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
.networking {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .status-item, .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #6b7280;
    }

    .value {
      color: #1f2937;
    }
  }

  .status.connected {
    color: #10b981;
    font-weight: 600;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s;
    border: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.btn-primary {
      background: #3b82f6;
      color: white;

      &:hover:not(:disabled) {
        background: #2563eb;
      }
    }

    &.btn-secondary {
      background: #e5e7eb;
      color: #374151;

      &:hover:not(:disabled) {
        background: #d1d5db;
      }
    }

    &.btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }

  .instance-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;

    .instance-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;

        &.online {
          background: #d1fae5;
          color: #065f46;
        }

        &.offline {
          background: #fee2e2;
          color: #991b1b;
        }
      }
    }

    .instance-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }

  .log-container {
    max-height: 300px;
    overflow-y: auto;
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;

    .log-entry {
      display: flex;
      gap: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e5e7eb;
      font-family: monospace;
      font-size: 0.875rem;

      &:last-child {
        border-bottom: none;
      }

      .timestamp {
        color: #6b7280;
        min-width: 80px;
      }

      &.info .message {
        color: #3b82f6;
      }

      &.success .message {
        color: #10b981;
      }

      &.warning .message {
        color: #f59e0b;
      }

      &.error .message {
        color: #ef4444;
      }
    }
  }
}
</style> 