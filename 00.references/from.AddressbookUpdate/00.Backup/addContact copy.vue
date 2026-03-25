<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <form @submit.prevent="saveContact">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Contact' : 'Add Contact' }}</h2>
          <button type="button" class="close-button" @click="close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model="form.firstname" required>
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model="form.lastname" required>
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" v-model="form.company">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea id="notes" v-model="form.notes"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Contact</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue';
import { addContact, updateContact, Contact } from '../../services/contactService';

const props = defineProps({
  show: Boolean,
  contact: Object as () => Contact | null
});

const emit = defineEmits(['close', 'contact-saved']);

const form = ref<Partial<Contact>>({});

const isEditing = computed(() => !!props.contact);

watch(() => props.show, (newVal) => {
  if (newVal) {
    form.value = props.contact ? { ...props.contact } : { type: 'regular' };
  }
});

const saveContact = async () => {
  if (isEditing.value) {
    await updateContact(form.value.id!, form.value);
  } else {
    await addContact(form.value as Contact);
  }
  emit('contact-saved');
  close();
};

const close = () => {
  emit('close');
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
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  border-color: #d1d5db;
  background-color: #fff;
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
}
</style>