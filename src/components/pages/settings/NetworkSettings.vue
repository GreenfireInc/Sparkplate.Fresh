<template>
  <div class="network-settings">
    <h3 class="text-lg font-semibold mb-4">Network Settings</h3>
    
    <div class="space-y-6">
      <div class="flex items-center">
        <input id="auto-detect-proxy" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
        <label for="auto-detect-proxy" class="ml-2 block text-sm text-gray-900">
          Automatically detect proxy settings
        </label>
      </div>

      <div>
        <label for="proxy-server" class="block text-sm font-medium text-gray-700">Proxy Server</label>
        <input type="text" id="proxy-server" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="e.g., http://127.0.0.1:8080">
      </div>
      
      <div>
        <label for="dns-server" class="block text-sm font-medium text-gray-700">Custom DNS Server</label>
        <input type="text" id="dns-server" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder="e.g., 8.8.8.8">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkSettings'
}
</script> 