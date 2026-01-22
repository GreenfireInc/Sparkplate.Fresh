<!--
Description: Command field component that opens with Ctrl+Shift+~
-->

<template>
  <Teleport to="body">
    <div v-if="open" class="command-overlay" @click.self="closeDialog">
      <div class="command-dialog">
        <div class="command-input-wrapper">
          <svg class="command-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <input
            ref="inputRef"
            v-model="value"
            type="text"
            class="command-input"
            placeholder="Enter command..."
            @keydown.enter="handleSubmit"
            @keydown.esc="closeDialog"
          />
        </div>
        <div v-if="!value" class="command-empty">
          Type a command...
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const emit = defineEmits<{
  (e: 'command', command: string): void
  (e: 'bruteForce', isActive: boolean): void
}>()

const props = defineProps<{
  bruteForceActive?: boolean
}>()

const open = ref(false)
const value = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const bruteForceActivated = ref(false)

const openDialog = () => {
  open.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const closeDialog = () => {
  open.value = false
  value.value = ''
  if (!bruteForceActivated.value) {
    emit('bruteForce', false)
  }
  bruteForceActivated.value = false
}

const handleSubmit = () => {
  if (!value.value.trim()) return

  // Special handling for bruteForce command
  if (value.value === 'bruteForce') {
    const newState = !props.bruteForceActive
    emit('bruteForce', newState)
    bruteForceActivated.value = newState
    value.value = ''
    return
  }

  // Normal command handling
  emit('command', value.value)
  value.value = ''
  closeDialog()
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Check for Ctrl+Shift+~ using code 'Backquote' for cross-keyboard compatibility
  if (event.ctrlKey && event.shiftKey && (event.key === '~' || event.code === 'Backquote')) {
    event.preventDefault()
    if (open.value) {
      closeDialog()
    } else {
      openDialog()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Focus input when dialog opens
watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})
</script>

<style scoped>
.command-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4rem 0 0 1rem;
}

.command-dialog {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.command-input-wrapper {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.command-icon {
  flex-shrink: 0;
  opacity: 0.5;
  margin-right: 0.5rem;
}

.command-input {
  flex: 1;
  height: 2.75rem;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #213547;
}

.command-input::placeholder {
  color: #9ca3af;
}

.command-empty {
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .command-dialog {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .command-input-wrapper {
    border-color: #374151;
  }
  
  .command-input {
    color: #f9fafb;
  }
  
  .command-icon {
    color: #9ca3af;
  }
}
</style>

