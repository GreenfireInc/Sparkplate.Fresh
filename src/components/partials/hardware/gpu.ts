/**
 * GPU composable - fetches GPU info for display.
 * Used by HardwareSettings.vue to show GPU information.
 */
import { ref, onMounted } from 'vue'

const gpuDisplayValue = ref<string>('—')
const isLoading = ref(true)
const error = ref<string | null>(null)

async function fetchGpuInfo(): Promise<void> {
  isLoading.value = true
  error.value = null
  try {
    const res = await window.app.getGPUInfo()
    if (res?.auxAttributes?.glRenderer) {
      gpuDisplayValue.value = res.auxAttributes.glRenderer
    } else if (res?.gpuDevice?.[0]?.deviceName) {
      gpuDisplayValue.value = res.gpuDevice[0].deviceName
    } else {
      gpuDisplayValue.value = '—'
    }
  } catch (err) {
    console.error('Error fetching GPU info:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load'
    gpuDisplayValue.value = '—'
  } finally {
    isLoading.value = false
  }
}

/**
 * Composable for GPU data in HardwareSettings.
 * Call useGpu() and use gpuDisplayValue for the table cell.
 */
export function useGpu() {
  onMounted(fetchGpuInfo)
  return {
    gpuDisplayValue,
    isLoading,
    error,
    refresh: fetchGpuInfo,
  }
}
