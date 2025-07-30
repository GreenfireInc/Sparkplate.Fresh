<template>
  <div class="user-profile -mt-8">
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Human Readable Domain(s)</label>
          <input type="text" v-model="profile.domains" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., example.eth, example.sol" />
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Sociale Media Presence</label>
          <input type="text" v-model="profile.website" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Instagram, Twitter, LinkedIn, etc." />
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

export default defineComponent({
  name: 'UserProfile',
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

    return {
      profile
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