<template>
  <div class="about-translation-example">
    <h2>About Modal Translation Example</h2>
    
    <!-- Language Selector -->
    <div class="language-section">
      <h3>Language Selector</h3>
      <div class="language-buttons">
        <button 
          v-for="lang in availableLanguages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="{ active: currentLanguage === lang.code }"
          class="lang-btn"
        >
          {{ lang.name }}
        </button>
      </div>
    </div>

    <!-- Main Tab Translations -->
    <div class="main-section">
      <h3>Main Tab Translations</h3>
      <ul>
        <li><strong>{{ hostname }}:</strong> {{ hostname }}</li>
        <li><strong>{{ os }}:</strong> {{ os }}</li>
        <li><strong>{{ node }}:</strong> {{ node }}</li>
        <li><strong>{{ electron }}:</strong> {{ electron }}</li>
        <li><strong>{{ database }}:</strong> {{ database }}</li>
        <li><strong>{{ installedRAM }}:</strong> {{ installedRAM }}</li>
        <li><strong>{{ cpu }}:</strong> {{ cpu }}</li>
        <li><strong>{{ clearStore }}:</strong> {{ clearStore }}</li>
      </ul>
    </div>

    <!-- Tab Names -->
    <div class="tabs-section">
      <h3>Tab Names</h3>
      <div class="tab-names">
        <span class="tab-name">{{ main }}</span>
        <span class="tab-name">{{ notes }}</span>
        <span class="tab-name">{{ greenfire }}</span>
        <span class="tab-name">{{ universe }}</span>
        <span class="tab-name">{{ contribute }}</span>
        <span class="tab-name">{{ donations }}</span>
      </div>
    </div>

    <!-- Notes Tab Translations -->
    <div class="notes-section">
      <h3>Notes Tab Translations</h3>
      <ul>
        <li><strong>{{ documentation }}:</strong> {{ documentation }}</li>
        <li><strong>{{ loadingDocumentation }}:</strong> {{ loadingDocumentation }}</li>
        <li><strong>{{ selectDocumentToView }}:</strong> {{ selectDocumentToView }}</li>
        <li><strong>{{ chooseFileFromSidebar }}:</strong> {{ chooseFileFromSidebar }}</li>
        <li><strong>{{ fileSize }}:</strong> {{ fileSize }}</li>
        <li><strong>{{ lastModified }}:</strong> {{ lastModified }}</li>
      </ul>
    </div>

    <!-- Greenfire Tab Translations -->
    <div class="greenfire-section">
      <h3>Greenfire Tab Translations</h3>
      <ul>
        <li><strong>{{ greenfireManagement }}:</strong> {{ greenfireManagement }}</li>
        <li><strong>{{ developers }}:</strong> {{ developers }}</li>
        <li><strong>{{ specialThanksTo }}:</strong> {{ specialThanksTo }}</li>
        <li><strong>{{ pastDevelopers }}:</strong> {{ pastDevelopers }}</li>
        <li><strong>{{ pastGraphicDesigners }}:</strong> {{ pastGraphicDesigners }}</li>
      </ul>
    </div>

    <!-- Universe Tab Translations -->
    <div class="universe-section">
      <h3>Universe Tab Translations</h3>
      <ul>
        <li><strong>{{ greenfireUniverse }}:</strong> {{ greenfireUniverse }}</li>
        <li><strong>{{ bridgingCryptocurrencyEcosystem }}:</strong> {{ bridgingCryptocurrencyEcosystem }}</li>
        <li><strong>{{ cryptocurrencyBookkeepingWallet }}:</strong> {{ cryptocurrencyBookkeepingWallet }}</li>
        <li><strong>{{ marketplaceElectronicsCrypto }}:</strong> {{ marketplaceElectronicsCrypto }}</li>
        <li><strong>{{ comingSoon }}:</strong> {{ comingSoon }}</li>
        <li><strong>{{ redacted }}:</strong> {{ redacted }}</li>
      </ul>
    </div>

    <!-- Contribute Tab Translations -->
    <div class="contribute-section">
      <h3>Contribute Tab Translations</h3>
      <ul>
        <li><strong>{{ contributeToSparkplate }}:</strong> {{ contributeToSparkplate }}</li>
        <li><strong>{{ githubRepository }}:</strong> {{ githubRepository }}</li>
        <li><strong>{{ openSourceProject }}:</strong> {{ openSourceProject }}</li>
        <li><strong>{{ howToCloneRepository }}:</strong> {{ howToCloneRepository }}</li>
        <li><strong>{{ howToSubmitPullRequest }}:</strong> {{ howToSubmitPullRequest }}</li>
        <li><strong>{{ reportingIssues }}:</strong> {{ reportingIssues }}</li>
      </ul>
    </div>

    <!-- Donations Tab Translations -->
    <div class="donations-section">
      <h3>Donations Tab Translations</h3>
      <ul>
        <li><strong>{{ supportSparkplate }}:</strong> {{ supportSparkplate }}</li>
        <li><strong>{{ donationsHelpMaintain }}:</strong> {{ donationsHelpMaintain }}</li>
        <li><strong>{{ cryptocurrencyDonations }}:</strong> {{ cryptocurrencyDonations }}</li>
        <li><strong>{{ qrCodeFor }}:</strong> {{ qrCodeFor }}</li>
        <li><strong>{{ copyAddress }}:</strong> {{ copyAddress }}</li>
        <li><strong>{{ addressCopied }}:</strong> {{ addressCopied }}</li>
      </ul>
    </div>

    <!-- Common UI Elements -->
    <div class="ui-section">
      <h3>Common UI Elements</h3>
      <ul>
        <li><strong>{{ loading }}:</strong> {{ loading }}</li>
        <li><strong>{{ error }}:</strong> {{ error }}</li>
        <li><strong>{{ close }}:</strong> {{ close }}</li>
        <li><strong>{{ open }}:</strong> {{ open }}</li>
        <li><strong>{{ copy }}:</strong> {{ copy }}</li>
        <li><strong>{{ copied }}:</strong> {{ copied }}</li>
      </ul>
    </div>

    <!-- Current Language Info -->
    <div class="info-section">
      <h3>Current Language Info</h3>
      <p><strong>Code:</strong> {{ currentLanguage }}</p>
      <p><strong>Name:</strong> {{ currentLanguageName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAboutTranslations, useAboutLanguageSelector } from '@/composables/useAboutTranslations'

const { 
  currentLanguage, 
  availableLanguages, 
  changeLanguage, 
  loadSavedLanguage,
  // Individual translations
  sparkplate,
  version,
  main,
  notes,
  greenfire,
  universe,
  contribute,
  donations,
  hostname,
  os,
  node,
  electron,
  database,
  installedRAM,
  cpu,
  clearStore,
  documentation,
  loadingDocumentation,
  selectDocumentToView,
  chooseFileFromSidebar,
  fileSize,
  lastModified,
  greenfireManagement,
  developers,
  specialThanksTo,
  pastDevelopers,
  pastGraphicDesigners,
  greenfireUniverse,
  bridgingCryptocurrencyEcosystem,
  cryptocurrencyBookkeepingWallet,
  marketplaceElectronicsCrypto,
  comingSoon,
  redacted,
  contributeToSparkplate,
  githubRepository,
  openSourceProject,
  howToCloneRepository,
  howToSubmitPullRequest,
  reportingIssues,
  supportSparkplate,
  donationsHelpMaintain,
  cryptocurrencyDonations,
  qrCodeFor,
  copyAddress,
  addressCopied,
  loading,
  error,
  close,
  open,
  copy,
  copied
} = useAboutTranslations()

const { changeLanguage: changeAboutLanguage } = useAboutLanguageSelector()

// Get current language display name
const currentLanguageName = computed(() => {
  const lang = availableLanguages.value.find(l => l.code === currentLanguage.value)
  return lang?.name || 'Unknown'
})

onMounted(() => {
  loadSavedLanguage()
})
</script>

<style scoped>
.about-translation-example {
  @apply p-6 max-w-6xl mx-auto space-y-6;
}

.language-section,
.main-section,
.tabs-section,
.notes-section,
.greenfire-section,
.universe-section,
.contribute-section,
.donations-section,
.ui-section,
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

.tab-names {
  @apply flex flex-wrap gap-2;
}

.tab-name {
  @apply px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm;
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
  .main-section,
  .tabs-section,
  .notes-section,
  .greenfire-section,
  .universe-section,
  .contribute-section,
  .donations-section,
  .ui-section,
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
  
  .tab-name {
    @apply bg-blue-900 text-blue-200;
  }
}
</style>
