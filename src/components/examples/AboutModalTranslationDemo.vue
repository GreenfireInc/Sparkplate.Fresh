<template>
  <div class="about-translation-demo">
    <h2 class="text-2xl font-bold mb-6">About Modal Translation Demo</h2>
    
    <!-- Language Selector -->
    <div class="language-section mb-8">
      <h3 class="text-lg font-semibold mb-4">Language Selection</h3>
      <div class="flex gap-2 mb-4">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="[
            'px-4 py-2 rounded border transition-colors',
            currentLanguage === lang.code 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ lang.flag }} {{ lang.name }}
        </button>
      </div>
      <p class="text-sm text-gray-600">
        Current Language: <strong>{{ currentLanguageInfo?.name }}</strong> ({{ currentLanguage }})
      </p>
    </div>

    <!-- About Modal Translations Preview -->
    <div class="translations-preview">
      <h3 class="text-lg font-semibold mb-4">About Modal Translations</h3>
      
      <!-- Tab Names -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Tab Names</h4>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('main') }}</strong>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('notes') }}</strong>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('greenfire') }}</strong>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('universe') }}</strong>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('contribute') }}</strong>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <strong>{{ tAbout('donations') }}</strong>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">System Information (Main Tab)</h4>
        <div class="bg-gray-50 p-4 rounded">
          <ul class="space-y-2">
            <li><strong>{{ tAbout('hostname') }}:</strong> example-host</li>
            <li><strong>{{ tAbout('os') }}:</strong> Linux 6.8.0</li>
            <li><strong>{{ tAbout('node') }}:</strong> v23.0.0</li>
            <li><strong>{{ tAbout('electron') }}:</strong> v37.1.0</li>
            <li><strong>{{ tAbout('installedRAM') }}:</strong> 16 GB</li>
            <li><strong>{{ tAbout('cpu') }}:</strong> Intel Core i7</li>
          </ul>
          <button class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {{ tAbout('clearStore') }}
          </button>
        </div>
      </div>

      <!-- Team Information -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Team Information (Greenfire Tab)</h4>
        <div class="bg-gray-50 p-4 rounded">
          <div class="mb-3">
            <strong>{{ tAbout('greenfireManagement') }}:</strong>
            <ul class="ml-4 mt-1">
              <li>Corey S.</li>
              <li>Nicole L.</li>
              <li>Uzma B.</li>
            </ul>
          </div>
          <div class="mb-3">
            <strong>{{ tAbout('developers') }}:</strong>
            <ul class="ml-4 mt-1">
              <li>Aciel O.</li>
              <li>Tim R.</li>
            </ul>
          </div>
          <div class="mb-3">
            <strong>{{ tAbout('specialThanksTo') }}:</strong>
            <ul class="ml-4 mt-1">
              <li>{{ tAbout('pastDevelopers') }}</li>
              <li>{{ tAbout('pastGraphicDesigners') }}</li>
            </ul>
          </div>
          <div class="flex gap-4 text-blue-600">
            <a href="#" class="hover:underline">{{ tAbout('website') }}</a>
            <a href="#" class="hover:underline">{{ tAbout('twitter') }}</a>
            <a href="#" class="hover:underline">{{ tAbout('github') }}</a>
          </div>
        </div>
      </div>

      <!-- Projects Showcase -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Projects (Universe Tab)</h4>
        <div class="bg-gray-50 p-4 rounded">
          <h5 class="font-semibold mb-3">{{ tAbout('greenfireUniverse') }}</h5>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded border">
              <h6 class="font-medium">Greenfire</h6>
              <p class="text-sm text-gray-600">{{ tAbout('bridgingCryptocurrencyEcosystem') }}</p>
            </div>
            <div class="bg-white p-3 rounded border">
              <h6 class="font-medium">Greenery</h6>
              <p class="text-sm text-gray-600">{{ tAbout('cryptocurrencyBookkeepingWallet') }}</p>
            </div>
            <div class="bg-white p-3 rounded border">
              <h6 class="font-medium">Techmarkets</h6>
              <p class="text-sm text-gray-600">{{ tAbout('marketplaceElectronicsCrypto') }}</p>
            </div>
            <div class="bg-gray-100 p-3 rounded border">
              <h6 class="font-medium text-gray-500">{{ tAbout('redacted') }}</h6>
              <p class="text-sm text-gray-500">{{ tAbout('comingSoon') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contribution Guide -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Contribution Guide (Contribute Tab)</h4>
        <div class="bg-gray-50 p-4 rounded">
          <h5 class="font-semibold mb-2">{{ tAbout('contributeToSparkplate') }}</h5>
          <p class="text-sm mb-3">{{ tAbout('openSourceProject') }}</p>
          
          <div class="mb-3">
            <strong>{{ tAbout('howToCloneRepository') }}:</strong>
            <p class="text-sm text-gray-600">{{ tAbout('getStartedDevelopment') }}</p>
          </div>
          
          <div class="mb-3">
            <strong>{{ tAbout('howToSubmitPullRequest') }}:</strong>
            <ol class="text-sm text-gray-600 ml-4 mt-1 list-decimal">
              <li>{{ tAbout('createNewBranchForFeature') }}</li>
              <li>{{ tAbout('makeChangesCommitDescriptive') }}</li>
              <li>{{ tAbout('pushBranchToGitHub') }}</li>
              <li>{{ tAbout('goToSparkplateRepository') }} {{ tAbout('clickPullRequestButton') }}</li>
              <li>{{ tAbout('fillOutPRTemplateDetails') }}</li>
              <li>{{ tAbout('submitPullRequestWait') }}</li>
            </ol>
          </div>
          
          <div>
            <strong>{{ tAbout('reportingIssues') }}:</strong>
            <p class="text-sm text-gray-600">{{ tAbout('foundBugFeatureRequest') }}</p>
          </div>
        </div>
      </div>

      <!-- Support Section -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Support (Donations Tab)</h4>
        <div class="bg-gray-50 p-4 rounded text-center">
          <h5 class="font-semibold mb-2">{{ tAbout('supportSparkplate') }}</h5>
          <p class="text-sm text-gray-600 mb-4">{{ tAbout('donationsHelpMaintainFree') }}</p>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded border">
              <strong>BTC</strong>
              <div class="bg-gray-200 p-2 my-2 text-xs">{{ tAbout('qrCodeFor') }} BTC</div>
              <button class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                {{ tAbout('copyAddress') }}
              </button>
            </div>
            <div class="bg-white p-3 rounded border">
              <strong>ETH</strong>
              <div class="bg-gray-200 p-2 my-2 text-xs">{{ tAbout('qrCodeFor') }} ETH</div>
              <button class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                {{ tAbout('copyAddress') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Documentation -->
      <div class="section mb-6">
        <h4 class="font-medium mb-3">Documentation (Notes Tab)</h4>
        <div class="bg-gray-50 p-4 rounded">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded border">
              <h6 class="font-medium mb-2">{{ tAbout('documentation') }}</h6>
              <div class="text-sm text-gray-600">{{ tAbout('loadingDocumentation') }}</div>
            </div>
            <div class="bg-white p-3 rounded border">
              <h6 class="font-medium mb-2">{{ tAbout('selectDocumentToView') }}</h6>
              <p class="text-sm text-gray-600">{{ tAbout('chooseFileFromSidebar') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Translation Statistics -->
    <div class="stats-section">
      <h3 class="text-lg font-semibold mb-4">Translation Statistics</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded">
          <h4 class="font-medium text-blue-800">Languages Supported</h4>
          <p class="text-2xl font-bold text-blue-600">{{ languages.length }}</p>
          <p class="text-sm text-blue-600">{{ languages.map(l => l.name).join(', ') }}</p>
        </div>
        <div class="bg-green-50 p-4 rounded">
          <h4 class="font-medium text-green-800">Translation Keys</h4>
          <p class="text-2xl font-bold text-green-600">{{ aboutKeys.length }}+</p>
          <p class="text-sm text-green-600">Complete coverage for all components</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'

const { 
  tAbout,
  currentLanguage,
  currentLanguageInfo,
  languages,
  changeLanguage,
  aboutKeys
} = useUnifiedTranslations()
</script>

<style scoped>
.about-translation-demo {
  @apply max-w-6xl mx-auto p-6;
}

.section {
  @apply border-l-4 border-blue-500 pl-4;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-gray-50 {
    @apply bg-gray-800 text-gray-200;
  }
  
  .bg-white {
    @apply bg-gray-700 text-gray-200;
  }
  
  .text-gray-600 {
    @apply text-gray-400;
  }
  
  .text-gray-700 {
    @apply text-gray-300;
  }
  
  .border-gray-300 {
    @apply border-gray-600;
  }
  
  .bg-blue-50 {
    @apply bg-blue-900;
  }
  
  .bg-green-50 {
    @apply bg-green-900;
  }
  
  .text-blue-800 {
    @apply text-blue-200;
  }
  
  .text-green-800 {
    @apply text-green-200;
  }
}
</style>
