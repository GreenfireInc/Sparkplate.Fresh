<template>
  <div class="view">
    <h1 class="view-name">::Cryptography Tools::</h1>
    <p class="text-left text-gray-600 mb-8">Hash data, verify file integrity, and encrypt/decrypt files</p>
    
    <!-- Tab Navigation -->
    <TabsWrapper class="tabs-container">
      <TabComponent
        :active="activeTab === 'hash'"
        :onClick="() => (activeTab = 'hash')"
      >
        Hash
      </TabComponent>
      <TabComponent
        :active="activeTab === 'verify'"
        :onClick="() => (activeTab = 'verify')"
      >
        Verify
      </TabComponent>
      <TabComponent
        :active="activeTab === 'encrypt'"
        :onClick="() => (activeTab = 'encrypt')"
      >
        Encrypt/Decrypt
      </TabComponent>
      <TabComponent
        :active="activeTab === 'pgp'"
        :onClick="() => (activeTab = 'pgp')"
      >
        PGP/GPG Keys
      </TabComponent>
    </TabsWrapper>

    <!-- Tab Content -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Hash Tab -->
      <hash-tool v-if="activeTab === 'hash'" />
      
      <!-- Verify Tab -->
      <verify-tool v-if="activeTab === 'verify'" />
      
      <!-- Encrypt/Decrypt Tab -->
      <encrypt-decrypt-tool v-if="activeTab === 'encrypt'" />
      
      <!-- PGP/GPG Keys Tab -->
      <PGPKeyTool v-if="activeTab === 'pgp'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HashTool from '../components/pages/cryptography/HashTool.vue'
import VerifyTool from '../components/pages/cryptography/VerifyTool.vue'
import EncryptDecryptTool from '../components/pages/cryptography/EncryptDecryptTool.vue'
import PGPKeyTool from '@/components/pages/cryptography/PGPKeyTool.vue'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

// Define component name
defineOptions({
  name: 'Cryptography'
})

const activeTab = ref('hash')
</script>

<style scoped>
.tabs-container {
  margin-bottom: 1.5rem;
  
  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}
</style> 