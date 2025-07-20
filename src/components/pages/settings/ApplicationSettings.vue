<template>
  <div class="application-settings">
    <h3 class="text-lg font-semibold mb-4">Application Settings</h3>
    
    <div class="space-y-4">
      <div>
        <label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
        <select id="theme" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      
      <div>
        <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
        <select id="language" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
      
      <div class="flex items-center">
        <input id="auto-update" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
        <label for="auto-update" class="ml-2 block text-sm text-gray-900">
          Automatically check for updates
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationSettings'
}
</script> 