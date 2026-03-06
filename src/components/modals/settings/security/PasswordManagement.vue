<!--
Password Management modal — Reveal Password, Reset Password.
-->

<template>
  <DialogRoot :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogPortal>
      <DialogOverlay class="pw-mgmt-overlay" />
      <DialogContent class="pw-mgmt-content" :aria-describedby="undefined">
        <DialogTitle class="pw-mgmt-title">
          <span>Password Management</span>
          <button type="button" class="pw-mgmt-close" aria-label="Close" @click="emit('update:modelValue', false)">
            <i class="bi bi-x-lg" aria-hidden />
          </button>
        </DialogTitle>
        <div class="pw-mgmt-body">
          <div class="pw-mgmt-actions">
            <button type="button" class="pw-mgmt-action-btn" @click="emit('revealPassword')">
              <span class="pw-mgmt-action-title">Reveal Password</span>
              <span class="pw-mgmt-action-desc">Show your current password</span>
            </button>
            <button type="button" class="pw-mgmt-action-btn" @click="emit('resetPassword')">
              <span class="pw-mgmt-action-title">Reset Password</span>
              <span class="pw-mgmt-action-desc">Change your account password</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from 'radix-vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'revealPassword': []
  'resetPassword': []
}>()
</script>

<style scoped>
.pw-mgmt-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pw-mgmt-action-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s;
}

.pw-mgmt-action-btn:hover {
  background: #f9fafb;
  border-color: #3b82f6;
}

.pw-mgmt-action-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.pw-mgmt-action-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.pw-mgmt-action-desc {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
</style>

<!-- Unscoped: Dialog portals to body -->
<style>
.pw-mgmt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.pw-mgmt-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 2rem;
  min-width: 360px;
  max-width: 90vw;
  z-index: 9999;
}

.pw-mgmt-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.pw-mgmt-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.15s, background 0.15s;
}

.pw-mgmt-close:hover {
  color: #111827;
  background: #f3f4f6;
}

.pw-mgmt-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
