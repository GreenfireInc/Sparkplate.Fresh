<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-icon">
        <Trash2 :size="32" class="icon-delete" />
      </div>
      <h3 class="modal-title">Delete Note</h3>
      <p class="modal-message">
        Are you sure you want to delete this note?
      </p>
      <div v-if="note" class="note-preview">
        <div class="note-title-preview">{{ note.title || 'Untitled Note' }}</div>
        <div class="note-date">Created: {{ formatDate(note.createdAt) }}</div>
      </div>
      <p class="modal-warning">
        This action cannot be undone.
      </p>
      <div class="modal-actions">
        <button class="btn btn-secondary" @click="close">Cancel</button>
        <button class="btn btn-delete" @click="confirm">
          <Trash2 :size="16" />
          Delete Note
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
import type { Note } from '../../../services/noteService';

const props = defineProps<{
  show: boolean;
  note: Note | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const close = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
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
  z-index: 2000;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon-delete {
  color: #ef4444;
  padding: 0.75rem;
  background-color: #fee2e2;
  border-radius: 50%;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #111827;
}

.modal-message {
  margin-bottom: 1rem;
  color: #4b5563;
  font-size: 0.9375rem;
}

.note-preview {
  background-color: #fef9e7;
  border: 1px solid #fcd34d;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.note-title-preview {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.note-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.modal-warning {
  font-size: 0.8125rem;
  color: #dc2626;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-secondary {
  background-color: #f3f4f6;
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
  border-color: #dc2626;
}
</style>

