<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
        <div class="w-full max-w-md bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <!-- Blue Header Section -->
          <div class="bg-blue-600 px-8 pt-16 pb-10 text-center rounded-t-2xl">
            <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mt-4 mb-4 flex items-center justify-center">
              <Server :size="32" class="text-white" />
            </div>
            <h2 class="text-2xl font-light text-white">{{ t('connectToServerTitle') }}</h2>
            <p class="text-white/80 mt-1 font-light">{{ t('selectLoginMethodDescription') }}</p>
          </div>

          <!-- White Content Section -->
          <div class="px-8 pt-12 pb-8 space-y-4 bg-white">
            <!-- Connection Type Selection -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 pl-3">{{ t('loginMethod') }}</label>
              <div class="relative">
                <select
                  v-model="connectionType"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                >
                  <option value="ldap">{{ t('loginViaLdap') }}</option>
                  <option value="activedirectory">{{ t('activeDirectory') }}</option>
                  <option value="webrtc">{{ t('webRTC') }}</option>
                  <option value="colyseus">{{ t('colyseus') }}</option>
                </select>
              </div>
            </div>

            <!-- Server URL Input -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 pl-3">{{ t('serverUrl') }}</label>
              <div class="relative">
                <Server :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  v-model="serverUrl"
                  type="text"
                  :placeholder="getPlaceholder()"
                  style="padding-left: 2.5rem;"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded h-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <!-- Description -->
            <div class="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
              {{ getDescription() }}
            </div>

            <!-- Connect Button -->
            <div class="bg-gray-50 rounded-lg p-3">
              <button
                @click="handleConnect"
                :disabled="!serverUrl || isConnecting"
                style="background-color: #2563eb;"
                class="w-full hover:bg-blue-700 text-white font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Server v-if="!isConnecting" :size="16" />
                <div v-if="isConnecting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {{ isConnecting ? t('connecting') : t('connect') }}
              </button>
            </div>

            <!-- Footer Links -->
            <div class="mt-6 text-center">
              <button 
                @click="closeModal"
                class="text-blue-600 hover:underline text-sm font-medium focus:outline-none focus:ring-0 border-0"
              >
                {{ t('cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Server } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

interface ServerSelectionModalProps {
  open: boolean
}

const props = defineProps<ServerSelectionModalProps>()
const emit = defineEmits<{
  'update:open': [value: boolean]
  connect: [serverUrl: string, connectionType: string]
}>()

const { t } = useI18n()

const connectionType = ref<'ldap' | 'activedirectory' | 'webrtc' | 'colyseus'>('ldap')
const serverUrl = ref('')
const isConnecting = ref(false)

const getPlaceholder = () => {
  switch (connectionType.value) {
    case 'ldap':
      return 'ldap://ldap.example.com:389'
    case 'activedirectory':
      return 'ldap://ad.example.com:389'
    case 'webrtc':
      return 'wss://webrtc.example.com:9000'
    case 'colyseus':
      return 'ws://colyseus.example.com:2567'
    default:
      return 'ldap://ldap.example.com:389'
  }
}

const getDescription = () => {
  switch (connectionType.value) {
    case 'ldap':
      return t('ldapDescription')
    case 'activedirectory':
      return t('adDescription')
    case 'webrtc':
      return t('webrtcDescription')
    case 'colyseus':
      return t('colyseusDescription')
    default:
      return t('selectLoginMethodDescription')
  }
}

const handleConnect = async () => {
  if (!serverUrl.value) return
  
  isConnecting.value = true
  
  try {
    // Simulate connection attempt
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log(`Connecting via ${connectionType.value}: ${serverUrl.value}`)
    emit('connect', serverUrl.value, connectionType.value)
    closeModal()
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    isConnecting.value = false
  }
}

const closeModal = () => {
  emit('update:open', false)
  serverUrl.value = ''
  connectionType.value = 'ldap'
  isConnecting.value = false
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
