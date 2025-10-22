/**
 * Vue Composable for About Modal Translations
 * Provides reactive translations for About modal components
 */

import { ref, computed, onMounted, type Ref } from 'vue'
import { getAboutTranslation, getAboutLanguageTranslations, aboutAvailableLanguages, type AboutSupportedLanguage, type AboutTranslations } from '@/locales/aboutTranslations'

// Global language state for About modal (can be synced with main app language)
const currentAboutLanguage = ref<AboutSupportedLanguage>('en')

/**
 * Composable for About modal translations
 * @param language - Optional language override
 * @returns Translation utilities
 */
export function useAboutTranslations(language?: Ref<AboutSupportedLanguage>) {
  const lang = language || currentAboutLanguage
  
  // Get all translations for current language
  const translations = computed(() => getAboutLanguageTranslations(lang.value))
  
  // Translation function
  const t = (key: keyof AboutTranslations) => getAboutTranslation(key, lang.value)
  
  // Change language
  const setLanguage = (newLanguage: AboutSupportedLanguage) => {
    currentAboutLanguage.value = newLanguage
    
    // Save language preference for About modal
    localStorage.setItem('sparkplate-about-language', newLanguage)
  }
  
  // Get available languages
  const languages = computed(() => aboutAvailableLanguages)
  
  // Load saved language preference
  const loadSavedLanguage = () => {
    const saved = localStorage.getItem('sparkplate-about-language') as AboutSupportedLanguage
    if (saved && aboutAvailableLanguages.some(lang => lang.code === saved)) {
      setLanguage(saved)
    }
  }
  
  return {
    // Current language
    language: lang,
    
    // All translations for current language
    translations,
    
    // Translation function
    t,
    
    // Language utilities
    setLanguage,
    languages,
    loadSavedLanguage,
    
    // Individual translations (for template use)
    sparkplate: computed(() => t('sparkplate')),
    version: computed(() => t('version')),
    
    // Tab Names
    main: computed(() => t('main')),
    notes: computed(() => t('notes')),
    releaseNotes: computed(() => t('releaseNotes')),
    greenfire: computed(() => t('greenfire')),
    universe: computed(() => t('universe')),
    contribute: computed(() => t('contribute')),
    donations: computed(() => t('donations')),
    
    // Main Tab - System Information
    hostname: computed(() => t('hostname')),
    os: computed(() => t('os')),
    node: computed(() => t('node')),
    electron: computed(() => t('electron')),
    database: computed(() => t('database')),
    installedRAM: computed(() => t('installedRAM')),
    cpu: computed(() => t('cpu')),
    clearStore: computed(() => t('clearStore')),
    sparkplateLogo: computed(() => t('sparkplateLogo')),
    
    // Notes Tab - Documentation
    documentation: computed(() => t('documentation')),
    loadingDocumentation: computed(() => t('loadingDocumentation')),
    selectDocumentToView: computed(() => t('selectDocumentToView')),
    chooseFileFromSidebar: computed(() => t('chooseFileFromSidebar')),
    fileSize: computed(() => t('fileSize')),
    lastModified: computed(() => t('lastModified')),
    
    // Greenfire Tab - Team Information
    greenfireManagement: computed(() => t('greenfireManagement')),
    developers: computed(() => t('developers')),
    specialThanksTo: computed(() => t('specialThanksTo')),
    pastDevelopers: computed(() => t('pastDevelopers')),
    pastGraphicDesigners: computed(() => t('pastGraphicDesigners')),
    website: computed(() => t('website')),
    twitter: computed(() => t('twitter')),
    instagram: computed(() => t('instagram')),
    linkedin: computed(() => t('linkedin')),
    keybase: computed(() => t('keybase')),
    github: computed(() => t('github')),
    medium: computed(() => t('medium')),
    
    // Universe Tab - Projects
    greenfireUniverse: computed(() => t('greenfireUniverse')),
    bridgingCryptocurrencyEcosystem: computed(() => t('bridgingCryptocurrencyEcosystem')),
    cryptocurrencyBookkeepingWallet: computed(() => t('cryptocurrencyBookkeepingWallet')),
    marketplaceElectronicsCrypto: computed(() => t('marketplaceElectronicsCrypto')),
    comingSoon: computed(() => t('comingSoon')),
    redacted: computed(() => t('redacted')),
    greenfireLogo: computed(() => t('greenfireLogo')),
    greeneryLogo: computed(() => t('greeneryLogo')),
    techmarketsLogo: computed(() => t('techmarketsLogo')),
    
    // Contribute Tab - Contribution Guide
    contributeToSparkplate: computed(() => t('contributeToSparkplate')),
    githubRepository: computed(() => t('githubRepository')),
    openSourceProject: computed(() => t('openSourceProject')),
    submitPullRequests: computed(() => t('submitPullRequests')),
    reportIssues: computed(() => t('reportIssues')),
    repository: computed(() => t('repository')),
    howToCloneRepository: computed(() => t('howToCloneRepository')),
    getStartedDevelopment: computed(() => t('getStartedDevelopment')),
    cloneRepositoryLocalMachine: computed(() => t('cloneRepositoryLocalMachine')),
    howToSubmitPullRequest: computed(() => t('howToSubmitPullRequest')),
    createNewBranch: computed(() => t('createNewBranch')),
    createNewBranchForFeature: computed(() => t('createNewBranchForFeature')),
    makeChangesCommit: computed(() => t('makeChangesCommit')),
    makeChangesCommitDescriptive: computed(() => t('makeChangesCommitDescriptive')),
    pushBranchGitHub: computed(() => t('pushBranchGitHub')),
    pushBranchToGitHub: computed(() => t('pushBranchToGitHub')),
    goToRepository: computed(() => t('goToRepository')),
    goToSparkplateRepository: computed(() => t('goToSparkplateRepository')),
    clickPullRequestButton: computed(() => t('clickPullRequestButton')),
    fillOutPRTemplate: computed(() => t('fillOutPRTemplate')),
    fillOutPRTemplateDetails: computed(() => t('fillOutPRTemplateDetails')),
    submitPullRequest: computed(() => t('submitPullRequest')),
    submitPullRequestWait: computed(() => t('submitPullRequestWait')),
    waitForReview: computed(() => t('waitForReview')),
    reportingIssues: computed(() => t('reportingIssues')),
    foundBugFeatureRequest: computed(() => t('foundBugFeatureRequest')),
    reportIssueTracker: computed(() => t('reportIssueTracker')),
    visitIssuesPage: computed(() => t('visitIssuesPage')),
    visitIssuesPageGitHub: computed(() => t('visitIssuesPageGitHub')),
    clickNewIssueButton: computed(() => t('clickNewIssueButton')),
    selectIssueTemplate: computed(() => t('selectIssueTemplate')),
    selectAppropriateTemplate: computed(() => t('selectAppropriateTemplate')),
    fillOutRequiredInformation: computed(() => t('fillOutRequiredInformation')),
    fillOutAllRequired: computed(() => t('fillOutAllRequired')),
    clearDescription: computed(() => t('clearDescription')),
    clearDescriptionIssue: computed(() => t('clearDescriptionIssue')),
    stepsToReproduce: computed(() => t('stepsToReproduce')),
    stepsToReproduceBugs: computed(() => t('stepsToReproduceBugs')),
    expectedBehavior: computed(() => t('expectedBehavior')),
    actualBehavior: computed(() => t('actualBehavior')),
    environmentDetails: computed(() => t('environmentDetails')),
    environmentDetailsOS: computed(() => t('environmentDetailsOS')),
    screenshots: computed(() => t('screenshots')),
    screenshotsErrors: computed(() => t('screenshotsErrors')),
    
    // Donations Tab - Support
    supportSparkplate: computed(() => t('supportSparkplate')),
    donationsHelpMaintain: computed(() => t('donationsHelpMaintain')),
    donationsHelpMaintainFree: computed(() => t('donationsHelpMaintainFree')),
    cryptocurrencyDonations: computed(() => t('cryptocurrencyDonations')),
    qrCodeFor: computed(() => t('qrCodeFor')),
    logo: computed(() => t('logo')),
    copyAddress: computed(() => t('copyAddress')),
    addressCopied: computed(() => t('addressCopied')),
    
    // Common UI Elements
    loading: computed(() => t('loading')),
    error: computed(() => t('error')),
    close: computed(() => t('close')),
    open: computed(() => t('open')),
    copy: computed(() => t('copy')),
    copied: computed(() => t('copied'))
  }
}

/**
 * Language selector composable for About modal
 * @returns Language selection utilities
 */
export function useAboutLanguageSelector() {
  const { language, setLanguage, languages, loadSavedLanguage } = useAboutTranslations()
  
  const changeLanguage = (newLanguage: AboutSupportedLanguage) => {
    setLanguage(newLanguage)
  }
  
  // Get current language info
  const currentLanguageInfo = computed(() => {
    return languages.value.find(lang => lang.code === language.value)
  })
  
  // Auto-load saved language on mount
  onMounted(() => {
    loadSavedLanguage()
  })
  
  return {
    currentLanguage: language,
    currentLanguageInfo,
    availableLanguages: languages,
    changeLanguage,
    loadSavedLanguage
  }
}

// Export types for convenience
export type { AboutSupportedLanguage, AboutTranslations } from '@/locales/aboutTranslations'