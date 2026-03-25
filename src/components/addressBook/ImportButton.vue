<template>
  <div>
    <label for="import-file" class="btn">
      <Contact :size="18" class="btn-icon" />Import Contacts
      <input
        id="import-file"
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept=".vcf,.csv,.ods,.xls,.xlsx"
        style="display: none"
      />
    </label>
    <ImportConfirmModal
      :show="showModal"
      :file="selectedFile"
      :contacts="parsedContacts"
      @close="showModal = false"
      @confirm="handleConfirmImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Contact } from 'lucide-vue-next';
import { useContactParser } from '@/composables/useContactParser';
import ImportConfirmModal from './ImportConfirmModal.vue';

const emit = defineEmits(['contacts-imported']);
const fileInput = ref<HTMLInputElement | null>(null);
const { parseFile } = useContactParser();
const showModal = ref(false);
const selectedFile = ref<File | null>(null);
const parsedContacts = ref<any[]>([]);

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    try {
      const contacts = await parseFile(selectedFile.value);
      if (contacts.length === 0) {
        alert('No new contacts found in the file.');
        return;
      }
      parsedContacts.value = contacts;
      showModal.value = true;
    } catch (error) {
      console.error('Error parsing file:', error);
      alert(`An error occurred while parsing the file. Please check the file format and content. Error: ${error}`);
    } finally {
      // Reset file input so the user can select the same file again
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    }
  }
};

const handleConfirmImport = (contacts: any[]) => {
  emit('contacts-imported', contacts);
  showModal.value = false;
};
</script>

<style scoped>
/* Visual styles come from parent AddressBookPage `.actions :deep(.btn)` */
.btn {
  margin: 0;
}

.btn-icon {
  flex-shrink: 0;
}
</style>
