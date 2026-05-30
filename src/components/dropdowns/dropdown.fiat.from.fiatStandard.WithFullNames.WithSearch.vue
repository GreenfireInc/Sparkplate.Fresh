<template>
  <div class="custom-select-wrapper" @click.stop>
    <div
      ref="triggerRef"
      class="custom-select"
      :class="{ open: isOpen }"
      role="combobox"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <div class="select-display">
        <span v-if="selectedFiat" class="select-flag" aria-hidden="true">{{ selectedFiat.flag }}</span>
        <span>{{ selectedLabel }}</span>
      </div>
      <ChevronsUpDown class="select-chevron" aria-hidden="true" />
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="portalRef"
        class="fiat-dropdown-portal fiat-dropdown-portal--with-search"
        :style="dropdownStyle"
        @click.stop
      >
        <div class="fdp-search-wrap">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            class="fdp-search-input"
            placeholder="Search fiat currency..."
            autocomplete="off"
            @keydown.stop
          />
        </div>

        <div
          class="fiat-dropdown-portal__scroll"
          :style="dropdownScrollStyle"
          @wheel.stop
          @click.stop
        >
          <div v-if="filteredFiats.length === 0" class="fdp-empty">
            No fiat currency found.
          </div>

          <div
            v-if="allowEmpty"
            class="fdp-option"
            :class="{ 'fdp-option--selected': modelValue === '' }"
            @click="selectFiat('')"
          >
            <Check
              class="fdp-option__check"
              :class="{ 'fdp-option__check--visible': modelValue === '' }"
              aria-hidden="true"
            />
            <span>{{ placeholder }}</span>
          </div>

          <div
            v-for="fiat in filteredFiats"
            :key="fiat.isoSymbol"
            class="fdp-option"
            :class="{ 'fdp-option--selected': modelValue === fiat.isoSymbol }"
            @click="selectFiat(fiat.isoSymbol)"
          >
            <Check
              class="fdp-option__check"
              :class="{ 'fdp-option__check--visible': modelValue === fiat.isoSymbol }"
              aria-hidden="true"
            />
            <span class="fdp-option__flag" aria-hidden="true">{{ fiat.flag }}</span>
            <span>{{ formatFiatDropdownText(fiat) }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  fiatCurrencies,
  fiatByIso,
  formatFiatDropdownLabel,
  formatFiatDropdownText,
} from '@/lib/cores/fiatStandard'

defineOptions({ name: 'DropdownFiatFromFiatStandardWithFullNamesWithSearch' })

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    allowEmpty?: boolean
  }>(),
  {
    placeholder: 'Select fiat currency...',
    allowEmpty: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = ref<HTMLElement | null>(null)
const portalRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const DROPDOWN_Z_INDEX = 10120
const VIEWPORT_MARGIN = 8
const GAP_BELOW_TRIGGER = 4
const PREFERRED_MAX_HEIGHT = 320
const SEARCH_BAR_HEIGHT = 44
const MIN_PANEL_WIDTH = 320

const dropdownPos = ref({
  top: 0,
  left: 0,
  width: MIN_PANEL_WIDTH,
  maxHeight: PREFERRED_MAX_HEIGHT,
  transform: 'none' as string,
})

const dropdownStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${dropdownPos.value.top}px`,
  left: `${dropdownPos.value.left}px`,
  width: `${dropdownPos.value.width}px`,
  transform: dropdownPos.value.transform,
  zIndex: DROPDOWN_Z_INDEX,
}))

const dropdownScrollStyle = computed(() => ({
  maxHeight: `${Math.max(80, dropdownPos.value.maxHeight - SEARCH_BAR_HEIGHT)}px`,
}))

function updateDropdownPosition() {
  if (!triggerRef.value) return

  const rect = triggerRef.value.getBoundingClientRect()
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight

  const panelWidth = Math.min(
    Math.max(rect.width, MIN_PANEL_WIDTH),
    viewportW - VIEWPORT_MARGIN * 2,
  )

  let left = rect.left
  if (left + panelWidth > viewportW - VIEWPORT_MARGIN) {
    left = viewportW - VIEWPORT_MARGIN - panelWidth
  }
  left = Math.max(VIEWPORT_MARGIN, left)

  const spaceBelow = viewportH - rect.bottom - GAP_BELOW_TRIGGER - VIEWPORT_MARGIN
  const spaceAbove = rect.top - GAP_BELOW_TRIGGER - VIEWPORT_MARGIN
  const openAbove = spaceBelow < 160 && spaceAbove > spaceBelow
  const maxHeight = Math.max(
    120,
    Math.min(PREFERRED_MAX_HEIGHT, openAbove ? spaceAbove : spaceBelow),
  )

  dropdownPos.value = {
    top: openAbove ? rect.top - GAP_BELOW_TRIGGER : rect.bottom + GAP_BELOW_TRIGGER,
    left,
    width: panelWidth,
    maxHeight,
    transform: openAbove ? 'translateY(-100%)' : 'none',
  }
}

const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase())

const filteredFiats = computed(() => {
  const query = normalizedSearch.value
  if (!query) return fiatCurrencies

  return fiatCurrencies.filter((fiat) => {
    const label = formatFiatDropdownLabel(fiat)
    return (
      fiat.isoSymbol.toLowerCase().includes(query)
      || fiat.countryName.toLowerCase().includes(query)
      || fiat.currencyName.toLowerCase().includes(query)
      || label.toLowerCase().includes(query)
    )
  })
})

const selectedFiat = computed(() => fiatByIso[props.modelValue.toUpperCase()] ?? null)

const selectedLabel = computed(() => {
  if (!props.modelValue) return props.placeholder
  if (selectedFiat.value) return formatFiatDropdownText(selectedFiat.value)
  return props.modelValue
})

const toggleDropdown = async () => {
  const willOpen = !isOpen.value
  isOpen.value = willOpen
  if (willOpen) {
    searchQuery.value = ''
    await nextTick()
    updateDropdownPosition()
    searchInputRef.value?.focus()
  }
}

const selectFiat = (isoSymbol: string) => {
  emit('update:modelValue', isoSymbol)
  isOpen.value = false
  searchQuery.value = ''
}

const handleClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return

  const target = event.target as HTMLElement
  if (triggerRef.value?.contains(target)) return
  if (portalRef.value?.contains(target)) return
  if (target.closest('.fiat-dropdown-portal--with-search')) return

  isOpen.value = false
  searchQuery.value = ''
}

const handleDocumentScroll = (event: Event) => {
  const t = event.target
  if (t instanceof Node && portalRef.value?.contains(t)) {
    return
  }
  if (t instanceof Element && t.closest('.fiat-dropdown-portal--with-search')) {
    return
  }
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

watch(isOpen, (open) => {
  if (open) {
    window.addEventListener('resize', updateDropdownPosition)
  } else {
    window.removeEventListener('resize', updateDropdownPosition)
    searchQuery.value = ''
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('scroll', handleDocumentScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('scroll', handleDocumentScroll, true)
  window.removeEventListener('resize', updateDropdownPosition)
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

.select-display span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-flag {
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
}

.select-chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.5;
  color: #6b7280;
}
</style>

<style>
.fiat-dropdown-portal--with-search {
  pointer-events: auto;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  overflow: hidden;
}

.fiat-dropdown-portal--with-search .fdp-search-wrap {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.fiat-dropdown-portal--with-search .fdp-search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  outline: none;
  box-sizing: border-box;
  color: #111827;
  background: #fff;
}

.fiat-dropdown-portal--with-search .fdp-search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.fiat-dropdown-portal--with-search .fiat-dropdown-portal__scroll {
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.fiat-dropdown-portal--with-search .fdp-empty {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.fiat-dropdown-portal--with-search .fdp-option {
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  min-width: 0;
}

.fiat-dropdown-portal--with-search .fdp-option__check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0;
  color: #2563eb;
}

.fiat-dropdown-portal--with-search .fdp-option__check--visible {
  opacity: 1;
}

.fiat-dropdown-portal--with-search .fdp-option__flag {
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
}

.fiat-dropdown-portal--with-search .fdp-option span:last-child {
  flex: 1;
  min-width: 0;
  white-space: normal;
  line-height: 1.35;
  word-break: break-word;
}

.fiat-dropdown-portal--with-search .fdp-option:hover {
  background-color: #f3f4f6;
}

.fiat-dropdown-portal--with-search .fdp-option--selected {
  background-color: #eff6ff;
  color: #2563eb;
}
</style>
