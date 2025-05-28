<template>
  <div>
    <p class="text-left text-gray-600 mb-6">Resolve human-readable domain names to cryptocurrency addresses</p>
    
    <section class="mx-auto">
      <div class="mx-auto w-full">
        <form class="mb-6" @submit.prevent="resolveAddress">
          <div class="flex flex-col space-y-4">
            <div>
              <label for="domain" class="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
              <div class="relative w-full">
                <input
                  type="text"
                  id="domain"
                  v-model="domainAddress.domain"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Enter a domain (e.g., example.eth, name.crypto, domain.tez)"
                  required
                />
              </div>
              <p class="mt-1 text-xs text-gray-500">Supported TLDs: .eth, .crypto, .wallet, .nft, .tez, and more</p>
            </div>
            
            <div>
              <label for="ticker" class="block text-sm font-medium text-gray-700 mb-1">Cryptocurrency</label>
              <select
                id="ticker"
                v-model="coinTicker"
                class="max-w-80 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a cryptocurrency</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="XTZ">Tezos (XTZ)</option>
                <option value="MATIC">Polygon (MATIC)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>
          </div>
          <br>
          <button
            class="max-w-sm py-3 px-5 mt-6 rounded text-black transition-colors duration-200 flex justify-center items-center"
            :class="{
              'bg-blue-600 hover:bg-blue-700': isFormValid && !domainAddress.loading,
              'bg-blue-300 cursor-not-allowed': !isFormValid || domainAddress.loading
            }"
            type="submit"
            :disabled="!isFormValid || domainAddress.loading"
          >
            <span v-if="domainAddress.loading" class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
            {{ domainAddress.loading ? 'Resolving...' : 'Resolve Address' }}
          </button>
        </form>
        
        <!-- Domain Address Resolution Display Info -->
        <domain-resolution-badge
          v-if="domainAddress.enabled"
          :domain-address="domainAddress"
          :currency="coinTicker"
        />
        <br>
        <!-- Information about domain name services -->
        <div class="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="text-lg font-medium mb-2">About Domain Resolution</h3>
          <p class="text-sm text-gray-600 mb-2">
            This tool resolves human-readable domain names to cryptocurrency addresses using various blockchain domain services.
          </p>
          <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li><span class="font-medium">.eth domains</span> - Resolved through Ethereum Name Service</li>
            <li><span class="font-medium">.crypto, .wallet, .nft domains</span> - Resolved through Unstoppable Domains</li>
            <li><span class="font-medium">.tez domains</span> - Resolved through Tezos Domains</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import domainMixins from '../../utils/mixins/domainMixins'
import DomainResolutionBadge from '../domains/ResolutionBadge.vue'

// Define component name
defineOptions({
  name: 'DomainResolver'
})

const coinTicker = ref('')
const domainAddress = reactive({
  address: '',
  domain: '',
  enabled: false,
  loading: false,
  service: '',
  error: ''
})

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return domainAddress.domain.trim() !== '' && coinTicker.value !== '';
})

async function resolveAddress() {
  const domain = domainAddress.domain
  const ticker = coinTicker.value

  // Check if provided domain name is valid
  const isDomain = domainMixins.isDomain(domain)
  if (!isDomain) {
    domainAddress.error = 'Not a valid domain address.'
    domainAddress.enabled = true
    return
  }

  // If domain is valid, ensure address, error, and service fields have been cleared
  domainAddress.address = ''
  domainAddress.service = ''
  domainAddress.error = ''

  // Resolve address from domain
  try {
    domainAddress.loading = true
    domainAddress.enabled = true
    const { address, service } = await domainMixins.resolveAddressFromDomain({
      domain,
      coinTicker: ticker
    })
    domainAddress.address = address
    domainAddress.service = service
  } catch (err: any) {
    domainAddress.error = err.message
  } finally {
    domainAddress.loading = false
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 