<template>
  <div class="custom-select-wrapper" @click.stop>
    <div
      ref="triggerRef"
      class="custom-select"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
    >
      <div class="select-display">
        <img
          v-if="modelValue && getCryptoIconPath(modelValue)"
          :src="getCryptoIconPath(modelValue) ?? ''"
          :alt="modelValue"
          class="select-icon"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
        <span>{{ modelValue || placeholder }}</span>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="portalRef"
        class="currency-dropdown-portal"
        :style="dropdownStyle"
        @click.stop
      >
        <div
          class="currency-dropdown-portal__scroll"
          @wheel.stop
          @click.stop
        >
          <div
            v-if="allowEmpty"
            class="cdp-option"
            :class="{ 'cdp-option--selected': modelValue === '' }"
            @click="selectCurrency('')"
          />
          <div
            v-for="currency in availableCurrencies"
            :key="currency"
            class="cdp-option"
            :class="{ 'cdp-option--selected': modelValue === currency }"
            @click="selectCurrency(currency)"
          >
            <img
              v-if="getCryptoIconPath(currency)"
              :src="getCryptoIconPath(currency) ?? ''"
              :alt="currency"
              class="cdp-option__icon"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <span>{{ currency }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NETWORKS } from '@/lib/cores/currencyCore/currencies'
import { useDashboardCurrencies } from '@/composables/useDashboardCurrencies'

defineOptions({ name: 'DropdownCurrencyFromCurrencyCore' })

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    /** When true, list only currencies toggled visible in Dashboard Settings. */
    onlyVisible?: boolean
    /** When false, hides the blank “clear selection” row. */
    allowEmpty?: boolean
  }>(),
  {
    placeholder: 'Currencies',
    onlyVisible: false,
    allowEmpty: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { currenciesOrdered, visibleCurrencies } = useDashboardCurrencies()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const portalRef = ref<HTMLElement | null>(null)
const dropdownPos = ref({ top: 0, left: 0, width: 0 })

/** Must sit above stacked dialogs (e.g. input-wallet submodal content ~10101; add-entry ~10061). */
const DROPDOWN_Z_INDEX = 10120

const dropdownStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${dropdownPos.value.top}px`,
  left: `${dropdownPos.value.left}px`,
  width: `${dropdownPos.value.width}px`,
  zIndex: DROPDOWN_Z_INDEX,
}))

/** Tickers from currencyCore — same registry managed in tab.Settings.Dashboard.vue. */
const availableCurrencies = computed(() => {
  const source = props.onlyVisible ? visibleCurrencies.value : currenciesOrdered
  return source.map((c) => c.basicInfo.symbolTicker.toUpperCase())
})

const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null
  const n = NETWORKS.find((x) => x.ticker === coinTicker.toUpperCase())
  return n?.icon ?? null
}

const toggleDropdown = () => {
  if (!isOpen.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownPos.value = {
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    }
  }
  isOpen.value = !isOpen.value
}

const selectCurrency = (currency: string) => {
  emit('update:modelValue', currency)
  isOpen.value = false
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (
    !target.closest('.custom-select-wrapper') &&
    !target.closest('.currency-dropdown-portal')
  ) {
    isOpen.value = false
  }
}

const handleDocumentScroll = (event: Event) => {
  const t = event.target
  if (t instanceof Node && portalRef.value?.contains(t)) {
    return
  }
  if (t instanceof Element && t.closest('.currency-dropdown-portal')) {
    return
  }
  closeDropdown()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
  document.addEventListener('scroll', handleDocumentScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
  document.removeEventListener('scroll', handleDocumentScroll, true)
})
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
</style>

<style>
.currency-dropdown-portal {
  pointer-events: auto;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.currency-dropdown-portal__scroll {
  max-height: min(300px, 70vh);
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.cdp-option {
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  min-width: 0;
}

.cdp-option span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.cdp-option:hover {
  background-color: #f3f4f6;
}

.cdp-option--selected {
  background-color: #eff6ff;
  color: #2563eb;
}

.cdp-option__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  object-fit: contain;
}
</style>
