<template>
  <div class="view">
    <h1 class="view-name">::Cryptocurrency::</h1>
<br>

    <!-- Tab Navigation -->
    <div class="mb-4 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'border-blue-600 text-blue-600': activeTab === 'resolver',
              'hover:text-gray-600 hover:border-gray-300': activeTab !== 'resolver'
            }"
            @click="activeTab = 'resolver'"
            role="tab"
            aria-controls="resolver-content"
            :aria-selected="activeTab === 'resolver'"
          >
            Human Readable Addresses
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'border-blue-600 text-blue-600': activeTab === 'calculator',
              'hover:text-gray-600 hover:border-gray-300': activeTab !== 'calculator'
            }"
            @click="activeTab = 'calculator'"
            role="tab"
            aria-controls="calculator-content"
            :aria-selected="activeTab === 'calculator'"
          >
            Calculator
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div id="tabContent">
      <!-- Human Readable Addresses Content -->
      <div v-if="activeTab === 'resolver'" id="resolver-content" role="tabpanel" aria-labelledby="resolver-tab">
        <domain-resolver />
      </div>

      <!-- Calculator Content -->
      <div v-if="activeTab === 'calculator'" id="calculator-content" role="tabpanel" aria-labelledby="calculator-tab">
        <cryptocurrency-calculator />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DomainResolver from '../components/cryptocurrency/DomainResolver.vue'
import CryptocurrencyCalculator from '../components/cryptocurrency/Calculator.vue'

// Define component name
defineOptions({
  name: 'CryptocurrencyView'
})

const activeTab = ref('resolver') // Default to the resolver tab
</script>

<style scoped>
/* Add any component-specific styles here */
.view-name {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: left;
}
</style> 