<!--
  Simple confirmation dialog (non-Radix): dimmed full-screen overlay + centered card.
  Parent controls visibility via `show`; parent performs real work on @confirm.
  Clicking the dark backdrop (not the card) dismisses via @close (.self on overlay).
-->
<template>
  <!-- Backdrop: @click.self so clicks on the white card do not close the modal -->
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
        <button type="button" :class="['btn', confirmClass]" @click="confirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ModalConfirmDeleteGeneral' })

/**
 * General-purpose confirm dialog (delete / destructive / “are you sure?”).
 *
 * - Visibility is fully controlled by the parent (`show`). This component does not own open/close state.
 * - Cancel / backdrop: emits `close` so the parent can hide the modal and clear any pending action.
 * - Primary action: emits `confirm` only; the parent must run deletes, saves, etc. (keeps side effects in one place).
 * - `confirmText` + `confirmClass` let callers reuse the same shell for non-delete actions (e.g. “OK”, “Remove”).
 */
defineProps({
  /** When true, the overlay and dialog are rendered. */
  show: { type: Boolean, required: true },
  /** Short heading shown at the top of the card. */
  title: { type: String, required: true },
  /** Body copy explaining what will happen if the user confirms. */
  message: { type: String, required: true },
  /** Label for the primary (destructive or affirmative) button. */
  confirmText: { type: String, default: 'Delete' },
  /** Extra CSS class for the primary button (default styles it as a red delete action). */
  confirmClass: { type: String, default: 'btn-delete' },
})

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

const confirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  /* Explicit dark text so we don't inherit the near-white default from `:root` in
     `src/style.css` (which would make the secondary button invisible on its light bg). */
  color: #111827;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.modal-message {
  margin-bottom: 1.5rem;
  color: #4b5563;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  /* Inherit the modal card's dark text instead of the global `<button>` default
     (which inherits the near-white :root color). */
  color: inherit;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #111827;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-delete {
  background-color: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

.btn-delete:hover {
  background-color: #dc2626;
}
</style>
