<template>
  <DropdownMenuRoot v-model:open="menuOpen">
    <DropdownMenuTrigger
      type="button"
      class="btn btn--primary bdnw-trigger"
      :disabled="disabled"
      :aria-label="label"
    >
      {{ label }}
      <PlusIcon :size="16" class="bdnw-icon" aria-hidden="true" />
      <ChevronDown :size="14" class="bdnw-chevron" aria-hidden="true" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="bdnw-menu"
        align="end"
        side="bottom"
        :side-offset="6"
      >
        <DropdownMenuItem
          class="bdnw-item"
          :disabled="disabled"
          @click="onFromMnemonic"
        >
          <ListOrdered :size="16" class="bdnw-item-icon" aria-hidden="true" />
          From Mnemonic
        </DropdownMenuItem>
        <DropdownMenuItem
          class="bdnw-item"
          :disabled="disabled"
          @click="onThrowawayWallet"
        >
          <Shuffle :size="16" class="bdnw-item-icon" aria-hidden="true" />
          Throwaway Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'radix-vue'
import { Plus as PlusIcon, ChevronDown, ListOrdered, Shuffle } from 'lucide-vue-next'

defineOptions({ name: 'ButtonDashboardNewWallet' })

const props = withDefaults(
  defineProps<{
    /** Mirrors Dashboard action bar: disabled when no active currency is selected. */
    disabled?: boolean
    label?: string
  }>(),
  {
    disabled: false,
    label: 'New Wallet',
  },
)

const emit = defineEmits<{
  'from-mnemonic': []
  'throwaway-wallet': []
}>()

const menuOpen = ref(false)

function onFromMnemonic() {
  if (props.disabled) return
  menuOpen.value = false
  emit('from-mnemonic')
}

function onThrowawayWallet() {
  if (props.disabled) return
  menuOpen.value = false
  emit('throwaway-wallet')
}
</script>

<style scoped>
/* Matches Dashboard.vue action-bar primary button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  font-family: inherit;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn--primary {
  color: #fff;
  background: #16a34a;
  border-color: #15803d;

  &:hover:not(:disabled) {
    background: #15803d;
  }
}

.bdnw-trigger {
  margin: 0;
}

.bdnw-icon,
.bdnw-chevron {
  flex-shrink: 0;
}

.bdnw-chevron {
  opacity: 0.85;
  margin-left: -0.125rem;
}

.bdnw-trigger[data-state='open'] .bdnw-chevron {
  transform: rotate(180deg);
  transition: transform 0.15s ease;
}

.bdnw-trigger .bdnw-chevron {
  transition: transform 0.15s ease;
}
</style>

<style lang="scss">
/* Teleported menu — unscoped */
.bdnw-menu {
  z-index: 10001;
  min-width: 11.5rem;
  padding: 0.3rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.08),
    0 10px 24px -4px rgba(0, 0, 0, 0.12);
  animation: bdnw-menu-in 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.bdnw-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #1f2937;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background 0.12s ease, color 0.12s ease;

  &:hover,
  &[data-highlighted] {
    background: #f3f4f6;
    color: #111827;

    .bdnw-item-icon {
      color: #374151;
    }
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}

.bdnw-item-icon {
  flex-shrink: 0;
  color: #6b7280;
}

@keyframes bdnw-menu-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
