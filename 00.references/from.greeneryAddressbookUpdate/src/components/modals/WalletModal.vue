<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ wallet.name }}</h2>
        <button class="close-button" @click="close">x</button>
      </div>
      <div class="modal-body">
        <p><strong>ID:</strong> {{ wallet.id }}</p>
        <p><strong>Wallet:</strong> {{ wallet.name }}</p>
        <hr />
        <h3>Currencies ({{ wallet.currencies.length }})</h3>
        <ul>
          <li v-for="currency in wallet.currencies" :key="currency.abbreviation">
            <strong>{{ currency.name }} ({{ currency.abbreviation }}):</strong> {{ currency.address }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

interface Wallet {
  id: number;
  name: string;
  currencies: Currency[];
}

defineProps<{ wallet: Wallet }>();
const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body p {
  margin-bottom: 1rem;
}

.modal-body a {
  color: #2563eb;
  text-decoration: none;
}

.modal-body a:hover {
  text-decoration: underline;
}

.modal-body hr {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
}

.modal-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modal-body ul {
  list-style: none;
  padding: 0;
}

.modal-body li {
  margin-bottom: 0.5rem;
}
</style>

