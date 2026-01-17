<template>
  <div class="backup-settings">
    <h3 class="text-lg font-semibold mb-4">Backup & Restore</h3>
    
    <div class="space-y-6">
      <div class="p-4 border rounded-lg">
        <h4 class="font-semibold mb-2">Create Backup</h4>
        <p class="text-sm text-gray-600 mb-4">Create a backup of your application data. The backup file will be encrypted with your password.</p>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create Backup
        </button>
      </div>
      
      <div class="p-4 border rounded-lg">
        <h4 class="font-semibold mb-2">Restore from Backup</h4>
        <p class="text-sm text-gray-600 mb-4">Restore your application data from a backup file. This will overwrite your current data.</p>
        <input type="file" id="backup-file" class="hidden" />
        <label for="backup-file" class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Choose Backup File
        </label>
      </div>
      
      <div class="flex items-center">
        <input id="auto-backup" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
        <label for="auto-backup" class="ml-2 block text-sm text-gray-900">
          Enable automatic backups
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackupSettings'
}
</script> 