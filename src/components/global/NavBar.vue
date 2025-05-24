<template>
  <nav
    class="flex justify-between items-center bg-blue-600 text-white px-5 h-16 w-100"
  >
    <div class="flex items-center">
      <div class="mr-5">
        <svg
          v-if="menuType === 'macro'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          @click="changeMenuType('micro')"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path fill="white" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
        </svg>
        <svg
          v-if="menuType === 'micro'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          @click="changeMenuType('macro')"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path fill="white" d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
        </svg>
      </div>
      <router-link to="/" class="brand-logo text-2xl font-semibold">
        Sparkplate
      </router-link>
      <!-- <span v-if="accountsStore.authenticated" class="ml-10"
        >Total Assets: {{ totalAssets }}</span
      > -->
    </div>
    <div class="flex items-center">
      <router-link to="/directories" class="mx-2 text-white hover:underline">Directories</router-link>
      <router-link to="/test" class="mx-2 text-white hover:underline">Test</router-link>
      <router-link to="/settings/general" class="mx-2 text-white hover:underline">Settings</router-link>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue'
// import { useStore } from 'vuex' // Removed Vuex
// import { useAccountsStore } from '@/stores/useAccountsStore'
// import { useUIStore } from '@/stores/uiStore' // Added UI Pinia store
// import { useWalletsStore } from '@/stores/walletsStore' // Added Wallets Pinia store (placeholder)
// Comment out SparkMD5 since it's not being used
// import * as SparkMD5 from 'spark-md5'

// Store setup
// const store = useStore() // Removed Vuex store initialization
// const accountsStore = useAccountsStore()
// const uiStore = useUIStore() // Initialized UI Pinia store
// const walletsStore = useWalletsStore() // Initialized Wallets Pinia store

// Computed properties
// const menuType = computed(() => uiStore.getMenuType) // Updated to use UI Pinia store getter
const menuType = ref('macro') // Default value for now

/*
const totalAssetsValue = computed(
  () => 0 // Placeholder value after commenting out walletsStore
  // () => walletsStore.totalAssetsValue // Updated to use Wallets Pinia store (adjust if getter)
)
*/

// Comment out the user computed property as it's not being used
// const user = computed(() => {
//   return accountsStore.active
// })

// Commented out as it's currently unused
// const gravatarLink = computed(() => {
//   let email
//   if (!user.value) email = 'sample@user.sparkplate' // replace this with a template user icon
//   else email = user.value.email
//   return `https://www.gravatar.com/avatar/${SparkMD5.hash(
//     email
//   )}?d=identicon`
// })

const totalAssets = computed(() => {
  // const total = totalAssetsValue.value // Removed this line
  // Assuming formatCurrencyWithSettings is available globally or in the store
  // return walletsStore.formatCurrencyWithSettings(total, 2) // Updated to use Wallets Pinia store (adjust if getter/action)
  return '$0.00' // Placeholder value
})

// Methods
const changeMenuType = (type) => {
  // store.dispatch('changeMenuType', type) // Removed Vuex dispatch
  // uiStore.setMenuType(type) // Updated to use UI Pinia store action
  menuType.value = type // Directly update the ref for now
}

// Commented out as it's currently unused
// const logoutUser = () => {
//   if (user.value) {
//     store.dispatch('accounts/logout', user.value.id)
//   }
// }

export default {
  name: 'NavBar',
  setup() {
    return {
      menuType,
      totalAssets,
      changeMenuType
    }
  }
}
</script>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.user-actions {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
  border-radius: 0.25rem;
  position: absolute;
  right: 0;
  font-weight: 800;
  flex-direction: column;
  z-index: 10;
  margin-top: 0;
  display: none;
  top: 100%;
  width: max-content;
}

.user-actions > span {
  background-color: #f9f9f9;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  display: block;
}

.user-menu:hover .user-actions {
  display: flex;
}
</style>
