<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">x</button>
      <h2>{{ isEditing ? 'Edit Exchange' : 'Add New Exchange' }}</h2>
      <form @submit.prevent="saveExchange">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Exchange Name</label>
            <input type="text" id="name" v-model="form.name" required/>
          </div>
          <div class="form-group">
            <label for="email">Associated Email</label>
            <input type="email" id="email" v-model="form.email" />
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="url">URL</label>
            <input type="text" id="url" v-model="form.url" />
          </div>
          <div class="form-group">
            <label for="referralUrl">Referral URL</label>
            <input type="text" id="referralUrl" v-model="form.referralUrl" />
          </div>
        </div>
        <div class="form-group full-width">
            <label for="referralCode">Referral Code</label>
            <input type="text" id="referralCode" v-model="form.referralCode" />
        </div>

        <h3>Currencies</h3>
        <div class="currencies-section">
            <div v-if="form.currencies.length > 0" class="currency-group currency-header">
                <strong>Name</strong>
                <strong>Ticker</strong>
                <strong>Address</strong>
                <span></span> <!-- Empty span for alignment -->
            </div>
            <div v-for="(currency, index) in form.currencies" :key="index" class="currency-group">
                <input type="text" v-model="currency.name" placeholder="e.g., Bitcoin" />
                <input type="text" v-model="currency.abbreviation" placeholder="e.g., BTC" />
                <input type="text" v-model="currency.address" placeholder="Wallet Address" />
                <button type="button" class="remove-currency-btn" @click="removeCurrency(index)">Remove</button>
            </div>
            <button type="button" class="add-currency-btn" @click="addCurrencyRow">+ Add Currency</button>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="close">Cancel</button>
          <button type="submit" class="btn-primary">Save Exchange</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Assuming these interfaces. They might need to be imported from a service file.
interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

interface Exchange {
  id?: number;
  name: string;
  url: string;
  referralUrl: string;
  referralCode: string;
  currencies: Currency[];
  email: string;
}

const props = defineProps<{ exchange: Exchange | null }>();
const emit = defineEmits(['close', 'exchange-saved']);

const isEditing = ref(false);
const form = ref<Exchange>({ name: '', url: '', referralUrl: '', referralCode: '', currencies: [], email: '' });

watch(() => props.exchange, (newExchange) => {
  if (newExchange) {
    isEditing.value = true;
    // Deep copy to avoid mutating the prop
    form.value = JSON.parse(JSON.stringify(newExchange));
  } else {
    isEditing.value = false;
    form.value = { name: '', url: '', referralUrl: '', referralCode: '', currencies: [], email: '' };
  }
}, { immediate: true, deep: true });

function addCurrencyRow() {
  form.value.currencies.push({ name: '', abbreviation: '', address: '' });
}

function removeCurrency(index: number) {
  form.value.currencies.splice(index, 1);
}

function saveExchange() {
  // The parent component will handle the actual saving logic
  emit('exchange-saved', form.value);
  close();
}

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
  background-color: #f9fafb; /* Light gray background */
  padding: 2.5rem;
  border-radius: 0.75rem; /* Slightly larger radius */
  width: 90%;
  max-width: 650px; /* Increased width for better layout */
  position: relative;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 90vh;
  overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
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

h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    text-align: center;
    margin-bottom: 1.5rem;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem; /* Spacing between form groups */
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
input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input[type="text"]:focus,
input[type="email"]:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
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

.currencies-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.currency-group {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr auto;
    gap: 0.75rem;
    align-items: center;
}

.currency-header {
    font-weight: 600;
    color: #374151;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: -0.5rem; /* pull the items closer */
}

.currency-group input {
    margin: 0;
}

.add-currency-btn, .remove-currency-btn {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.remove-currency-btn {
    border: none;
    color: #ef4444;
    padding: 0.5rem;
}
.remove-currency-btn:hover {
    color: #b91c1c;
    background-color: #fee2e2;
}


.add-currency-btn {
    align-self: flex-start;
}

.add-currency-btn:hover {
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
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
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
</style>