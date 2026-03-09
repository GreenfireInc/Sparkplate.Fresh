<template>
  <DialogRoot v-model:open="openModel">
    <DialogPortal>
      <DialogOverlay class="ssm-overlay" />
      <DialogContent class="ssm-content" :aria-describedby="undefined">

        <!-- Header -->
        <div class="ssm-header">
          <div class="ssm-header-icon">
            <Server :size="28" class="ssm-header-server-icon" />
          </div>
          <DialogTitle class="ssm-title">{{ t('connectToServerTitle') }}</DialogTitle>
          <p class="ssm-subtitle">{{ t('selectLoginMethodDescription') }}</p>
        </div>

        <!-- Body -->
        <div class="ssm-body">

          <!-- Protocol picker -->
          <div class="ssm-field">
            <Label class="ssm-label">{{ t('loginMethod') }}</Label>
            <div class="ssm-protocol-grid">
              <button
                v-for="proto in protocols"
                :key="proto.value"
                type="button"
                class="ssm-protocol-btn"
                :class="{ 'ssm-protocol-btn--active': connectionType === proto.value }"
                @click="connectionType = proto.value"
              >
                <img :src="proto.icon" :alt="proto.label" class="ssm-protocol-icon" />
                <span class="ssm-protocol-label">{{ proto.label }}</span>
              </button>
            </div>
          </div>

          <!-- Server URL -->
          <div class="ssm-field">
            <Label class="ssm-label">{{ t('serverUrl') }}</Label>
            <div class="ssm-input-wrap">
              <Server :size="14" class="ssm-input-icon" />
              <input
                v-model="serverUrl"
                type="text"
                :placeholder="getPlaceholder()"
                class="ssm-input"
              />
            </div>
          </div>

          <!-- Description -->
          <p class="ssm-description">{{ getDescription() }}</p>

          <!-- Actions -->
          <div class="ssm-actions">
            <button
              type="button"
              class="ssm-btn ssm-btn--primary"
              :disabled="!serverUrl || isConnecting"
              @click="handleConnect"
            >
              <div v-if="isConnecting" class="ssm-spinner" />
              <Server v-else :size="14" />
              {{ isConnecting ? t('connecting') : t('connect') }}
            </button>
            <DialogClose class="ssm-btn ssm-btn--ghost">
              {{ t('cancel') }}
            </DialogClose>
          </div>
        </div>

      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Label,
} from 'radix-vue'
import { Server } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

interface Props {
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
  connect: [serverUrl: string, connectionType: string]
}>()

const openModel = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val),
})

const { t } = useI18n()

const protocols = [
  { value: 'activedirectory', label: t('activeDirectory'), icon: '/assets/icons/protocols/activeDirectory.svg' },
  { value: 'webrtc',          label: t('webRTC'),          icon: '/assets/icons/protocols/webRTC.svg' },
  { value: 'colyseus',        label: t('colyseus'),        icon: '/assets/icons/protocols/colyseus.svg' },
  { value: 'peerjs',          label: 'PeerJS',             icon: '/assets/icons/protocols/peerJS.svg' },
] as const

type ConnectionType = 'ldap' | 'activedirectory' | 'webrtc' | 'colyseus' | 'peerjs'

const connectionType = ref<ConnectionType>('activedirectory')
const serverUrl = ref('')
const isConnecting = ref(false)

const getPlaceholder = () => {
  switch (connectionType.value) {
    case 'ldap':            return 'ldap://ldap.example.com:389'
    case 'activedirectory': return 'ldap://ad.example.com:389'
    case 'webrtc':          return 'wss://webrtc.example.com:9000'
    case 'colyseus':        return 'ws://colyseus.example.com:2567'
    case 'peerjs':          return 'https://peerjs.example.com:9000'
    default:                return 'ldap://ldap.example.com:389'
  }
}

const getDescription = () => {
  switch (connectionType.value) {
    case 'ldap':            return t('ldapDescription')
    case 'activedirectory': return t('adDescription')
    case 'webrtc':          return t('webrtcDescription')
    case 'colyseus':        return t('colyseusDescription')
    case 'peerjs':          return t('peerjsDescription')
    default:                return t('selectLoginMethodDescription')
  }
}

const handleConnect = async () => {
  if (!serverUrl.value) return
  isConnecting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    emit('connect', serverUrl.value, connectionType.value)
    closeModal()
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    isConnecting.value = false
  }
}

const closeModal = () => {
  openModel.value = false
  serverUrl.value = ''
  connectionType.value = 'activedirectory'
  isConnecting.value = false
}
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────────────────────── */
.ssm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  animation: ssm-fade 0.15s ease;
}

/* ── Dialog ──────────────────────────────────────────────────────────────── */
.ssm-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: calc(100vw - 2rem);
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1001;
  animation: ssm-slide-up 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.ssm-header {
  background: #2563eb;
  padding: 2rem 2rem 1.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.ssm-header-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.ssm-header-server-icon {
  color: #ffffff;
}

.ssm-title {
  font-size: 1.25rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
}

.ssm-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  font-weight: 300;
}

/* ── Body ────────────────────────────────────────────────────────────────── */
.ssm-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Field / Label ───────────────────────────────────────────────────────── */
.ssm-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ssm-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  padding-left: 0.125rem;
}

/* ── Protocol grid ───────────────────────────────────────────────────────── */
.ssm-protocol-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.ssm-protocol-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 0.4rem;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;

  &:hover {
    background: #eff6ff;
    border-color: #93c5fd;
  }

  &--active {
    background: #eff6ff;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.18);

    .ssm-protocol-label {
      color: #2563eb;
    }
  }
}

.ssm-protocol-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.ssm-protocol-label {
  font-size: 0.65rem;
  font-weight: 500;
  color: #4b5563;
  text-align: center;
  line-height: 1.2;
}

/* ── Input ───────────────────────────────────────────────────────────────── */
.ssm-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.ssm-input-icon {
  position: absolute;
  left: 0.65rem;
  color: #9ca3af;
  pointer-events: none;
  flex-shrink: 0;
}

.ssm-input {
  width: 100%;
  padding: 0.45rem 0.75rem 0.45rem 2rem;
  font-size: 0.8rem;
  color: #111827;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    background: #ffffff;
  }
}

/* ── Description ─────────────────────────────────────────────────────────── */
.ssm-description {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 0.375rem;
  padding: 0.6rem 0.75rem;
  margin: 0;
  line-height: 1.5;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.ssm-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.ssm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;
  transition: background 0.15s, border-color 0.15s, opacity 0.15s;

  &--primary {
    background: #2563eb;
    color: #ffffff;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--ghost {
    background: transparent;
    color: #2563eb;
    border: none;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ssm-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ssm-spin 0.7s linear infinite;
  flex-shrink: 0;
}

/* ── Animations ──────────────────────────────────────────────────────────── */
@keyframes ssm-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes ssm-slide-up {
  from { opacity: 0; transform: translate(-50%, -47%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

@keyframes ssm-spin {
  to { transform: rotate(360deg); }
}
</style>
