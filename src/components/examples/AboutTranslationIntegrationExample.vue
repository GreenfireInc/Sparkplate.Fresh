<template>
  <div class="about-integration-example">
    <h2>About Modal Translation Integration Example</h2>
    
    <!-- Language Selector -->
    <div class="language-section">
      <h3>{{ t('language') }} Selector</h3>
      <div class="language-buttons">
        <button 
          v-for="lang in availableLanguages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="{ active: currentLanguage === lang.code }"
          class="lang-btn"
        >
          {{ lang.flag }} {{ lang.name }}
        </button>
      </div>
    </div>

    <!-- Main Tab Example -->
    <div class="main-section">
      <h3>{{ main }} Tab Example</h3>
      <div class="system-info">
        <ul>
          <li><b>{{ hostname }}:</b> example-host</li>
          <li><b>{{ os }}:</b> Linux 6.8.0</li>
          <li><b>{{ node }}:</b> v23.0.0</li>
          <li><b>{{ electron }}:</b> v37.1.0</li>
          <li><b>{{ installedRAM }}:</b> 16 GB</li>
          <li><b>{{ cpu }}:</b> Intel Core i7</li>
        </ul>
        <button class="clear-store-btn">{{ clearStore }}</button>
      </div>
    </div>

    <!-- Notes Tab Example -->
    <div class="notes-section">
      <h3>{{ notes }} Tab Example</h3>
      <div class="docs-example">
        <div class="sidebar">
          <h4>{{ documentation }}</h4>
          <div class="loading-example">{{ loadingDocumentation }}</div>
        </div>
        <div class="content">
          <h4>{{ selectDocumentToView }}</h4>
          <p>{{ chooseFileFromSidebar }}</p>
        </div>
      </div>
    </div>

    <!-- Greenfire Tab Example -->
    <div class="greenfire-section">
      <h3>{{ greenfire }} Tab Example</h3>
      <div class="team-info">
        <div class="team-section">
          <label class="font-semibold">{{ greenfireManagement }}:</label>
          <ul>
            <li>Corey S.</li>
            <li>Nicole L.</li>
            <li>Uzma B.</li>
          </ul>
        </div>
        <div class="team-section">
          <label class="font-semibold">{{ developers }}:</label>
          <ul>
            <li>Aciel O.</li>
            <li>Tim R.</li>
          </ul>
        </div>
        <div class="team-section">
          <label class="font-semibold">{{ specialThanksTo }}:</label>
          <ul>
            <li>{{ pastDevelopers }}</li>
            <li>{{ pastGraphicDesigners }}</li>
          </ul>
        </div>
        <div class="social-links">
          <a href="#">{{ website }}</a> | 
          <a href="#">{{ twitter }}</a> | 
          <a href="#">{{ github }}</a>
        </div>
      </div>
    </div>

    <!-- Universe Tab Example -->
    <div class="universe-section">
      <h3>{{ universe }} Tab Example</h3>
      <div class="projects-preview">
        <h4>{{ greenfireUniverse }}</h4>
        <div class="project-cards">
          <div class="project-card">
            <h5>Greenfire</h5>
            <p>{{ bridgingCryptocurrencyEcosystem }}</p>
          </div>
          <div class="project-card">
            <h5>Greenery</h5>
            <p>{{ cryptocurrencyBookkeepingWallet }}</p>
          </div>
          <div class="project-card">
            <h5>Techmarkets</h5>
            <p>{{ marketplaceElectronicsCrypto }}</p>
          </div>
          <div class="project-card redacted">
            <h5>{{ redacted }}</h5>
            <p>{{ comingSoon }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contribute Tab Example -->
    <div class="contribute-section">
      <h3>{{ contribute }} Tab Example</h3>
      <div class="contribution-guide">
        <h4>{{ contributeToSparkplate }}</h4>
        <div class="guide-section">
          <h5>{{ githubRepository }}</h5>
          <p>{{ openSourceProject }}</p>
        </div>
        <div class="guide-section">
          <h5>{{ howToCloneRepository }}</h5>
          <p>{{ getStartedDevelopment }}</p>
        </div>
        <div class="guide-section">
          <h5>{{ howToSubmitPullRequest }}</h5>
          <ol>
            <li>{{ createNewBranchForFeature }}</li>
            <li>{{ makeChangesCommitDescriptive }}</li>
            <li>{{ pushBranchToGitHub }}</li>
            <li>{{ goToSparkplateRepository }} {{ clickPullRequestButton }}</li>
            <li>{{ fillOutPRTemplateDetails }}</li>
            <li>{{ submitPullRequestWait }}</li>
          </ol>
        </div>
        <div class="guide-section">
          <h5>{{ reportingIssues }}</h5>
          <p>{{ foundBugFeatureRequest }}</p>
          <ul>
            <li>{{ visitIssuesPageGitHub }}</li>
            <li>{{ clickNewIssueButton }}</li>
            <li>{{ selectAppropriateTemplate }}</li>
            <li>{{ fillOutAllRequired }}:
              <ul>
                <li>{{ clearDescriptionIssue }}</li>
                <li>{{ stepsToReproduceBugs }}</li>
                <li>{{ expectedBehavior }}</li>
                <li>{{ actualBehavior }}</li>
                <li>{{ environmentDetailsOS }}</li>
                <li>{{ screenshotsErrors }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Donations Tab Example -->
    <div class="donations-section">
      <h3>{{ donations }} Tab Example</h3>
      <div class="support-info">
        <h4>{{ supportSparkplate }}</h4>
        <p>{{ donationsHelpMaintainFree }}</p>
        <div class="crypto-example">
          <h5>{{ cryptocurrencyDonations }}</h5>
          <div class="wallet-cards">
            <div class="wallet-card">
              <span>BTC</span>
              <div class="qr-placeholder">[{{ qrCodeFor }} BTC]</div>
              <button>{{ copyAddress }}</button>
            </div>
            <div class="wallet-card">
              <span>ETH</span>
              <div class="qr-placeholder">[{{ qrCodeFor }} ETH]</div>
              <button>{{ copyAddress }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Language Info -->
    <div class="info-section">
      <h3>Current Language Info</h3>
      <p><strong>Code:</strong> {{ currentLanguage }}</p>
      <p><strong>Name:</strong> {{ currentLanguageInfo?.name }}</p>
      <p><strong>Flag:</strong> {{ currentLanguageInfo?.flag }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAboutTranslations, useAboutLanguageSelector } from '@/composables/useAboutTranslations'
import { useI18n } from '@/composables/useI18n'

// Get About modal translations
const { 
  t,
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
  installedRAM,
  cpu,
  clearStore,
  documentation,
  loadingDocumentation,
  selectDocumentToView,
  chooseFileFromSidebar,
  greenfireManagement,
  developers,
  specialThanksTo,
  pastDevelopers,
  pastGraphicDesigners,
  website,
  twitter,
  github,
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
  getStartedDevelopment,
  howToSubmitPullRequest,
  createNewBranchForFeature,
  makeChangesCommitDescriptive,
  pushBranchToGitHub,
  goToSparkplateRepository,
  clickPullRequestButton,
  fillOutPRTemplateDetails,
  submitPullRequestWait,
  reportingIssues,
  foundBugFeatureRequest,
  visitIssuesPageGitHub,
  clickNewIssueButton,
  selectAppropriateTemplate,
  fillOutAllRequired,
  clearDescriptionIssue,
  stepsToReproduceBugs,
  expectedBehavior,
  actualBehavior,
  environmentDetailsOS,
  screenshotsErrors,
  supportSparkplate,
  donationsHelpMaintainFree,
  cryptocurrencyDonations,
  qrCodeFor,
  copyAddress
} = useAboutTranslations()

// Get language selector
const { 
  currentLanguage, 
  currentLanguageInfo, 
  availableLanguages, 
  changeLanguage 
} = useAboutLanguageSelector()

// Get main app translations for "Language" label
const { t: tMain } = useI18n()
</script>

<style scoped>
.about-integration-example {
  @apply p-6 max-w-6xl mx-auto space-y-8;
}

.language-section,
.main-section,
.notes-section,
.greenfire-section,
.universe-section,
.contribute-section,
.donations-section,
.info-section {
  @apply bg-gray-50 p-6 rounded-lg;
}

.language-buttons {
  @apply flex flex-wrap gap-2 mt-3;
}

.lang-btn {
  @apply px-4 py-2 border border-gray-300 rounded text-sm font-medium transition-colors;
}

.lang-btn:hover {
  @apply bg-gray-100;
}

.lang-btn.active {
  @apply bg-blue-500 text-white border-blue-500;
}

.system-info ul {
  @apply space-y-2 mb-4;
}

.clear-store-btn {
  @apply bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700;
}

.docs-example {
  @apply grid grid-cols-2 gap-4;
}

.sidebar, .content {
  @apply bg-white p-4 rounded border;
}

.loading-example {
  @apply text-gray-500 text-sm;
}

.team-info .team-section {
  @apply mb-4;
}

.team-info ul {
  @apply ml-4 space-y-1;
}

.social-links {
  @apply mt-4 text-blue-600;
}

.social-links a {
  @apply hover:underline;
}

.project-cards {
  @apply grid grid-cols-2 gap-3 mt-3;
}

.project-card {
  @apply bg-white p-3 rounded border;
}

.project-card.redacted {
  @apply bg-gray-100 text-gray-500;
}

.project-card h5 {
  @apply font-semibold mb-2;
}

.project-card p {
  @apply text-sm;
}

.contribution-guide .guide-section {
  @apply mb-6;
}

.contribution-guide h5 {
  @apply font-semibold mb-2;
}

.contribution-guide ol, .contribution-guide ul {
  @apply ml-4 space-y-1;
}

.contribution-guide ul ul {
  @apply ml-4 mt-2;
}

.wallet-cards {
  @apply flex gap-4 mt-3;
}

.wallet-card {
  @apply bg-white p-4 rounded border text-center;
}

.qr-placeholder {
  @apply bg-gray-200 p-4 my-2 text-sm text-gray-600;
}

.wallet-card button {
  @apply bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600;
}

h3 {
  @apply text-lg font-semibold mb-4;
}

h4 {
  @apply text-base font-semibold mb-3;
}

h5 {
  @apply text-sm font-semibold mb-2;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .language-section,
  .main-section,
  .notes-section,
  .greenfire-section,
  .universe-section,
  .contribute-section,
  .donations-section,
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
  
  .sidebar, .content, .project-card, .wallet-card {
    @apply bg-gray-700 border-gray-600;
  }
  
  .project-card.redacted {
    @apply bg-gray-600 text-gray-400;
  }
  
  .qr-placeholder {
    @apply bg-gray-600 text-gray-400;
  }
}
</style>
