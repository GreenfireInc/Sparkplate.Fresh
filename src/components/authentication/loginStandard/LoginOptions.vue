<template>
  <DropdownMenuRoot v-model:open="menuOpen">
    <DropdownMenuTrigger
      class="lop-trigger"
      :title="t('signInOptions')"
      :aria-label="t('signInOptions')"
    >
      <i class="bi bi-fingerprint lop-trigger-icon" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent class="lop-menu" side="top" align="end" :side-offset="8">
        <DropdownMenuItem class="lop-item" @click="handleTemporaryKeyClick">
          <Key :size="16" class="lop-item-icon" />
          {{ t('tempPrivateKey') }}
        </DropdownMenuItem>
        <DropdownMenuSeparator class="lop-separator" />
        <DropdownMenuItem class="lop-item" @click="handleServerSelectionClick">
          <Server :size="16" class="lop-item-icon" />
          {{ t('connectToServer') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>

  <TemporaryKeyModal
    :is-open="showTemporaryKeyModal"
    @update:open="showTemporaryKeyModal = $event"
    @derive="handleKeyDerive"
  />
  <ServerSelectionModal
    :open="showServerSelectionModal"
    @update:open="showServerSelectionModal = $event"
    @connect="handleServerConnect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { Key, Server } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import TemporaryKeyModal from '@/components/modals/loginOptions/TemporaryKeyModal.vue'
import ServerSelectionModal from '@/components/modals/loginOptions/ServerSelectionModal.vue'

interface LoginOptionsProps {
  onTemporaryKeyClick?: () => void
  onServerSelectionClick?: () => void
}

const props = defineProps<LoginOptionsProps>()

const { t } = useI18n()

const menuOpen = ref(false)
const showTemporaryKeyModal = ref(false)
const showServerSelectionModal = ref(false)

const handleTemporaryKeyClick = () => {
  menuOpen.value = false
  showTemporaryKeyModal.value = true
  props.onTemporaryKeyClick?.()
}

const handleServerSelectionClick = () => {
  menuOpen.value = false
  showServerSelectionModal.value = true
  props.onServerSelectionClick?.()
}

const handleKeyDerive = (ticker: string, privateKey: string) => {
  console.log('Key derived:', { ticker, privateKey })
}

const handleServerConnect = (serverUrl: string, connectionType: string) => {
  console.log('Server connection:', { serverUrl, connectionType })
}
</script>

<style lang="scss" scoped>
/* ── Trigger ─────────────────────────────────────────────────────────────── */
.lop-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  transition: background 0.15s, color 0.15s;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  &[data-state='open'] {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
}

.lop-trigger-icon {
  font-size: 1rem;
  line-height: 1;
}
</style>

<style lang="scss">
/* Unscoped: DropdownMenuPortal teleports to body */
.lop-menu {
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.625rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
  padding: 0.3rem;
  z-index: 10001;
  animation: lop-menu-in 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.lop-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  font-size: 0.825rem;
  font-weight: 400;
  color: #1f2937;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: background 0.12s;

  &:hover,
  &[data-highlighted] {
    background: #f3f4f6;
    color: #111827;

    .lop-item-icon {
      color: #374151;
    }
  }
}

.lop-item-icon {
  color: #6b7280;
  flex-shrink: 0;
}

.lop-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.2rem 0.5rem;
}

@keyframes lop-menu-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
