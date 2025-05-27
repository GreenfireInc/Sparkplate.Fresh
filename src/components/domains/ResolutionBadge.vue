<template>
  <div class="resolution-badge p-4 bg-gray-100 rounded-lg shadow-sm">
    <div v-if="domainAddress.loading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      <span class="ml-2">Loading resolution...</span>
    </div>
    <div v-else-if="domainAddress.address" class="text-sm">
      <div class="flex justify-between items-center mb-2">
        <span class="font-semibold">Resolved via:</span>
        <span 
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="serviceClass"
        >
          {{ serviceName }}
        </span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs text-gray-500 mb-1">{{ domainAddress.domain }} → {{ currency }}</span>
        <div class="font-mono bg-gray-200 p-2 rounded overflow-auto break-all">
          {{ domainAddress.address }}
        </div>
      </div>
    </div>
    <div v-else-if="domainAddress.error" class="text-red-500 p-2 bg-red-50 rounded border border-red-200">
      <div class="font-semibold mb-1">Resolution Error:</div>
      {{ domainAddress.error }}
    </div>
    <div v-else class="text-gray-500 italic">
      Enter a domain name and currency to resolve an address.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  domainAddress: {
    type: Object as () => {
      address: string;
      domain: string;
      enabled: boolean;
      loading: boolean;
      service: string;
      error?: string;
    },
    required: true
  },
  currency: {
    type: String,
    required: true
  }
});

// Format service name for display
const serviceName = computed(() => {
  const service = props.domainAddress.service;
  
  if (service === 'ens') return 'Ethereum Name Service';
  if (service === 'uns') return 'Unstoppable Domains';
  if (service === 'tezos') return 'Tezos Domains';
  
  return service || '';
});

// Service-specific styling
const serviceClass = computed(() => {
  const service = props.domainAddress.service;
  
  if (service === 'ens') return 'bg-blue-100 text-blue-800';
  if (service === 'uns') return 'bg-purple-100 text-purple-800';
  if (service === 'tezos') return 'bg-teal-100 text-teal-800';
  
  return 'bg-gray-100 text-gray-800';
});

// Define component name
defineOptions({
  name: 'DomainResolutionBadge'
});
</script>

<style scoped>
.resolution-badge {
  width: 100%;
  word-break: break-all;
  transition: all 0.2s ease;
}
</style> 