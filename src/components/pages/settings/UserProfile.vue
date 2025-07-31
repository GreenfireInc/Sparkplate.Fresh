<template>
  <div class="user-profile -mt-8">
    <DomainsAndSocialMedia 
      ref="domainsModal"
      @save="handleDomainsModalSave"
    />
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-2xl font-bold">User Profile</h2>
      <button class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save Changes</button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Column 1 -->
      <div class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input type="text" v-model="profile.firstName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name" />
        </div>      
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input type="text" v-model="profile.company" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company name" />
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2 cursor-pointer hover:text-blue-600" @click="showDomainsModal('domains')">
            Human Readable Domain(s) <span class="text-xs text-blue-600">(click to edit)</span>
          </label>
          <input type="text" v-model="profile.domains" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" placeholder="e.g., example.eth, example.sol" @click="showDomainsModal('domains')" />
        </div>
      </div>
      
      <!-- Column 2 -->
      <div class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input type="text" v-model="profile.lastName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name" />
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input type="text" v-model="profile.website" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com" />
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2 cursor-pointer hover:text-blue-600" @click="showDomainsModal('social')">
            Social Media Presence <span class="text-xs text-blue-600">(click to edit)</span>
          </label>
          <input type="text" v-model="profile.website" disabled class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" placeholder="Instagram, Twitter, LinkedIn, etc." @click="showDomainsModal('social')" />
        </div>
      </div>
      
      <!-- Column 3 -->
      <div class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" v-model="profile.email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email" />
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select v-model="profile.language" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>🇺🇸 English</option>
            <option>🇪🇸 Español</option>
            <option>🇫🇷 Français</option>
            <option>🇩🇪 Deutsch</option>
            <option>🇮🇹 Italiano</option>
            <option>🇵🇹 Português</option>
            <option>🇳🇱 Nederlands </option>
            <option>🇷🇺 Русский</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
          <select v-model="profile.language" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
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

    <div class="form-group mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
      <textarea v-model="profile.bio" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Tell us about yourself"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DomainsAndSocialMedia from '@/components/modals/settings/userprofile/DomainsAndSocialMedia.vue'

export default defineComponent({
  name: 'UserProfile',
  components: {
    DomainsAndSocialMedia
  },
  setup() {
    const profile = ref({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      domains: '',
      language: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      github: '',
      website: '',
      bio: ''
    })

    const domainsModal = ref(null)
    
    const showDomainsModal = (activeTab) => {
      if (domainsModal.value) {
        domainsModal.value.activeMode = activeTab
        domainsModal.value.showModal()
      }
    }
    
    const handleDomainsModalSave = (data) => {
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

    return {
      profile,
      domainsModal,
      showDomainsModal,
      handleDomainsModalSave
    }
  }
})
</script>

<style lang="scss" scoped>
.user-profile {
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm;
  }
}
</style> 