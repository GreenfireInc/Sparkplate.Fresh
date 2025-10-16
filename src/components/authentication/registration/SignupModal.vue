<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Blue Header Section -->
          <div class="bg-blue-600 px-8 py-8 text-center">
            <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="w-16 h-16 object-cover" />
              <User v-else :size="32" class="text-white" />
            </div>
            <h2 class="text-2xl font-light text-white">{{ t('createAccount') }}</h2>
            <p class="text-white/80 mt-1 font-light">{{ t('enterDetailsToSignup') }}</p>
          </div>

          <!-- White Content Section -->
          <div class="px-8 py-6 space-y-4">
            <!-- First Name -->
            <div class="space-y-2">
              <label for="firstName" class="text-sm font-medium text-gray-700">{{ t('firstName') }}</label>
              <div class="relative">
                <User :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="firstName"
                  type="text"
                  :placeholder="t('firstName')"
                  v-model="firstName"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <!-- Last Name -->
            <div class="space-y-2">
              <label for="lastName" class="text-sm font-medium text-gray-700">{{ t('lastName') }}</label>
              <div class="relative">
                <User :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="lastName"
                  type="text"
                  :placeholder="t('lastName')"
                  v-model="lastName"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-gray-700">{{ t('email') }}</label>
              <div class="relative">
                <Mail :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  :placeholder="t('emailAddress')"
                  v-model="email"
                  @input="handleEmailChange"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium text-gray-700">{{ t('password') }}</label>
              <div class="relative">
                <Lock :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="t('password')"
                  v-model="password"
                  @keyup.enter="handleSignup"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 pl-10 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeOff v-if="showPassword" :size="16" />
                  <Eye v-else :size="16" />
                </button>
              </div>
            </div>

            <button
              @click="handleSignup"
              :disabled="!firstName || !lastName || !email || !password"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t('createAccount') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { t } = useI18n()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const avatarUrl = ref('')

// MD5 hash function (simple implementation for Gravatar)
const md5 = (str: string): string => {
  // This is a placeholder - in production, use a proper MD5 library
  // For now, just return a placeholder
  return str.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0).toString(16)
}

const handleEmailChange = () => {
  const trimmed = email.value.trim().toLowerCase()
  if (trimmed && /.+@.+\..+/.test(trimmed)) {
    const hash = md5(trimmed)
    avatarUrl.value = `https://www.gravatar.com/avatar/${hash}?d=identicon`
  } else {
    avatarUrl.value = ''
  }
}

const closeModal = () => {
  emit('update:open', false)
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
  showPassword.value = false
  avatarUrl.value = ''
}

const handleSignup = () => {
  if (firstName.value && lastName.value && email.value && password.value) {
    console.log('Creating account:', { 
      firstName: firstName.value, 
      lastName: lastName.value, 
      email: email.value, 
      password: password.value 
    })
    closeModal()
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

