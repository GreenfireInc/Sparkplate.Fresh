<template>
  <li><b>Date/Time:</b> {{ datetime }}</li>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

const datetime = ref('')
let datetimeInterval = null

// Get moment from Vue instance (injected globally)
const updateDateTime = () => {
  // Using the globally available moment from Vue
  if (window.moment) {
    datetime.value = window.moment().format('MMM Do, YYYY H:mm:ss')
  } else {
    // Fallback to native JS Date if moment isn't available
    const now = new Date()
    datetime.value = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
}

onMounted(() => {
  // Set initial time
  updateDateTime()
  // Update every second
  datetimeInterval = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  // Clear the interval when component is destroyed
  if (datetimeInterval) {
    clearInterval(datetimeInterval)
  }
})
</script>

