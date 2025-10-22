<template>
  <div class="language-selector-example">
    <h3>{{ t('language') }}: {{ currentLanguageName }}</h3>
    
    <div class="language-buttons">
      <button 
        v-for="lang in availableLanguages" 
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ active: currentLanguage === lang.code }"
        class="language-btn"
      >
        {{ lang.name }}
      </button>
    </div>
    
    <div class="menu-preview">
      <h4>Menu Preview:</h4>
      <ul>
        <li><strong>{{ file }}:</strong> {{ close }} / {{ quit }}</li>
        <li><strong>{{ edit }}:</strong> {{ undo }}, {{ redo }}, {{ cut }}, {{ copy }}, {{ paste }}</li>
        <li><strong>{{ view }}:</strong> {{ resetZoom }}, {{ zoomIn }}, {{ zoomOut }}</li>
        <li><strong>{{ window }}:</strong> {{ minimize }}, {{ zoom }}</li>
        <li><strong>{{ help }}:</strong> {{ keyboardShortcuts }}, {{ about }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguageSelector } from '@/composables/useMenuTranslations'
import { getTranslation } from '@/locales/menuTranslations'

const { currentLanguage, availableLanguages, changeLanguage, loadSavedLanguage } = useLanguageSelector()

// Translation function
const t = (key: string) => getTranslation(key as any, currentLanguage.value)

// Get current language display name
const currentLanguageName = computed(() => {
  const lang = availableLanguages.value.find(l => l.code === currentLanguage.value)
  return lang?.name || 'Unknown'
})

// Individual translations for preview
const file = computed(() => t('file'))
const close = computed(() => t('close'))
const quit = computed(() => t('quit'))
const edit = computed(() => t('edit'))
const undo = computed(() => t('undo'))
const redo = computed(() => t('redo'))
const cut = computed(() => t('cut'))
const copy = computed(() => t('copy'))
const paste = computed(() => t('paste'))
const view = computed(() => t('view'))
const resetZoom = computed(() => t('resetZoom'))
const zoomIn = computed(() => t('zoomIn'))
const zoomOut = computed(() => t('zoomOut'))
const window = computed(() => t('window'))
const minimize = computed(() => t('minimize'))
const zoom = computed(() => t('zoom'))
const help = computed(() => t('help'))
const keyboardShortcuts = computed(() => t('keyboardShortcuts'))
const about = computed(() => t('about'))

onMounted(() => {
  loadSavedLanguage()
})
</script>

<style lang="scss" scoped>
.language-selector-example {
  @apply p-6 max-w-2xl mx-auto;
}

.language-buttons {
  @apply flex flex-wrap gap-2 mb-6;
}

.language-btn {
  @apply px-4 py-2 border border-gray-300 rounded-md text-sm font-medium transition-colors;
  
  &:hover {
    @apply bg-gray-100 border-gray-400;
  }
  
  &.active {
    @apply bg-blue-500 text-white border-blue-500;
  }
}

.menu-preview {
  @apply bg-gray-50 p-4 rounded-lg;
  
  h4 {
    @apply text-lg font-semibold mb-3;
  }
  
  ul {
    @apply space-y-2;
    
    li {
      @apply text-sm;
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .language-btn {
    @apply border-gray-600 text-gray-300;
    
    &:hover {
      @apply bg-gray-700 border-gray-500;
    }
    
    &.active {
      @apply bg-blue-600 text-white border-blue-600;
    }
  }
  
  .menu-preview {
    @apply bg-gray-800 text-gray-200;
  }
}
</style>
