<template>
  <div class="view">
    <h1 class="view-name">::Cryptocurrency::</h1>
<br>

    <!-- Tab Navigation -->
    <TabsWrapper class="tabs-container">
      <TabComponent
        :active="activeTab === 'resolver'"
        :onClick="() => (activeTab = 'resolver')"
      >
        Human Readable Addresses
      </TabComponent>
      <TabComponent
        :active="activeTab === 'calculator'"
        :onClick="() => (activeTab = 'calculator')"
      >
        Calculator
      </TabComponent>
    </TabsWrapper>

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
import DomainResolver from '../components/pageTabs/cryptocurrency/DomainResolver.vue'
import CryptocurrencyCalculator from '../components/pageTabs/cryptocurrency/Calculator.vue'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

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

.tabs-container {
  margin-bottom: 1.5rem;
  
  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}
</style> 