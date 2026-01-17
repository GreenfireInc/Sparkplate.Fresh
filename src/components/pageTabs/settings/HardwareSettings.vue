<template>
  <div class="hardware-settings">
    <h3 class="text-lg font-semibold mb-4">Hardware Settings</h3>
    
    <div class="space-y-4">
      <div class="flex items-center">
        <input id="enable-hardware-acceleration" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
        <label for="enable-hardware-acceleration" class="ml-2 block text-sm text-gray-900">
          Enable hardware acceleration
        </label>
      </div>

      <div class="flex items-center">
        <input id="enable-gpu-rasterization" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
        <label for="enable-gpu-rasterization" class="ml-2 block text-sm text-gray-900">
          Enable GPU rasterization
        </label>
      </div>
      
      <div>
        <label for="gpu-memory" class="block text-sm font-medium text-gray-700">GPU Memory Limit (MB)</label>
        <input type="number" id="gpu-memory" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value="1024">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HardwareSettings'
}
</script> 