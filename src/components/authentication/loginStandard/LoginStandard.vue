<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex flex-col relative overflow-hidden">
    <!-- Animated Background Icons -->
    <div class="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div v-for="i in 20" :key="i" 
           class="absolute animate-float"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`,
             animationDuration: `${10 + Math.random() * 10}s`
           }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="20 + Math.random() * 40"
          :height="20 + Math.random() * 40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>
    </div>

    <!-- User Selection - Bottom Left -->
    <div class="absolute bottom-24 left-8 z-20">
      <div class="space-y-3">
        <UserCard
          v-for="user in displayUsers"
          :key="user.id"
          :name="user.name"
          :is-selected="selectedUser === user.name"
          @click="onUserSelect(user.name)"
        />
      </div>
    </div>

    <!-- Main Login Area - Center/Right -->
    <div class="flex-1 flex items-center justify-center p-8 z-10">
      <div class="text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <img
            src="/assets/icons/greenfire/proper/greenfire.black.svg"
            alt="Greenfire logo"
            class="w-16 h-16"
          />
        </div>
        <h2 class="text-xl font-light mb-2">{{ t('welcome') }}</h2>
        <p class="text-white/80 font-light">{{ t('selectUserPrompt') }}</p>
      </div>
    </div>

    <!-- Bottom Right Options -->
    <div class="absolute bottom-8 right-8 flex flex-col items-end gap-2 z-10">
      <div class="flex items-center gap-2">
        <!-- Language Selector -->
        <div class="relative" ref="languageSelector">
          <button
            @click="showLanguageMenu = !showLanguageMenu"
            class="h-8 w-8 flex items-center justify-center text-white bg-transparent rounded transition-colors"
          >
            <span class="text-lg">{{ currentLanguageFlag }}</span>
          </button>
          <Transition name="fade">
            <div
              v-if="showLanguageMenu"
              class="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[120px]"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="selectLanguage(lang.code)"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-2"
              >
                <span>{{ lang.flag }}</span>
                <span class="text-sm">{{ lang.name }}</span>
              </button>
            </div>
          </Transition>
        </div>
        
        <!-- Login Options -->
        <LoginOptions
          :onTemporaryKeyClick="handleTemporaryKeyClick"
          :onServerSelectionClick="handleServerSelectionClick"
        />
        <!-- <img 
          src="/assets/icons/greenfire/loginStandard/loginStandard.svg" 
          alt="Login Options"
          class="w-4 h-4"
        /> -->
        <!-- <Fingerprint :size="16" class="text-white" /> -->
      </div>
      <p class="text-white/60 text-xs">Ver. {{ version }}</p>
    </div>

    <!-- Modals -->
    <SignupModal v-model:open="showSignupModal" />
    <UserModal
      v-model:open="showUserModal"
      :userName="selectedUser"
      :userEmail="selectedUserEmail"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Fingerprint } from 'lucide-vue-next'
import UserCard from '../user/UserCard.vue'
import SignupModal from '../registration/SignupModal.vue'
import UserModal from '../user/UserModal.vue'
import LoginOptions from './LoginOptions.vue'
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'
import { useAuth } from '@/composables/useAuth'
import packageJson from '../../../../package.json'

const version = packageJson.version

const { t, locale, changeLanguage, languages, currentLanguageInfo } = useUnifiedTranslations()
const { mockUsers } = useAuth()

const selectedUser = ref('')
const selectedUserEmail = ref('')
const showSignupModal = ref(false)
const showUserModal = ref(false)
const showLanguageMenu = ref(false)
const languageSelector = ref<HTMLElement | null>(null)

const displayUsers = computed(() => [
  ...mockUsers,
  { id: 0, name: t('createAccount'), email: '' }
])

const currentLanguageFlag = computed(() => {
  return currentLanguageInfo.value?.flag || '🇬🇧'
})

const onUserSelect = (userName: string) => {
  if (userName === t('createAccount')) {
    showSignupModal.value = true
  } else {
    const user = mockUsers.find(u => u.name === userName)
    selectedUser.value = userName
    selectedUserEmail.value = user?.email || ''
    showUserModal.value = true
  }
}

const selectLanguage = (langCode: typeof locale.value) => {
  changeLanguage(langCode)
  showLanguageMenu.value = false
}

const handleTemporaryKeyClick = () => {
  console.log('Temporary Key option selected')
  // TODO: Implement temporary key modal or functionality
}

const handleServerSelectionClick = () => {
  console.log('Server Selection option selected')
  // TODO: Implement server selection modal or functionality
}

const handleClickOutside = (event: Event) => {
  if (languageSelector.value && !languageSelector.value.contains(event.target as Node)) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(90deg);
  }
  50% {
    transform: translate(-10px, 10px) rotate(180deg);
  }
  75% {
    transform: translate(10px, 10px) rotate(270deg);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

