<template>
  <div class="user-profile">
    <h2 class="text-2xl font-bold mb-6">User Profile</h2>
    
    <div class="form-group mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Profile Picture
      </label>
      <div class="flex items-center space-x-4">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Change Photo
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input 
          type="text" 
          v-model="profile.firstName"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter first name"
        />
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input 
          type="text" 
          v-model="profile.lastName"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter last name"
        />
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input 
          type="email" 
          v-model="profile.email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input 
          type="tel" 
          v-model="profile.phone"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />
      </div>
    </div>

    <div class="form-group mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Bio
      </label>
      <textarea 
        v-model="profile.bio"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Tell us about yourself"
      ></textarea>
    </div>

    <div class="flex justify-end mt-6">
      <button class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save Changes
      </button>
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
      email: '',
      phone: '',
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
  .form-group {
    margin-bottom: 1rem;
  }
}
</style> 