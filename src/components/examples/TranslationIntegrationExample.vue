<template>
  <div class="translation-example">
    <h2>Translation Integration Example</h2>
    
    <!-- Language Selector -->
    <div class="language-section">
      <h3>Language Selector</h3>
      <div class="language-buttons">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="{ active: locale === lang.code }"
          class="lang-btn"
        >
          {{ lang.flag }} {{ lang.name }}
        </button>
      </div>
    </div>

    <!-- i18n Translations -->
    <div class="i18n-section">
      <h3>i18n Translations (App Content)</h3>
      <ul>
        <li><strong>Welcome:</strong> {{ t('welcome') }}</li>
        <li><strong>Select User:</strong> {{ t('selectUserPrompt') }}</li>
        <li><strong>Create Account:</strong> {{ t('createAccount') }}</li>
        <li><strong>Language:</strong> {{ t('language') }}</li>
      </ul>
    </div>

    <!-- Menu Translations -->
    <div class="menu-section">
      <h3>Menu Translations (Electron Menu)</h3>
      <ul>
        <li><strong>File:</strong> {{ tMenu('file') }}</li>
        <li><strong>Edit:</strong> {{ tMenu('edit') }}</li>
        <li><strong>View:</strong> {{ tMenu('view') }}</li>
        <li><strong>Window:</strong> {{ tMenu('window') }}</li>
        <li><strong>Help:</strong> {{ tMenu('help') }}</li>
        <li><strong>About:</strong> {{ tMenu('about') }}</li>
        <li><strong>Settings:</strong> {{ tMenu('settings') }}</li>
      </ul>
    </div>

    <!-- Universal Translations -->
    <div class="universal-section">
      <h3>Universal Translations (Menu First, Then i18n)</h3>
      <ul>
        <li><strong>Language (Menu):</strong> {{ tUniversal('language') }}</li>
        <li><strong>Welcome (i18n):</strong> {{ tUniversal('welcome') }}</li>
        <li><strong>File (Menu):</strong> {{ tUniversal('file') }}</li>
        <li><strong>Create Account (i18n):</strong> {{ tUniversal('createAccount') }}</li>
      </ul>
    </div>

    <!-- Current Language Info -->
    <div class="info-section">
      <h3>Current Language Info</h3>
      <p><strong>Code:</strong> {{ locale }}</p>
      <p><strong>Name:</strong> {{ currentLanguageInfo?.name }}</p>
      <p><strong>Flag:</strong> {{ currentLanguageInfo?.flag }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'

const { 
  locale, 
  languages, 
  currentLanguageInfo,
  t, 
  tMenu, 
  tUniversal, 
  changeLanguage 
} = useUnifiedTranslations()
</script>

<style scoped>
.translation-example {
  @apply p-6 max-w-4xl mx-auto space-y-6;
}

.language-section,
.i18n-section,
.menu-section,
.universal-section,
.info-section {
  @apply bg-gray-50 p-4 rounded-lg;
}

.language-buttons {
  @apply flex flex-wrap gap-2;
}

.lang-btn {
  @apply px-3 py-2 border border-gray-300 rounded text-sm font-medium transition-colors;
}

.lang-btn:hover {
  @apply bg-gray-100;
}

.lang-btn.active {
  @apply bg-blue-500 text-white border-blue-500;
}

h3 {
  @apply text-lg font-semibold mb-3;
}

ul {
  @apply space-y-1;
}

li {
  @apply text-sm;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .language-section,
  .i18n-section,
  .menu-section,
  .universal-section,
  .info-section {
    @apply bg-gray-800 text-gray-200;
  }
  
  .lang-btn {
    @apply border-gray-600 text-gray-300;
  }
  
  .lang-btn:hover {
    @apply bg-gray-700;
  }
  
  .lang-btn.active {
    @apply bg-blue-600;
  }
}
</style>
