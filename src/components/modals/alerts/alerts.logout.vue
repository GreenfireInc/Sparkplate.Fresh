<template>
  <AlertDialogRoot v-model:open="open">
    <AlertDialogPortal>
      <AlertDialogOverlay class="logout-alert-overlay" />
      <AlertDialogContent class="logout-alert-content" :aria-describedby="undefined">
        <AlertDialogTitle class="logout-alert-title">{{ t('logout') }}</AlertDialogTitle>
        <p class="logout-alert-desc">{{ t('logoutConfirm') }}</p>
        <div class="logout-alert-actions">
          <AlertDialogCancel class="logout-alert-btn logout-alert-btn--cancel">{{ t('cancel') }}</AlertDialogCancel>
          <AlertDialogAction class="logout-alert-btn logout-alert-btn--confirm" @click="emit('confirm')">
            {{ t('logout') }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from 'radix-vue'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()

const open = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
})

const { t } = useI18n()
</script>

<style>
/* Unscoped: AlertDialogPortal renders outside component DOM */
.logout-alert-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10002;
}

.logout-alert-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  z-index: 10003;
}

.logout-alert-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.logout-alert-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.25rem 0;
  line-height: 1.4;
}

.logout-alert-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.logout-alert-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.logout-alert-btn--cancel {
  background: #f3f4f6;
  color: #374151;
}

.logout-alert-btn--cancel:hover {
  background: #e5e7eb;
}

.logout-alert-btn--confirm {
  background: #dc2626;
  color: white;
}

.logout-alert-btn--confirm:hover {
  background: #b91c1c;
}
</style>
