<template>
  <div class="user-profile -mt-8">
    <DomainsAndSocialMedia 
      ref="domainsModal"
      @save="handleDomainsModalSave"
    />
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold">{{ t('userProfile') }}</h2>
      <button class="px-4 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600">{{ t('saveChanges') }}</button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      <!-- Column 1 -->
      <div class="space-y-3">
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('firstName') }}</label>
          <input type="text" v-model="profile.firstName" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :placeholder="t('enterFirstName')" />
        </div>      
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('company') }}</label>
          <input type="text" v-model="profile.company" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :placeholder="t('enterCompanyName')" />
        </div>
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1 cursor-pointer hover:text-blue-600" @click="showDomainsModal('domains')">
            {{ t('humanReadableDomains') }} <span class="text-xs text-blue-600">{{ t('clickToEdit') }}</span>
          </label>
          <input type="text" v-model="profile.domains" disabled class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" :placeholder="t('domainsPlaceholder')" @click="showDomainsModal('domains')" />
        </div>
      </div>
      
      <!-- Column 2 -->
      <div class="space-y-3">
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('lastName') }}</label>
          <input type="text" v-model="profile.lastName" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :placeholder="t('enterLastName')" />
        </div>
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">Website</label>
          <input type="text" v-model="profile.website" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :placeholder="t('websitePlaceholder')" />
        </div>
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1 cursor-pointer hover:text-blue-600" @click="showDomainsModal('social')">
            {{ t('socialMediaPresence') }} <span class="text-xs text-blue-600">{{ t('clickToEdit') }}</span>
          </label>
          <input type="text" v-model="profile.website" disabled class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" :placeholder="t('socialPlaceholder')" @click="showDomainsModal('social')" />
        </div>
      </div>
      
      <!-- Column 3 -->
      <div class="space-y-3">
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('email') }}</label>
          <input type="email" v-model="profile.email" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :placeholder="t('enterEmail')" />
        </div>
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('defaultLanguage') }}</label>
          <select v-model="profile.language" @change="handleLanguageChange" class="block w-full pl-2 pr-8 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.flag }} {{ lang.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('defaultCurrency') }}</label>
          <select v-model="profile.currency" class="block w-full pl-2 pr-8 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
            <option>🇺🇸 USD ($)</option>
            <option>🇪🇺 EUR (€)</option>
            <option>🇬🇧 GBP (£)</option>
            <option>🇯🇵 JPY (¥)</option>
            <option>🇨🇳 CNY (¥)</option>
            <option>🇧🇷 BRL (R$)</option>
            <option>🇨🇦 CAD ($)</option>
            <option>🇷🇺 RUB (₽)</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
        <input type="text" v-model="profile.twitter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username" />
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
        <input type="text" v-model="profile.instagram" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
      </div>
      
      
    </div> -->

    <div class="form-group mt-3">
      <label class="block text-xs font-medium text-gray-700 mb-1">{{ t('bio') }}</label>
      <textarea v-model="profile.bio" class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" :placeholder="t('tellUsAboutYourself')"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DomainsAndSocialMedia from '@/components/modals/settings/userprofile/DomainsAndSocialMedia.vue'
import { useI18n } from '@/composables/useI18n'

const { locale, setLocale, languages, t } = useI18n()

const profile = ref({
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  domains: '',
  language: locale.value,
  currency: 'USD',
  twitter: '',
  instagram: '',
  linkedin: '',
  github: '',
  website: '',
  bio: ''
})

const handleLanguageChange = () => {
  setLocale(profile.value.language)
}

const domainsModal = ref<InstanceType<typeof DomainsAndSocialMedia> | null>(null)

const showDomainsModal = (activeTab: string) => {
  if (domainsModal.value) {
    domainsModal.value.activeMode = activeTab
    domainsModal.value.showModal()
  }
}

const handleDomainsModalSave = (data: { domains?: Record<string, string>, social?: Record<string, string> }) => {
  // Update profile with data from modal
  if (data.domains) {
    // Format domains as comma-separated list
    const domainsList = Object.values(data.domains).filter(Boolean)
    profile.value.domains = domainsList.join(', ')
  }
  
  if (data.social) {
    // Update social media accounts
    profile.value.twitter = data.social.twitter || ''
    profile.value.instagram = data.social.instagram || ''
    profile.value.linkedin = data.social.linkedin || ''
    profile.value.github = data.social.github || ''
    
    // Format social media as comma-separated list for display
    const socialList = Object.entries(data.social)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
    profile.value.website = socialList.length ? socialList.join(', ') : ''
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm;
  }
}
</style> 