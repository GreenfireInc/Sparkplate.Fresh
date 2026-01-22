<!--
Contributors: Aciel Ochoa

Description: This component is imported into the settings view to handle
  rendering the Security tab.
-->

<template>
  <div class="security-settings">
    <h2 class="text-xl font-bold mb-3">Misc Security</h2>
    
    <div class="space-y-3">
      <!-- Opt into Analytics -->
      <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <div>
          <p class="text-sm font-medium">Opt into Analytics</p>
          <p class="text-xs text-gray-600">Allow anonymous usage data collection</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="securitySettings.optIntoAnalytics" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <!-- Set Idle Timeout -->
      <div class="p-2 bg-gray-50 rounded-lg">
        <label class="block text-xs font-medium text-gray-700 mb-1">
          Set Idle Timeout (Seconds)
        </label>
        <input 
          type="number" 
          v-model="securitySettings.idleTimeout" 
          class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter timeout in seconds"
          min="0"
          max="300"
          step="30"
        />
      </div>

      <!-- Security Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <button 
          @click="revealHDWallet"
          class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-left transition-colors"
        >
          <p class="text-sm font-medium">Reveal HD Wallet</p>
          <p class="text-xs text-gray-600 mt-0.5">Display your HD wallet seed phrase</p>
        </button>

        <button 
          @click="revealPassword"
          class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-left transition-colors"
        >
          <p class="text-sm font-medium">Reveal Password</p>
          <p class="text-xs text-gray-600 mt-0.5">Show your current password</p>
        </button>

        <button 
          @click="resetPassword"
          class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-left transition-colors"
        >
          <p class="text-sm font-medium">Reset Password</p>
          <p class="text-xs text-gray-600 mt-0.5">Change your account password</p>
        </button>

        <button 
          @click="backupPrivateKeys"
          class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-left transition-colors"
        >
          <p class="text-sm font-medium">Backup Private Keys</p>
          <p class="text-xs text-gray-600 mt-0.5">Export your private keys securely</p>
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
    const securitySettings = ref({
      optIntoAnalytics: false,
      idleTimeout: 300
    })

    const revealHDWallet = () => {
      // TODO: Implement reveal HD wallet functionality
      console.log('Reveal HD Wallet clicked')
    }

    const revealPassword = () => {
      // TODO: Implement reveal password functionality
      console.log('Reveal Password clicked')
    }

    const resetPassword = () => {
      // TODO: Implement reset password functionality
      console.log('Reset Password clicked')
    }

    const backupPrivateKeys = () => {
      // TODO: Implement backup private keys functionality
      console.log('Backup Private Keys clicked')
    }

    return {
      securitySettings,
      revealHDWallet,
      revealPassword,
      resetPassword,
      backupPrivateKeys
    }
  }
})
</script>
