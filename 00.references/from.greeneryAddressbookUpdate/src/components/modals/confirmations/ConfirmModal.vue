<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" @click="close">Cancel</button>
        <button :class="['btn', confirmClass]" @click="confirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Delete' },
  confirmClass: { type: String, default: 'btn-delete' },
});

const emit = defineEmits(['close', 'confirm']);

const close = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
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
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
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
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
    background-color: #f3f4f6;
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


