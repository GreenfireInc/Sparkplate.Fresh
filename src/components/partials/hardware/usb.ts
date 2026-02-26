/**
 * USB drives composable - fetches and formats connected USB drives for display.
 * Used by HardwareSettings.vue to show USB drive information.
 */
import { ref, onMounted } from 'vue'

export interface UsbDriveInfo {
  description: string
  size: number | null
  mountpoints: string[]
  isRemovable: boolean
}

const usbDrives = ref<UsbDriveInfo[]>([])
const usbDisplayValue = ref<string>('—')
const isLoading = ref(true)
const error = ref<string | null>(null)

function formatBytes(bytes: number, decimals = 0): string {
  if (!bytes || bytes <= 0) return 'Unknown'
  const kb = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(kb))
  return `${parseFloat((bytes / Math.pow(kb, i)).toFixed(dm))} ${sizes[i]}`
}

async function fetchUsbDrives(): Promise<void> {
  isLoading.value = true
  error.value = null
  try {
    const drives = await window.app.getUsbDrives()
    usbDrives.value = drives
    if (drives.length === 0) {
      usbDisplayValue.value = 'None connected'
    } else {
      usbDisplayValue.value = drives
        .map((d) => {
          const sizeStr = d.size ? formatBytes(d.size) : ''
          const mountStr = d.mountpoints.length ? ` (${d.mountpoints.join(', ')})` : ''
          return sizeStr ? `${d.description} - ${sizeStr}${mountStr}` : d.description
        })
        .join(' · ')
    }
  } catch (err) {
    console.error('Error fetching USB drives:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load'
    usbDisplayValue.value = '—'
  } finally {
    isLoading.value = false
  }
}

/**
 * Composable for USB drive data in HardwareSettings.
 * Call useUsbDrives() and use usbDisplayValue for the table cell.
 */
export function useUsbDrives() {
  onMounted(fetchUsbDrives)
  return {
    usbDrives,
    usbDisplayValue,
    isLoading,
    error,
    refresh: fetchUsbDrives,
  }
}
