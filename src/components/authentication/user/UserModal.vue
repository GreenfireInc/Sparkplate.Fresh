<template>
  <DialogRoot v-model:open="openModel">
    <DialogPortal>
      <DialogOverlay class="um-overlay" />
      <DialogContent class="um-content" :aria-describedby="undefined">
        <!-- Header -->
        <div class="um-header">
          <div class="um-avatar">
            <User :size="32" class="um-avatar-icon" />
          </div>
          <DialogTitle class="um-title">{{ userName }}</DialogTitle>
          <p class="um-subtitle">{{ userEmail }}</p>
        </div>

        <!-- Body -->
        <div class="um-body">
          <div class="um-field">
            <Label for="um-password" class="um-label">{{ t('password') }}</Label>
            <div class="um-input-wrap">
              <Lock :size="16" class="um-input-icon" aria-hidden />
              <input
                id="um-password"
                ref="passwordInput"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('password')"
                class="um-input"
                @keyup.enter="handleSignIn"
              />
              <button
                type="button"
                class="um-toggle-pw"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" :size="16" aria-hidden />
                <Eye v-else :size="16" aria-hidden />
              </button>
            </div>
          </div>

          <div class="um-actions">
            <button
              type="button"
              class="um-btn um-btn--primary"
              :disabled="!password"
              @click="handleSignIn"
            >
              {{ t('signIn') }}
            </button>
            <button type="button" class="um-btn um-btn--link" @click.prevent>
              {{ t('forgotPassword') }}
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  Label,
} from 'radix-vue'
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useAuth } from '@/composables/useAuth'

defineOptions({ name: 'UserModal' })

const props = defineProps<{
  open: boolean
  userName: string
  userEmail: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const openModel = computed({
  get: () => props.open,
  set: (val) => {
    if (!val) {
      password.value = ''
      showPassword.value = false
    }
    emit('update:open', val)
  },
})

const { t } = useI18n()
const { login, mockUsers } = useAuth()

const password = ref('')
const showPassword = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)

const handleClose = () => {
  openModel.value = false
}

const handleSignIn = () => {
  if (password.value) {
    const user = mockUsers.find((u) => u.name === props.userName)
    if (user) {
      login(user)
    }
    handleClose()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        passwordInput.value?.focus()
      })
    }
  }
)
</script>

<style lang="scss" scoped>
/* Scoped styles for content inside um-body */
.um-field {
  margin-bottom: 1rem;
}

.um-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.375rem;
}

.um-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.um-input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.um-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  font-size: 0.9375rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
}

.um-toggle-pw {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #6b7280;
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
}

.um-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.um-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: #2563eb;
    color: #fff;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
    }
  }

  &--link {
    background: none;
    color: #2563eb;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      border-radius: 0.25rem;
    }
  }
}
</style>

<!-- Unscoped: Dialog portals to body -->
<style>
.um-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.um-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 20rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 9999;
}

.um-header {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  padding: 2rem 1.5rem;
  text-align: center;
}

.um-avatar {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.um-avatar-icon {
  color: #fff;
}

.um-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.25rem;
  line-height: 1.3;
}

.um-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.um-body {
  padding: 1.5rem;
  background: #fff;
}
</style>
