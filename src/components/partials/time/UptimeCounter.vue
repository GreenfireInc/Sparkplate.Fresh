<template>
  <li><b>Uptime:</b> {{ uptime }}</li>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const appStartTime = inject('appStartTime')
const uptime = ref('0:00:00')
let uptimeInterval = null

const updateUptime = () => {
  const now = Date.now()
  const startTime = appStartTime?.value || Date.now()
  const uptimeMs = now - startTime
  
  // Calculate hours, minutes, seconds
  const seconds = Math.floor((uptimeMs / 1000) % 60)
  const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60)
  const hours = Math.floor(uptimeMs / (1000 * 60 * 60))
  
  // Format as HH:MM:SS
  uptime.value = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  // Set up uptime counter
  updateUptime()
  uptimeInterval = setInterval(updateUptime, 1000)
})

onUnmounted(() => {
  // Clear the interval when component is destroyed
  if (uptimeInterval) {
    clearInterval(uptimeInterval)
  }
})
</script>
