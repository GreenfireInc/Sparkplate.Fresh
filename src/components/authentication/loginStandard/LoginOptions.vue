<template>
  <div class="relative" ref="loginOptionsRef">
    <!-- Trigger Button with Tooltip -->
    <div class="relative group">
      <button
        @click="toggleMenu"
        class="h-8 w-8 flex items-center justify-center text-white bg-transparent rounded transition-colors icon-button-trigger"
      >
        <!-- <span class="icon-wrapper">
          <Fingerprint :size="16" />
        </span> -->
        🔐
      </button>
      
      <!-- Tooltip -->
      <div
        v-if="showTooltip && !isOpen"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded whitespace-nowrap pointer-events-none"
      >
        {{ t('signInOptions') }}
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div class="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>

    <!-- Popover Menu -->
    <Transition name="fade-slide">
      <div
        v-if="isOpen"
        class="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[200px] border border-gray-200"
      >
        <div class="py-1">
          <button
            @click="handleTemporaryKeyClick"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 text-gray-800 transition-colors text-left"
          >
            <Key :size="16" class="text-gray-600" />
            <span>{{ t('tempPrivateKey') }}</span>
          </button>
          <button
            @click="handleServerSelectionClick"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 text-gray-800 transition-colors text-left"
          >
            <Server :size="16" class="text-gray-600" />
            <span>{{ t('connectToServer') }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Fingerprint, Key, Server } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

interface LoginOptionsProps {
  onTemporaryKeyClick?: () => void
  onServerSelectionClick?: () => void
}

const props = defineProps<LoginOptionsProps>()

const { t } = useI18n()

const isOpen = ref(false)
const showTooltip = ref(false)
const loginOptionsRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  showTooltip.value = false
}

const handleTemporaryKeyClick = () => {
  console.log('Selected login option: Temporary Private Key')
  isOpen.value = false
  props.onTemporaryKeyClick?.()
}

const handleServerSelectionClick = () => {
  console.log('Selected login option: Connect to Server')
  isOpen.value = false
  props.onServerSelectionClick?.()
}

const handleClickOutside = (event: Event) => {
  if (loginOptionsRef.value && !loginOptionsRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleMouseEnter = () => {
  if (!isOpen.value) {
    showTooltip.value = true
  }
}

const handleMouseLeave = () => {
  showTooltip.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const button = loginOptionsRef.value?.querySelector('button')
  if (button) {
    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  const button = loginOptionsRef.value?.querySelector('button')
  if (button) {
    button.removeEventListener('mouseenter', handleMouseEnter)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

