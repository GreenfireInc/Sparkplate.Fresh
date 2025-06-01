<template>
  <div>
    <p class="text-left text-gray-600 mb-6">Resolve human-readable domain names to cryptocurrency addresses</p>
    
    <section class="mx-auto">
      <div class="mx-auto w-full">
        <form class="mb-6" @submit.prevent="resolveAddress">
          <div class="flex flex-col space-y-4">

            <div> <!-- Wrapper for the domain input field and its description -->
              <label for="search-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
              <div class="flex max-w-2xl"> <!-- Flex container for the dropdown button and the input field -->
                <div class="relative">
                  <button 
                    id="dropdown-button" 
                    @click="toggleDropdown"
                    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-600 border border-blue-600 rounded-s-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    style="background-color: #2563eb !important; border-color: #2563eb !important; color: white !important;"
                    type="button">
                    {{ selectedNetwork || 'Networks' }}   
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div v-show="isDropdownOpen" class="absolute top-full left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Ada Domains')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ada Domains</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Ethereum Name Service')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ethereum Name Service</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Interchain Name Service')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Interchain Name Service</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Solana Name Service')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Solana Name Service</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Stacks')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Stacks</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Terra Name Service')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Terra Name Service</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Tezos Domains')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tezos Domains</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="selectNetwork('Unstoppable Domains')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Unstoppable Domains</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="relative flex-grow">
                  <input 
                    type="search" 
                    id="search-dropdown" 
                    v-model="domainAddress.domain"
                    class="block w-full py-2.5 px-3 text-sm text-gray-900 bg-gray-50 rounded-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 -ml-px h-[42px]"
                    placeholder="Enter a domain (e.g., example.eth, name.crypto, domain.tez)" 
                    required 
                  />
                </div>
                <button
                  class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-e-lg border border-blue-600 -ml-px"
                  :class="{
                    'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800': isFormValid && !domainAddress.loading,
                    'text-gray-500 bg-blue-300 cursor-not-allowed': !isFormValid || domainAddress.loading
                  }"
                  type="submit"
                  :disabled="!isFormValid || domainAddress.loading"
                >
                  <span v-if="domainAddress.loading" class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  {{ domainAddress.loading ? 'Searching...' : 'Search' }}
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-500">Supported TLDs: .eth, .crypto, .wallet, .nft, .tez, and more</p>
            </div> <!-- End of wrapper for domain input section -->
            
            
          </div> <!-- End of flex flex-col space-y-4 -->
          <br>
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
        </form>
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
const selectedNetwork = ref('')
const isDropdownOpen = ref(false)
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

// Dropdown functions
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectNetwork(network: string) {
  selectedNetwork.value = network
  isDropdownOpen.value = false
  // You can add logic here to handle the selected network
}

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