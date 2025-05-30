<template>
  <div class="email-settings">
    <h2 class="text-2xl font-bold mb-6">Email Settings</h2>
    
    <div class="email-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Email Preferences</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Marketing Emails</p>
            <p class="text-sm text-gray-600">Receive updates about new features and promotions</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="emailPrefs.marketing" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Security Alerts</p>
            <p class="text-sm text-gray-600">Get notified about important security events</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="emailPrefs.security" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Product Updates</p>
            <p class="text-sm text-gray-600">Stay informed about app updates and changes</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="emailPrefs.updates" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <div class="email-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Email Frequency</h3>
      <div class="space-y-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Notification Frequency
          </label>
          <select 
            v-model="emailFrequency"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Summary</option>
            <option value="monthly">Monthly Update</option>
          </select>
        </div>
      </div>
    </div>

    <div class="email-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Email Addresses</h3>
      <div class="space-y-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Primary Email
          </label>
          <div class="flex gap-2">
            <input 
              type="email" 
              v-model="primaryEmail"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="primary@example.com"
            />
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Verify
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Recovery Email
          </label>
          <div class="flex gap-2">
            <input 
              type="email" 
              v-model="recoveryEmail"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="recovery@example.com"
            />
            <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save Email Settings
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EmailSettings',
  setup() {
    const emailPrefs = ref({
      marketing: true,
      security: true,
      updates: false
    })

    const emailFrequency = ref('daily')
    const primaryEmail = ref('')
    const recoveryEmail = ref('')

    return {
      emailPrefs,
      emailFrequency,
      primaryEmail,
      recoveryEmail
    }
  }
})
</script>

<style lang="scss" scoped>
.email-settings {
  .email-section {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2rem;
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
</style> 