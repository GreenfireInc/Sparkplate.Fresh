<template>
  <div class="view crypto-page">
    <header class="crypto-page__head">
      <h1 class="crypto-page__title">::Cryptocurrency::</h1>
    </header>

    <!-- Tab Navigation -->
    <TabsWrapper class="crypto-page__tabs tabs-container">
      <TabComponent
        :active="activeTab === 'resolver'"
        :onClick="() => (activeTab = 'resolver')"
      >
        <div class="flex items-center gap-2">
          <MapPinHouse :size="18" />
          <span>Human Readable Addresses</span>
        </div>
      </TabComponent>
      <TabComponent
        :active="activeTab === 'calculator'"
        :onClick="() => (activeTab = 'calculator')"
      >
        <div class="flex items-center gap-2">
          <Calculator :size="18" />
          <span>Calculator</span>
        </div>
      </TabComponent>
      <TabComponent
        :active="activeTab === 'indices'"
        :onClick="() => (activeTab = 'indices')"
      >
        Indices
      </TabComponent>
      <TabComponent
        :active="activeTab === 'mnemonic'"
        :onClick="() => (activeTab = 'mnemonic')"
      >
        Mnemonic Seed Phrase
      </TabComponent>
    </TabsWrapper>

    <!-- Tab panels: fill remaining main height; each tab handles its own inner scroll -->
    <div id="tabContent" class="crypto-page__panels">
      <div
        v-if="activeTab === 'resolver'"
        id="resolver-content"
        class="crypto-page__panel"
        role="tabpanel"
        aria-labelledby="resolver-tab"
      >
        <domain-resolver />
      </div>

      <div
        v-if="activeTab === 'calculator'"
        id="calculator-content"
        class="crypto-page__panel"
        role="tabpanel"
        aria-labelledby="calculator-tab"
      >
        <cryptocurrency-calculator />
      </div>

      <div
        v-if="activeTab === 'indices'"
        id="indices-content"
        class="crypto-page__panel"
        role="tabpanel"
        aria-labelledby="indices-tab"
      >
        <cryptocurrency-indices />
      </div>

      <div
        v-if="activeTab === 'mnemonic'"
        id="mnemonic-content"
        class="crypto-page__panel"
        role="tabpanel"
        aria-labelledby="mnemonic-tab"
      >
        <mnemonic-seed-phrase />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calculator, MapPinHouse } from 'lucide-vue-next'
import DomainResolver from '../components/pageTabs/cryptocurrency/tab.cryptocurrency.DomainResolution.vue'
import CryptocurrencyCalculator from '../components/pageTabs/cryptocurrency/tab.cryptocurrency.Calculator.vue'
import CryptocurrencyIndices from '../components/pageTabs/cryptocurrency/tab.cryptocurrency.Indices.vue'
import MnemonicSeedPhrase from '../components/pageTabs/cryptocurrency/tab.cryptocurrency.MnemonicSeedPhrase.vue'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

// Define component name
defineOptions({
  name: 'CryptocurrencyView'
})

const activeTab = ref('resolver') // Default to the resolver tab
</script>

<style scoped lang="scss">
/*
 * Override global `.view { overflow-y: auto }` so Alt-revealed menu bar does not
 * introduce a redundant document scroll — panels scroll internally only when needed.
 */
.view.crypto-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.crypto-page__head {
  flex-shrink: 0;
}

.crypto-page__title {
  font-size: 2rem;
  margin: 0 0 0.75rem;
  font-weight: 600;
  text-align: left;
}

.crypto-page__tabs.tabs-container {
  flex-shrink: 0;
  margin-bottom: 0.75rem;

  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}

.crypto-page__panels {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.crypto-page__panel {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style> 