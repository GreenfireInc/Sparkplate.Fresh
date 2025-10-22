<template>
  <div class="language-selector">
    <label for="language-select" class="language-label">
      {{ t('language') }}:
    </label>
    <select 
      id="language-select"
      v-model="selectedLanguage" 
      @change="handleLanguageChange"
      class="language-select"
    >
      <option 
        v-for="lang in availableLanguages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLanguageSelector } from '@/composables/useMenuTranslations'
import { getTranslation } from '@/locales/menuTranslations'

const { currentLanguage, availableLanguages, changeLanguage, loadSavedLanguage } = useLanguageSelector()
const selectedLanguage = ref(currentLanguage.value)

// Translation function for the label
const t = (key: string) => getTranslation(key as any, currentLanguage.value)

const handleLanguageChange = () => {
  changeLanguage(selectedLanguage.value)
}

// Watch for external language changes
watch(currentLanguage, (newLang) => {
  selectedLanguage.value = newLang
})

onMounted(() => {
  loadSavedLanguage()
  selectedLanguage.value = currentLanguage.value
})
</script>

<style lang="scss" scoped>
.language-selector {
  @apply flex items-center gap-2;
}

.language-label {
  @apply text-sm font-medium text-gray-700;
}

.language-select {
  @apply px-3 py-1 border border-gray-300 rounded-md text-sm bg-white;
  
  &:focus {
    @apply outline-none ring-2 ring-blue-500 border-blue-500;
  }
  
  &:hover {
    @apply border-gray-400;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .language-label {
    @apply text-gray-300;
  }
  
  .language-select {
    @apply bg-gray-800 border-gray-600 text-white;
    
    &:hover {
      @apply border-gray-500;
    }
    
    &:focus {
      @apply ring-blue-400 border-blue-400;
    }
  }
}
</style>
