<template>
  <div class="custom-select-wrapper" @click.stop>
    <div
      ref="triggerRef"
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
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
        <span>{{ modelValue || 'Currencies' }}</span>
      </div>
      <!-- <svg class="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> -->
    </div>

    <!-- Teleported to body so it is never clipped by overflow:hidden ancestors -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="portalRef"
        class="currency-dropdown-portal"
        :style="dropdownStyle"
        @click.stop
      >
        <!-- Inner scroll box: keeps wheel/touch scrolling reliable over radix dialog body lock -->
        <div
          class="currency-dropdown-portal__scroll"
          @wheel.stop
          @click.stop
        >
          <div
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
              :src="getCryptoIconPath(currency)"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  PUBLIC_ICON_CRYPTO_TICKERS,
  getCryptoIconPath,
} from '@/lib/cores/bridge/bridge.shared.publicIcons.for.currencies';

defineOptions({ name: 'DropdownCurrencyFromPublicIcons' });

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const portalRef = ref<HTMLElement | null>(null);
const dropdownPos = ref({ top: 0, left: 0, width: 0 });

/** Must sit above stacked dialogs (e.g. input-wallet submodal content ~10101; add-entry ~10061). */
const DROPDOWN_Z_INDEX = 10120

const dropdownStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${dropdownPos.value.top}px`,
  left: `${dropdownPos.value.left}px`,
  width: `${dropdownPos.value.width}px`,
  zIndex: DROPDOWN_Z_INDEX,
}));

const availableCurrencies = PUBLIC_ICON_CRYPTO_TICKERS;

const toggleDropdown = () => {
  if (!isOpen.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    dropdownPos.value = {
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    };
  }
  isOpen.value = !isOpen.value;
};

const selectCurrency = (currency: string) => {
  emit('update:modelValue', currency);
  isOpen.value = false;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !target.closest('.custom-select-wrapper') &&
    !target.closest('.currency-dropdown-portal')
  ) {
    isOpen.value = false;
  }
};

/** Close on page/modal scroll only — never treat scrolling inside the list as “outside”. */
const handleDocumentScroll = (event: Event) => {
  const t = event.target;
  if (t instanceof Node && portalRef.value?.contains(t)) {
    return;
  }
  if (t instanceof Element && t.closest('.currency-dropdown-portal')) {
    return;
  }
  closeDropdown();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
  document.addEventListener('scroll', handleDocumentScroll, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
  document.removeEventListener('scroll', handleDocumentScroll, true);
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
</style>

<!-- Portal styles must be unscoped — the teleported node lives outside this component's DOM subtree -->
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
