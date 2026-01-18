<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Select Index
    </label>
    <div class="relative">
      <button
        @click="isOpen = !isOpen"
        class="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <img
            v-if="selectedIndex?.id === 'robinhood-ny'"
            :src="robinhoodLogo"
            alt="Robinhood"
            class="w-5 h-5"
          />
          <img
            v-else-if="selectedIndex?.id === 'bitflyer-ny'"
            :src="bitflyerLogo"
            alt="bitFlyer"
            class="w-5 h-5"
          />
          <img
            v-else-if="selectedIndex?.id === 'paypal-venmo-ny'"
            :src="venmoLogo"
            alt="Venmo"
            class="w-5 h-5"
          />
          <span>{{ selectedIndex?.label || 'Select Index' }}</span>
        </div>
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <!-- Dropdown Menu -->
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          class="absolute z-50 mt-1 w-full md:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
          @click.self="isOpen = false"
        >
          <div
            v-for="index in availableIndices"
            :key="index.id"
            @click="selectIndex(index)"
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': index.id === modelValue }"
          >
            <img
              v-if="index.id === 'robinhood-ny'"
              :src="robinhoodLogo"
              alt="Robinhood"
              class="w-5 h-5"
            />
            <img
              v-else-if="index.id === 'bitflyer-ny'"
              :src="bitflyerLogo"
              alt="bitFlyer"
              class="w-5 h-5"
            />
            <img
              v-else-if="index.id === 'paypal-venmo-ny'"
              :src="venmoLogo"
              alt="Venmo"
              class="w-5 h-5"
            />
            <span class="flex-1">{{ index.label }}</span>
            <svg
              v-if="index.id === modelValue"
              class="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </Transition>
    </div>
    
    <!-- Backdrop -->
    <Transition name="backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40"
        @click="isOpen = false"
      ></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as IndexComposites from '@/lib/cores/currencyCore/indexComposites'

const robinhoodLogo = '/assets/icons/exchanges/robinhood.neon.svg'
const bitflyerLogo = '/assets/icons/exchanges/bitflyer.svg'
const venmoLogo = '/assets/icons/exchanges/venmo.svg'

// Define component name
defineOptions({
  name: 'IndexSelector'
})

export type CurrencyItem = 
  | IndexComposites.ProofOfWorkItem 
  | IndexComposites.ProofOfStakeItem 
  | IndexComposites.NYExchangeOfferingsCoinbaseItem 
  | IndexComposites.NYExchangeOfferingsGeminiItem 
  | IndexComposites.NYExchangeOfferingsBitFlyerItem
  | IndexComposites.NYExchangeOfferingsBitStampItem
  | IndexComposites.NYExchangeOfferingsPayPalVenmoItem
  | IndexComposites.NYExchangeOfferingsRobinhoodItem
  | IndexComposites.StorageCurrencyItem
  | IndexComposites.OracleClassItem
  | IndexComposites.CoinbaseIndexItem
  | IndexComposites.CurrencyCoreItem
  | IndexComposites.ExchangeCurrencyItem
  | IndexComposites.GreeneryV1Item
  | IndexComposites.Greenery36Set0Item
  | IndexComposites.NFTMarketplaceCurrencyItem
  | IndexComposites.RandomListViaUCIDItem
  | IndexComposites.RandomListViaMediaPressKitItem
  | IndexComposites.SecSecurityItem
  | IndexComposites.StablecoinItem

export interface IndexOption {
  id: string
  label: string
  data: CurrencyItem[]
}

interface Props {
  modelValue: string
  availableIndices: IndexOption[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectedIndex = computed(() => {
  return props.availableIndices.find(idx => idx.id === props.modelValue)
})

const selectIndex = (index: IndexOption) => {
  emit('update:modelValue', index.id)
  isOpen.value = false
}

// Close dropdown on Escape key
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Backdrop transition */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.15s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>

