<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <div class="entity-selector-wrapper">
          <div class="entity-selector" :class="{ 'open': isEntitySelectorOpen }" @click.stop="toggleEntitySelector">
            <div class="entity-selector-display">
              <component :is="getEntityIcon(selectedEntity)" :size="18" />
              <span>{{ selectedEntity }}</span>
            </div>
            <div v-if="isEntitySelectorOpen" class="entity-selector-dropdown" @click.stop>
              <div
                v-for="entity in entityTypes"
                :key="entity"
                class="entity-selector-option"
                :class="{ 'selected': entity === selectedEntity }"
                @click.stop="selectEntity(entity)"
              >
                <component :is="getEntityIcon(entity)" :size="18" />
                <span>{{ entity }}</span>
              </div>
            </div>
          </div>
        </div>
        <h2>{{ modalTitle }}</h2>
      </div>
      <div class="modal-body">
        <div v-if="selectedEntity === 'Contacts'" class="form-container">
          <ContactForm
            ref="contactFormRef"
            :contact="contact"
            @saved="handleContactSaved"
            @cancel="close"
          />
        </div>

        <div v-else-if="selectedEntity === 'Wallets'" class="form-container">
          <WalletForm
            ref="walletFormRef"
            @saved="handleWalletSaved"
            @cancel="close"
          />
        </div>

        <div v-else-if="selectedEntity === 'Exchanges'" class="form-container">
          <ExchangeForm
            ref="exchangeFormRef"
            @saved="(data) => handleExchangeSaved(data)"
            @cancel="close"
          />
        </div>

        <div v-else-if="selectedEntity === 'Companies'" class="form-container">
          <CompaniesForm
            ref="companyFormRef"
            @saved="handleCompanySaved"
            @cancel="close"
          />
        </div>

        <div v-else class="placeholder-form">
          <p>Form for adding a new {{ selectedEntity.slice(0, -1).toLowerCase() }} will be here.</p>
        </div>
      </div>
      <div class="modal-footer">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileImport"
          accept=".json"
          style="display: none"
        />
        <button type="button" class="btn-import" @click="triggerFileImport">Import</button>
        <button type="button" class="btn-secondary" @click="close">Cancel</button>
        <button type="button" class="btn-primary" @click="handleSubmit">{{ getSubmitButtonText() }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
import { Contact } from '../../services/contactService';
import { Wallet } from '../../services/walletService';
import { User, ArrowLeftRight, Wallet as WalletIcon, Building2 } from 'lucide-vue-next';
import ContactForm from '../sections/addEntry/contactForm.vue';
import WalletForm from '../sections/addEntry/walletForm.vue';
import ExchangeForm from '../sections/addEntry/exchangeForm.vue';
import CompaniesForm from '../sections/addEntry/companiesForm.vue';

const props = defineProps<{
  show: boolean,
  contact: Contact | null,
  initialEntity?: 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'
}>();
const emit = defineEmits(['close', 'contact-saved', 'exchange-saved', 'wallet-saved', 'company-saved']);

const selectedEntity = ref<'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'>(props.initialEntity || 'Contacts');
const isEntitySelectorOpen = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const contactFormRef = ref<InstanceType<typeof ContactForm> | null>(null);
const exchangeFormRef = ref<InstanceType<typeof ExchangeForm> | null>(null);
const walletFormRef = ref<InstanceType<typeof WalletForm> | null>(null);
const companyFormRef = ref<InstanceType<typeof CompaniesForm> | null>(null);



const entityTypes: ('Contacts' | 'Exchanges' | 'Wallets' | 'Companies')[] = ['Contacts', 'Exchanges', 'Wallets', 'Companies'];

const getEntityIcon = (entity: string) => {
  const iconMap: Record<string, any> = {
    'Contacts': User,
    'Exchanges': ArrowLeftRight,
    'Wallets': WalletIcon,
    'Companies': Building2,
  };
  return iconMap[entity] || User;
};

const toggleEntitySelector = () => {
  isEntitySelectorOpen.value = !isEntitySelectorOpen.value;
};

const selectEntity = (entity: 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies') => {
  selectedEntity.value = entity;
  isEntitySelectorOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.entity-selector-wrapper')) {
    isEntitySelectorOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

const modalTitle = computed(() => {
  if (props.contact && selectedEntity.value === 'Contacts') {
    return 'Edit Contact';
  }

  const singularMap: Record<string, string> = {
    'Contacts': 'Contact',
    'Exchanges': 'Exchange',
    'Wallets': 'Wallet',
    'Companies': 'Company'
  };

  const singular = singularMap[selectedEntity.value] || selectedEntity.value.slice(0, -1);
  return `Add New ${singular}`;
});

watch(() => props.show, (newVal) => {
    if (newVal) {
        selectedEntity.value = props.initialEntity || 'Contacts';
    }
});

watch(() => props.initialEntity, (newVal) => {
    if (props.show && newVal) {
        selectedEntity.value = newVal;
    }
});


const handleContactSaved = () => {
  emit('contact-saved');
  close();
};

const handleExchangeSaved = (data: { form: any; wallets: Partial<Wallet>[] }) => {
  emit('exchange-saved', data);
  close();
};

const handleWalletSaved = (data: { form: any; wallets: Partial<Wallet>[] }) => {
  emit('wallet-saved', data);
  close();
};

const handleCompanySaved = (data: { form: any; wallets: Partial<Wallet>[] }) => {
  emit('company-saved', data);
  close();
};

const getSubmitButtonText = () => {
  const textMap: Record<string, string> = {
    'Contacts': 'Save Contact',
    'Exchanges': 'Save Exchange',
    'Wallets': 'Save Wallet',
    'Companies': 'Save Company'
  };
  return textMap[selectedEntity.value] || 'Save';
};

const handleSubmit = () => {
  if (selectedEntity.value === 'Contacts' && contactFormRef.value) {
    (contactFormRef.value as any).handleSave();
  } else if (selectedEntity.value === 'Exchanges' && exchangeFormRef.value) {
    (exchangeFormRef.value as any).handleSave();
  } else if (selectedEntity.value === 'Wallets' && walletFormRef.value) {
    (walletFormRef.value as any).handleSave();
  } else if (selectedEntity.value === 'Companies' && companyFormRef.value) {
    (companyFormRef.value as any).handleSave();
  }
};

const triggerFileImport = () => {
  fileInput.value?.click();
};

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  try {
    if (selectedEntity.value === 'Contacts' && contactFormRef.value) {
      (contactFormRef.value as any).handleFileImportFromModal(file);
    } else if (selectedEntity.value === 'Exchanges' && exchangeFormRef.value) {
      (exchangeFormRef.value as any).handleFileImportFromModal(file);
    } else if (selectedEntity.value === 'Wallets' && walletFormRef.value) {
      (walletFormRef.value as any).handleFileImportFromModal(file);
    } else if (selectedEntity.value === 'Companies' && companyFormRef.value) {
      (companyFormRef.value as any).handleFileImportFromModal(file);
    }
  } catch (error) {
    console.error('Error importing file:', error);
    alert(error instanceof Error ? error.message : 'Error importing file. Please ensure it is a valid JSON file.');
  }

  if (target) {
    target.value = '';
  }
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #f9fafb;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 550px;
  min-height: 550px;
  position: relative;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.modal-body {
  overflow-y: auto;
  flex-grow: 1;
  padding: 1.5rem 2.5rem;
}

.entity-selector-wrapper {
  flex-shrink: 0;
  position: relative;
}

.entity-selector {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.entity-selector:hover {
  border-color: #9ca3af;
}

.entity-selector.open {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.entity-selector-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.entity-selector-display svg {
  flex-shrink: 0;
  display: block;
  color: currentColor;
}

.entity-selector-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 100;
  overflow: hidden;
  min-width: 150px;
}

.entity-selector-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #374151;
}

.entity-selector-option svg {
  flex-shrink: 0;
  display: block;
  color: currentColor;
}

.entity-selector-option:hover {
  background-color: #f3f4f6;
}

.entity-selector-option.selected {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

.entity-selector-option span {
  flex: 1;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin: 0;
  flex-grow: 1;
}

.close-button {
    position: static;
    background: none;
    border: none;
    font-size: 1.75rem;
    line-height: 1;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.2s;
}

.close-button:hover {
    color: #1f2937;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 1.5rem;
}

.tabs button {
  background: none;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tabs button:hover {
  color: #111827;
}

.tabs button.active {
  color: #2563eb;
  font-weight: 600;
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563eb;
}

.tab-content {
  display: grid;
}

.tab-panel {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

.tab-panel.active-panel {
  opacity: 1;
  pointer-events: auto;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

label {
  font-weight: 500;
  color: #374151;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

textarea {
    min-height: 80px;
    resize: vertical;
}

h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.wallets-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.wallet-group {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    gap: 1rem;
    align-items: center;
}

.wallet-header {
    font-weight: 600;
    color: #374151;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: -0.5rem;
}

.wallet-group input,
.wallet-group select {
    margin: 0;
}

.add-wallet-btn, .remove-wallet-btn {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.remove-wallet-btn {
    border: none;
    color: #ef4444;
    padding: 0.5rem;
}
.remove-wallet-btn:hover {
    color: #b91c1c;
    background-color: #fee2e2;
}


.add-wallet-btn {
    align-self: flex-start;
}

.add-wallet-btn:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    font-size: 0.875rem;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
}

.btn-secondary:hover {
    background-color: #d1d5db;
}

.btn-import {
    padding: 0.5rem 1rem;
    border: 1px solid #2563eb;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    background-color: #ffffff;
    color: #2563eb;
    font-size: 0.875rem;
}

.btn-import:hover {
    background-color: #eff6ff;
    border-color: #1d4ed8;
}

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: visible;
}

.form-container > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: visible;
}

.placeholder-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6b7280;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}

.modal-footer {
  padding: 1rem 2.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  justify-content: flex-end;
  gap: 0.625rem;
  flex-shrink: 0;
}
</style>