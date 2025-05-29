<template>
  <div class="view">
    <h1 class="view-name">::Cryptography Tools::</h1>
    <p class="text-left text-gray-600 mb-8">Hash data, verify file integrity, and encrypt/decrypt files</p>
    
    <!-- Tab Navigation -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Hash Tab -->
      <hash-tool v-if="activeTab === 'hash'" />
      
      <!-- Verify Tab -->
      <verify-tool v-if="activeTab === 'verify'" />
      
      <!-- Encrypt/Decrypt Tab -->
      <encrypt-decrypt-tool v-if="activeTab === 'encrypt'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HashTool from '../components/cryptography/HashTool.vue'
import VerifyTool from '../components/cryptography/VerifyTool.vue'
import EncryptDecryptTool from '../components/cryptography/EncryptDecryptTool.vue'

// Define component name
defineOptions({
  name: 'Cryptography'
})

const activeTab = ref('hash')

const tabs = [
  { id: 'hash', name: 'Hash' },
  { id: 'verify', name: 'Verify' },
  { id: 'encrypt', name: 'Encrypt/Decrypt' }
]
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 