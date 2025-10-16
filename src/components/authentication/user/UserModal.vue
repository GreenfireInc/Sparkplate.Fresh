<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Blue Header Section -->
          <div class="bg-blue-600 px-8 py-8 text-center">
            <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <User :size="32" class="text-white" />
            </div>
            <h2 class="text-2xl font-light text-white">{{ userName }}</h2>
            <p class="text-white/80 mt-1 font-light">{{ userEmail }}</p>
          </div>

          <!-- White Content Section -->
          <div class="px-8 py-6 space-y-4">
            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium text-gray-700">{{ t('password') }}</label>
              <div class="relative">
                <Lock :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  ref="passwordInput"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="t('password')"
                  v-model="password"
                  @keyup.enter="handleSignIn"
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
              @click="handleSignIn"
              :disabled="!password"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t('signIn') }}
            </button>

            <!-- Footer Links -->
            <div class="mt-6 text-center">
              <button class="text-blue-600 hover:underline text-sm font-medium">
                {{ t('forgotPassword') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{
  open: boolean
  userName: string
  userEmail: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { t } = useI18n()
const { login, mockUsers } = useAuth()

const password = ref('')
const showPassword = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)

const closeModal = () => {
  emit('update:open', false)
  password.value = ''
  showPassword.value = false
}

const handleSignIn = () => {
  if (password.value) {
    console.log(`Signing in as ${props.userName} with password: ${password.value}`)
    const user = mockUsers.find(u => u.name === props.userName)
    if (user) {
      login(user)
    }
    closeModal()
  }
}

// Focus password input when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      passwordInput.value?.focus()
    })
  }
})
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

