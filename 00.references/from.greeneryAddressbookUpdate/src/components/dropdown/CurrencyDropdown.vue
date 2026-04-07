<template>
  <div ref="wrapperRef" class="custom-select-wrapper" @click.stop>
    <div 
      class="custom-select" 
      :class="{ 'open': isOpen }"
      @click="toggleDropdown"
    >
      <div class="select-display">
        <img 
          v-if="modelValue && getCryptoIconPath(modelValue)" 
          :src="getCryptoIconPath(modelValue)" 
          :alt="modelValue"
          class="select-icon"
          @error="$event.target.style.display = 'none'"
        />
        <span>{{ modelValue || 'Currency' }}</span>
      </div>
      <svg class="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div v-if="isOpen" ref="dropdownRef" class="dropdown-options" :class="{ 'open-upward': openUpward }">
      <div 
        class="dropdown-option" 
        :class="{ 'selected': modelValue === '' }"
        @click="selectCurrency('')"
      >
        <!-- <span>Select Currency</span> -->
      </div>
      <div 
        v-for="currency in availableCurrencies" 
        :key="currency" 
        class="dropdown-option"
        :class="{ 'selected': modelValue === currency }"
        @click="selectCurrency(currency)"
      >
        <img 
          :src="getCryptoIconPath(currency)" 
          :alt="currency"
          class="option-icon"
          @error="$event.target.style.display = 'none'"
        />
        <span>{{ currency }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const openUpward = ref(false);
const maxDropdownHeight = ref(300);

// Available cryptocurrencies from the crypto folder
const availableCurrencies = [
  '1INCH', 'AAVE', 'ADA', 'ALGO', 'APE', 'AR', 'ATOM', 'AVAX', 'AXS', 'BAT',
  'BCH', 'BLUR', 'BNB', 'BONK', 'BTC', 'BTT', 'CHZ', 'CRV', 'DAI', 'DOGE',
  'DOT', 'EGLD', 'EOS', 'ETC', 'ETH', 'EUR', 'EUROC', 'FET', 'GRT', 'GUSD',
  'HNT', 'ICP', 'IMX', 'INJ', 'JASMY', 'KSM', 'LDO', 'LINK', 'LPT', 'LTC',
  'LUNA', 'LUNC', 'MANA', 'MATIC', 'MINA', 'MKR', 'NEAR', 'NEO', 'QNT', 'RENDER',
  'ROSE', 'RVN', 'SAND', 'SHIB', 'SNX', 'SOL', 'STX', 'SUSHI', 'TRX', 'TUSD',
  'UNI', 'USD', 'USDC', 'USDT', 'WAVES', 'XLM', 'XRP', 'XTZ', 'ZEC', 'ZIL'
].sort();

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
};

const calculateDropdownPosition = async () => {
  if (!wrapperRef.value || !dropdownRef.value) return;
  
  await nextTick();
  
  // Find the scrollable container (modal-content)
  let scrollContainer: HTMLElement | null = wrapperRef.value;
  while (scrollContainer && scrollContainer !== document.body) {
    const style = window.getComputedStyle(scrollContainer);
    if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto' || style.overflow === 'scroll') {
      break;
    }
    scrollContainer = scrollContainer.parentElement;
  }
  
  const wrapperRect = wrapperRef.value.getBoundingClientRect();
  const preferredHeight = 300;
  
  let spaceBelow: number;
  let spaceAbove: number;
  
  if (scrollContainer) {
    const containerRect = scrollContainer.getBoundingClientRect();
    // Calculate space relative to the scrollable container's visible area
    spaceBelow = (containerRect.bottom) - wrapperRect.bottom - 20;
    spaceAbove = wrapperRect.top - containerRect.top - 20;
  } else {
    // Fallback to window if no scroll container found
    spaceBelow = window.innerHeight - wrapperRect.bottom - 20;
    spaceAbove = wrapperRect.top - 20;
  }
  
  // Determine if we should open upward
  openUpward.value = spaceBelow < preferredHeight && spaceAbove > spaceBelow;
  
  // Calculate available space based on direction
  const availableSpace = openUpward.value ? spaceAbove : spaceBelow;
  
  // Set max height to available space (with some padding), but at least 150px
  maxDropdownHeight.value = Math.max(150, Math.min(preferredHeight, availableSpace - 10));
  
  if (dropdownRef.value) {
    dropdownRef.value.style.maxHeight = `${maxDropdownHeight.value}px`;
  }
};

const toggleDropdown = async () => {
  if (!isOpen.value) {
    isOpen.value = true;
    await calculateDropdownPosition();
  } else {
    isOpen.value = false;
    openUpward.value = false;
  }
};

watch(isOpen, async (newVal) => {
  if (newVal) {
    await calculateDropdownPosition();
  } else {
    openUpward.value = false;
    maxDropdownHeight.value = 300;
    if (dropdownRef.value) {
      dropdownRef.value.style.maxHeight = '300px';
    }
  }
});

const selectCurrency = (currency: string) => {
  emit('update:modelValue', currency);
  isOpen.value = false;
  openUpward.value = false;
  maxDropdownHeight.value = 300;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.custom-select-wrapper')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Use capture phase to ensure this fires before @click.stop handlers
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});
</script>

<style scoped>
.custom-select-wrapper {
    position: relative;
    width: 100%;
}

.custom-select {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.custom-select:hover {
    border-color: #9ca3af;
}

.custom-select.open {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.select-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
    overflow: hidden;
}

.select-display span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.select-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    object-fit: contain;
}

.select-arrow {
    flex-shrink: 0;
    color: #6b7280;
    transition: transform 0.2s;
}

.custom-select.open .select-arrow {
    transform: rotate(180deg);
}

.dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10000;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dropdown-options.open-upward {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 0.25rem;
}

.dropdown-option {
    padding: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
    min-width: 0;
}

.dropdown-option span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
}

.dropdown-option:hover {
    background-color: #f3f4f6;
}

.dropdown-option.selected {
    background-color: #eff6ff;
    color: #2563eb;
}

.option-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    object-fit: contain;
}
</style>

