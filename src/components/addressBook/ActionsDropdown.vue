<template>
  <div class="action-dropdown" ref="dropdown">
    <button @click.stop="toggleDropdown">
      <PocketKnife />
    </button>
    <div v-if="isOpen" class="dropdown-content" @click.stop>
      <a
        v-for="(action, index) in dropdownActions"
        :key="index"
        href="#"
        @click.prevent="action.handler()"
        class="dropdown-item"
      >
        <component v-if="action.icon" :is="action.icon" :size="16" class="action-icon" />
        {{ action.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, computed, defineEmits } from 'vue';
import { PocketKnife, Pencil, Coins, FileImage, Image, FileUser, Star, Save, SaveOff } from 'lucide-vue-next';
import type { Contact } from '@/services/addressBook/contactService';

interface Action {
  label: string;
  handler: () => void;
  icon?: any;
}

const props = defineProps({
  contact: {
    type: Object as () => Contact,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'currency-added',
  'generate-qrcode-png',
  'generate-qrcode-svg',
  'export-csv',
  'export-vcf',
  'update:edit-mode', // New event for toggling edit mode
  'save-changes',     // New event for saving changes
  'add-currency-request', // New event for requesting AddCurrencyModal
  'cancel-edit'       // New event for canceling edit mode
]);

const isOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Handlers for the actions
const handleAddCurrencyRequest = () => {
  emit('add-currency-request');
  isOpen.value = false;
};

const handleGenerateQrCodePng = () => {
  emit('generate-qrcode-png', props.contact);
  isOpen.value = false;
};

const handleGenerateQrCodeSvg = () => {
  emit('generate-qrcode-svg', props.contact);
  isOpen.value = false;
};

const handleExportCsv = () => {
  emit('export-csv', props.contact);
  isOpen.value = false;
};

const handleExportVcf = () => {
  emit('export-vcf', props.contact);
  isOpen.value = false;
};

const handleEditContact = () => {
  emit('update:edit-mode', true);
  isOpen.value = false;
};

const handleSaveChanges = () => {
  emit('save-changes');
  isOpen.value = false;
};

const handleCancelEdit = () => {
  emit('cancel-edit');
  isOpen.value = false;
};

// Computed property for dropdown actions
const dropdownActions = computed<Action[]>(() => {
  const actions: Action[] = [
    { label: 'Edit', handler: handleEditContact, icon: Pencil },
    { label: 'QRCode (png)', handler: handleGenerateQrCodePng, icon: FileImage },
    { label: 'QRCode (svg)', handler: handleGenerateQrCodeSvg, icon: Image },
    { label: 'Export (csv)', handler: handleExportCsv, icon: FileUser },
    { label: 'Export (vcf)', handler: handleExportVcf, icon: Star },
    { label: 'Add Currency', handler: handleAddCurrencyRequest, icon: Coins },
  ];

  if (props.isEditing) {
    // Add Save and Cancel at the beginning if editing
    actions.unshift(
      { label: 'Save', handler: handleSaveChanges, icon: Save },
      { label: 'Cancel', handler: handleCancelEdit, icon: SaveOff }
    );
  }

  return actions;
});


const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Use capture phase to ensure this fires before @click.stop handlers
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});
</script>

<style scoped>
.action-dropdown {
  position: relative;
}

.action-dropdown button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-content a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #374151;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-icon {
  flex-shrink: 0;
}

.dropdown-content a:hover {
  background-color: #f3f4f6;
}
</style>