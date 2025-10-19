<template>
  <li><b>GPU:</b> {{ gpu }}</li>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const gpu = ref('Loading...')

onMounted(() => {
  window.app.getGPUInfo()
    .then((res) => {
      console.log('GPU Info Response:', res)
      if (res && res.auxAttributes && res.auxAttributes.glRenderer) {
        gpu.value = res.auxAttributes.glRenderer
      } else if (res && res.gpuDevice && res.gpuDevice[0]) {
        // Try alternate path
        gpu.value = res.gpuDevice[0].deviceName || 'Unknown GPU'
      } else {
        gpu.value = 'GPU info unavailable'
      }
    })
    .catch((err) => {
      console.error('Error fetching GPU info:', err)
      gpu.value = 'Error loading GPU info'
    })
})
</script>

