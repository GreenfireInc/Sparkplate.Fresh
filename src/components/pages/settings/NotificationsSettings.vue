<template>
  <div class="notifications-settings">
    <h3 class="text-lg font-semibold mb-4">Notification Settings</h3>
    
    <div class="space-y-4">
      <div class="flex items-center">
        <input id="enable-notifications" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
        <label for="enable-notifications" class="ml-2 block text-sm text-gray-900">
          Enable all notifications
        </label>
      </div>
      
      <div class="pl-6 space-y-4">
        <div class="flex items-center">
          <input id="updates-notifications" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
          <label for="updates-notifications" class="ml-2 block text-sm text-gray-900">
            Application updates
          </label>
        </div>
        
        <div class="flex items-center">
          <input id="security-notifications" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked>
          <label for="security-notifications" class="ml-2 block text-sm text-gray-900">
            Security alerts
          </label>
        </div>
        
        <div class="flex items-center">
          <input id="backup-notifications" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
          <label for="backup-notifications" class="ml-2 block text-sm text-gray-900">
            Backup reminders
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsSettings'
}
</script> 