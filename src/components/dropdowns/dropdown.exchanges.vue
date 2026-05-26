<template>
  <div class="ex-dropdown" @click.stop>
    <button
      :id="id"
      type="button"
      ref="triggerRef"
      class="ex-dropdown__trigger"
      :class="{ 'ex-dropdown__trigger--open': isOpen }"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      @click="toggleDropdown"
    >
      <span class="ex-dropdown__trigger-inner">
        <img
          v-if="iconSrcForValue"
          :src="iconSrcForValue"
          alt=""
          class="ex-dropdown__icon"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
        <span class="ex-dropdown__label">{{ modelValue || placeholder }}</span>
      </span>
      <ChevronDown :size="14" class="ex-dropdown__chevron" aria-hidden="true" />
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="portalRef"
        class="ex-dropdown-portal"
        :style="dropdownStyle"
        role="listbox"
        :id="listboxId"
        @click.stop
      >
        <div
          class="ex-dropdown-portal__scroll"
          @wheel.stop
        >
          <button
            v-for="opt in options"
            :key="opt.key"
            type="button"
            role="option"
            class="ex-dropdown__option"
            :class="{ 'ex-dropdown__option--selected': modelValue === opt.label }"
            :aria-selected="modelValue === opt.label"
            @click="selectOption(opt)"
          >
            <img
              v-if="getExchangeIconSrc(opt.iconFile)"
              :src="getExchangeIconSrc(opt.iconFile)!"
              alt=""
              class="ex-dropdown__option-icon"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import {
  getExchangePickerOptions,
  getExchangeIconSrc,
  type ExchangePickerOption,
} from '@/lib/cores/currencyCore/exchanges/exchangePickerOptions'

const props = withDefaults(
  defineProps<{
    modelValue: string
    /** For <label for="…"> */
    id?: string
    placeholder?: string
  }>(),
  {
    id: undefined,
    placeholder: 'Select exchange…',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /** Fired when a known exchange is chosen; use to fill URL, etc. */
  pick: [payload: { key: string; label: string; website: string }]
}>()

const options = computed(() => getExchangePickerOptions())

const iconSrcForValue = computed(() => {
  const v = props.modelValue?.trim()
  if (!v) return null
  const opt = options.value.find((o) => o.label === v)
  if (!opt) return null
  return getExchangeIconSrc(opt.iconFile)
})

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const portalRef = ref<HTMLElement | null>(null)
const dropdownPos = ref({ top: 0, left: 0, width: 0 })

const listboxId = `ex-dropdown-list-${Math.random().toString(36).slice(2, 9)}`

/** Above modal.details.Exchange dialog content (z-index 9001) */
const DROPDOWN_Z_INDEX = 10090

const dropdownStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${dropdownPos.value.top}px`,
  left: `${dropdownPos.value.left}px`,
  width: `${dropdownPos.value.width}px`,
  zIndex: DROPDOWN_Z_INDEX,
}))

function toggleDropdown() {
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

function selectOption(opt: ExchangePickerOption) {
  emit('update:modelValue', opt.label)
  emit('pick', { key: opt.key, label: opt.label, website: opt.website })
  isOpen.value = false
}

function closeDropdown() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.ex-dropdown') && !target.closest('.ex-dropdown-portal')) {
    isOpen.value = false
  }
}

function handleDocumentScroll(event: Event) {
  const t = event.target
  if (t instanceof Node && portalRef.value?.contains(t)) return
  if (t instanceof Element && t.closest('.ex-dropdown-portal')) return
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
.ex-dropdown {
  position: relative;
  width: 100%;
}

.ex-dropdown__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ex-dropdown__trigger:hover {
  border-color: #9ca3af;
}

.ex-dropdown__trigger--open {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.ex-dropdown__trigger-inner {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  flex: 1;
}

.ex-dropdown__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1f2937;
}

.ex-dropdown__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  object-fit: contain;
}

.ex-dropdown__chevron {
  flex-shrink: 0;
  color: #6b7280;
}

.ex-dropdown__trigger--open .ex-dropdown__chevron {
  transform: rotate(180deg);
}
</style>

<style>
.ex-dropdown-portal {
  pointer-events: auto;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.ex-dropdown-portal__scroll {
  max-height: min(280px, 70vh);
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  touch-action: pan-y;
}

.ex-dropdown__option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #1f2937;
  text-align: left;
  font-family: inherit;
  transition: background 0.12s;
}

.ex-dropdown__option:hover {
  background: #f3f4f6;
}

.ex-dropdown__option--selected {
  background: #eff6ff;
  color: #2563eb;
}

.ex-dropdown__option span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}

.ex-dropdown__option-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  object-fit: contain;
}
</style>
