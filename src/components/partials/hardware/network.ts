/**
 * Network adapters composable - fetches and formats network interface info for display.
 * Used by HardwareSettings.vue to show network adapter information.
 */
import { ref, onMounted } from 'vue'

export interface NetworkAdapterInfo {
  device: string
  manufacturer: string
  mac: string
  ipAddresses: string[]
}

const networkAdapters = ref<NetworkAdapterInfo[]>([])
const networkDisplayValue = ref<string>('—')
const isLoading = ref(true)
const error = ref<string | null>(null)

function formatAdapterLine(adapter: NetworkAdapterInfo): string {
  const parts: string[] = []
  const deviceLabel =
    adapter.manufacturer && adapter.manufacturer !== '—'
      ? `${adapter.device} (${adapter.manufacturer})`
      : adapter.device
  parts.push(deviceLabel)
  if (adapter.mac && adapter.mac !== '—') parts.push(`MAC: ${adapter.mac}`)
  if (adapter.ipAddresses.length) parts.push(`IP: ${adapter.ipAddresses.join(', ')}`)
  return parts.join(' · ')
}

async function fetchNetworkAdapters(): Promise<void> {
  isLoading.value = true
  error.value = null
  try {
    const adapters = await window.app.getNetworkAdapters()
    networkAdapters.value = adapters
    if (adapters.length === 0) {
      networkDisplayValue.value = 'None detected'
    } else {
      networkDisplayValue.value = adapters.map(formatAdapterLine).join(' | ')
    }
  } catch (err) {
    console.error('Error fetching network adapters:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load'
    networkDisplayValue.value = '—'
  } finally {
    isLoading.value = false
  }
}

/**
 * Composable for network adapter data in HardwareSettings.
 * Call useNetworkAdapters() and use networkDisplayValue for the table cell.
 */
export function useNetworkAdapters() {
  onMounted(fetchNetworkAdapters)
  return {
    networkAdapters,
    networkDisplayValue,
    isLoading,
    error,
    refresh: fetchNetworkAdapters,
  }
}
