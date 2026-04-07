<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Import Contacts</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div v-if="file" class="file-stats">
          <p><strong>File:</strong> {{ file.name }}</p>
          <p><strong>Size:</strong> {{ (file.size / 1024).toFixed(2) }} KB</p>
          <p><strong>New Contacts:</strong> {{ contacts.length }}</p>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contact, index) in contacts" :key="index">
                <td>{{ contact.firstname }} {{ contact.lastname }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.company }}</td>
                <td>{{ contact.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="confirm">Import</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  file: { type: Object as () => File | null, default: null },
  contacts: { type: Array as () => any[], default: () => [] },
});

const emit = defineEmits(['close', 'confirm']);

const close = () => emit('close');
const confirm = () => emit('confirm', props.contacts);
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
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.file-stats p {
  margin: 0.5rem 0;
}

.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.btn-secondary {
  background-color: #ffffff;
  color: #1f2937;
  border-color: #d1d5db;
}
</style>

