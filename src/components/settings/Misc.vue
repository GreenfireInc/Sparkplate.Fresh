<template>
  <div class="misc-settings">
    <h2 class="text-2xl font-bold mb-6">Miscellaneous Settings</h2>
    
    <div class="misc-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Application Preferences</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Dark Mode</p>
            <p class="text-sm text-gray-600">Switch to dark theme for better night viewing</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="appPrefs.darkMode" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Auto-save</p>
            <p class="text-sm text-gray-600">Automatically save your work</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="appPrefs.autoSave" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select 
            v-model="language"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select 
            v-model="timezone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
            <option value="CET">Central European Time</option>
          </select>
        </div>
      </div>
    </div>

    <div class="misc-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Data & Storage</h3>
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <p class="font-medium">Cache Size</p>
            <span class="text-sm text-gray-600">{{ cacheSize }} MB</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${(cacheSize / 100) * 100}%` }"></div>
          </div>
          <button class="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Clear Cache
          </button>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="font-medium mb-2">Export Data</p>
          <p class="text-sm text-gray-600 mb-4">Download a copy of your data</p>
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Export All Data
          </button>
        </div>
      </div>
    </div>

    <div class="misc-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Advanced</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Developer Mode</p>
            <p class="text-sm text-gray-600">Enable advanced debugging features</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="advanced.developerMode" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Beta Features</p>
            <p class="text-sm text-gray-600">Access experimental features (may be unstable)</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="advanced.betaFeatures" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save Settings
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Misc',
  setup() {
    const appPrefs = ref({
      darkMode: false,
      autoSave: true
    })

    const language = ref('en')
    const timezone = ref('UTC')
    const cacheSize = ref(45)

    const advanced = ref({
      developerMode: false,
      betaFeatures: false
    })

    return {
      appPrefs,
      language,
      timezone,
      cacheSize,
      advanced
    }
  }
})
</script>

<style lang="scss" scoped>
.misc-settings {
  .misc-section {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2rem;
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
</style> 