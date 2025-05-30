<template>
  <div class="network-status">
    <div class="flex items-center space-x-2 p-3 rounded-lg" :class="statusClass">
      <div class="w-3 h-3 rounded-full" :class="indicatorClass"></div>
      <span class="text-sm font-medium">{{ statusText }}</span>
      <div class="ml-auto flex items-center space-x-2">
        <span class="text-xs text-gray-600">{{ connectionType }}</span>
        <button @click="checkConnection" class="text-xs underline hover:no-underline">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'NetworkStatus',
  setup() {
    const isOnline = ref(navigator.onLine)
    const connectionType = ref('Unknown')

    const statusText = computed(() => {
      return isOnline.value ? 'Connected' : 'Offline'
    })

    const statusClass = computed(() => {
      return isOnline.value 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    })

    const indicatorClass = computed(() => {
      return isOnline.value ? 'bg-green-500' : 'bg-red-500'
    })

    const checkConnection = () => {
      isOnline.value = navigator.onLine
      
      // Try to detect connection type if available
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        connectionType.value = connection.effectiveType || 'Unknown'
      } else {
        connectionType.value = isOnline.value ? 'Ethernet/WiFi' : 'None'
      }
    }

    onMounted(() => {
      checkConnection()
      
      // Listen for online/offline events
      window.addEventListener('online', checkConnection)
      window.addEventListener('offline', checkConnection)
    })

    return {
      isOnline,
      statusText,
      statusClass,
      indicatorClass,
      connectionType,
      checkConnection
    }
  }
})
</script>

<style lang="scss" scoped>
.network-status {
  margin-bottom: 1rem;
}
</style> 