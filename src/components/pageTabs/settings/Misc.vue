<template>
  <div class="misc-settings">
    <h2 class="text-2xl font-bold mb-6">Miscellaneous Settings</h2>
    
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

    const advanced = ref({
      developerMode: false,
      betaFeatures: false
    })

    return {
      appPrefs,
      language,
      timezone,
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