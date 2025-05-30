<template>
  <div class="security-settings">
    <h2 class="text-2xl font-bold mb-6">Security Settings</h2>
    
    <div class="security-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Password</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input 
            type="password" 
            v-model="passwordForm.current"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input 
            type="password" 
            v-model="passwordForm.new"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>

        <div class="form-group md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input 
            type="password" 
            v-model="passwordForm.confirm"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <button class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Password
        </button>
      </div>
    </div>

    <div class="security-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <p class="font-medium">Enable 2FA</p>
          <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="twoFactorEnabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>

    <div class="security-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Session Management</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Current Session</p>
            <p class="text-sm text-gray-600">Chrome on Windows • Active now</p>
          </div>
          <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
        </div>
        
        <div class="flex justify-end">
          <button class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>

    <div class="security-section">
      <h3 class="text-lg font-semibold mb-4">Account Deletion</h3>
      <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-800 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SecuritySettings',
  setup() {
    const passwordForm = ref({
      current: '',
      new: '',
      confirm: ''
    })

    const twoFactorEnabled = ref(false)

    return {
      passwordForm,
      twoFactorEnabled
    }
  }
})
</script>

<style lang="scss" scoped>
.security-settings {
  .security-section {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2rem;
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
</style> 