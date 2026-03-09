<template>
  <DialogRoot v-model:open="openModel">
    <DialogPortal>
      <DialogOverlay class="sgn-overlay" />
      <DialogContent class="sgn-content" :aria-describedby="undefined">

        <!-- Header -->
        <div class="sgn-header">
          <div class="sgn-avatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="sgn-avatar-img" />
            <User v-else :size="28" class="sgn-avatar-icon" />
          </div>
          <DialogTitle class="sgn-title">{{ t('createAccount') }}</DialogTitle>
          <p class="sgn-subtitle">{{ t('enterDetailsToSignup') }}</p>
        </div>

        <!-- Body -->
        <div class="sgn-body">

          <!-- Name row -->
          <div class="sgn-row">
            <div class="sgn-field">
              <Label for="sgn-firstName" class="sgn-label">{{ t('firstName') }}</Label>
              <div class="sgn-input-wrap">
                <User :size="14" class="sgn-input-icon" />
                <input
                  id="sgn-firstName"
                  v-model="firstName"
                  type="text"
                  :placeholder="t('firstName')"
                  class="sgn-input"
                />
              </div>
            </div>
            <div class="sgn-field">
              <Label for="sgn-lastName" class="sgn-label">{{ t('lastName') }}</Label>
              <div class="sgn-input-wrap">
                <User :size="14" class="sgn-input-icon" />
                <input
                  id="sgn-lastName"
                  v-model="lastName"
                  type="text"
                  :placeholder="t('lastName')"
                  class="sgn-input"
                />
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="sgn-field">
            <Label for="sgn-email" class="sgn-label">{{ t('email') }}</Label>
            <div class="sgn-input-wrap">
              <Mail :size="14" class="sgn-input-icon" />
              <input
                id="sgn-email"
                v-model="email"
                type="email"
                :placeholder="t('emailAddress')"
                class="sgn-input"
                @input="handleEmailChange"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="sgn-field">
            <Label for="sgn-password" class="sgn-label">{{ t('password') }}</Label>
            <div class="sgn-input-wrap">
              <Lock :size="14" class="sgn-input-icon" />
              <input
                id="sgn-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('password')"
                class="sgn-input sgn-input--padded-right"
                @keyup.enter="handleSignup"
              />
              <button
                type="button"
                class="sgn-eye-btn"
                :title="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" :size="14" />
                <Eye v-else :size="14" />
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="sgn-actions">
            <button
              type="button"
              class="sgn-btn sgn-btn--primary"
              :disabled="!firstName || !lastName || !email || !password"
              @click="handleSignup"
            >
              {{ t('createAccount') }}
            </button>
            <DialogClose class="sgn-btn sgn-btn--ghost">
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
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { gravatarUrl } from '@/lib/cores/displayStandard/gravatar'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const openModel = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val),
})

const { t } = useI18n()

const firstName    = ref('')
const lastName     = ref('')
const email        = ref('')
const password     = ref('')
const showPassword = ref(false)
const avatarUrl    = ref('')

const handleEmailChange = () => {
  avatarUrl.value = gravatarUrl(email.value, { size: 56 }) ?? ''
}

const closeModal = () => {
  openModel.value = false
  firstName.value    = ''
  lastName.value     = ''
  email.value        = ''
  password.value     = ''
  showPassword.value = false
  avatarUrl.value    = ''
}

const handleSignup = () => {
  if (firstName.value && lastName.value && email.value && password.value) {
    console.log('Creating account:', {
      firstName: firstName.value,
      lastName:  lastName.value,
      email:     email.value,
      password:  password.value,
    })
    closeModal()
  }
}
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────────────────────── */
.sgn-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  animation: sgn-fade 0.15s ease;
}

/* ── Dialog ──────────────────────────────────────────────────────────────── */
.sgn-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-width: calc(100vw - 2rem);
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1001;
  animation: sgn-slide-up 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.sgn-header {
  background: #2563eb;
  padding: 2rem 2rem 1.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.sgn-avatar {
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.sgn-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sgn-avatar-icon {
  color: #ffffff;
}

.sgn-title {
  font-size: 1.25rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
}

.sgn-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  font-weight: 300;
}

/* ── Body ────────────────────────────────────────────────────────────────── */
.sgn-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Name row (two columns) ──────────────────────────────────────────────── */
.sgn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* ── Field / Label ───────────────────────────────────────────────────────── */
.sgn-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sgn-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  padding-left: 0.125rem;
}

/* ── Input ───────────────────────────────────────────────────────────────── */
.sgn-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.sgn-input-icon {
  position: absolute;
  left: 0.65rem;
  color: #9ca3af;
  pointer-events: none;
  flex-shrink: 0;
}

.sgn-input {
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

  &--padded-right {
    padding-right: 2.25rem;
  }
}

.sgn-eye-btn {
  position: absolute;
  right: 0.65rem;
  background: none;
  border: none;
  padding: 0;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  transition: color 0.15s;

  &:hover {
    color: #6b7280;
  }
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.sgn-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.sgn-btn {
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
  transition: background 0.15s, opacity 0.15s;

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

/* ── Animations ──────────────────────────────────────────────────────────── */
@keyframes sgn-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes sgn-slide-up {
  from { opacity: 0; transform: translate(-50%, -47%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}
</style>
