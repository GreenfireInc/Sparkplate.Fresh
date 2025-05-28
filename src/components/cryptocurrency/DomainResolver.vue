<template>
  <div>
    <p class="text-left text-gray-600 mb-6">Resolve human-readable domain names to cryptocurrency addresses</p>
    
    <section class="mx-auto">
      <div class="mx-auto w-full">
        <form class="mb-6" @submit.prevent="resolveAddress">
          <div class="flex flex-col space-y-4">

            <div> <!-- Wrapper for the domain input field and its description -->
              <label for="search-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
              <div class="flex max-w-lg"> <!-- Flex container for the dropdown button and the input field -->
                <button 
                  id="dropdown-button" 
                  data-dropdown-toggle="dropdown"
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
                  type="button">
                  Networks   
                  <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">btc://</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">eth://</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">sol://</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">xtz://</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Unstoppable Domains</a>
                    </li>
                  </ul>
                </div>
                <div class="relative w-full">
                  <input 
                    type="search" 
                    id="search-dropdown" 
                    v-model="domainAddress.domain"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                    placeholder="Enter a domain (e.g., example.eth, name.crypto, domain.tez)" 
                    required 
                  />
                  <button 
                    type="submit" 
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">Supported TLDs: .eth, .crypto, .wallet, .nft, .tez, and more</p>
            </div> <!-- End of wrapper for domain input section -->
            
            
          </div> <!-- End of flex flex-col space-y-4 -->
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
import { ref, reactive, computed, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import domainMixins from '../../utils/mixins/domainMixins'
import DomainResolutionBadge from '../domains/ResolutionBadge.vue'

// Define component name
defineOptions({
  name: 'DomainResolver'
})

// Initialize Flowbite components on mount
onMounted(() => {
  initFlowbite()
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