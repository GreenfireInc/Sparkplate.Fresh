<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Import Wallets</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div v-if="file" class="file-stats">
          <p><strong>File:</strong> {{ file.name }}</p>
          <p><strong>Size:</strong> {{ (file.size / 1024).toFixed(2) }} KB</p>
          <p><strong>Wallets:</strong> {{ wallets.length }}</p>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Address</th>
                <th>Key Fingerprint</th>
                <th>Public Key</th>
                <th>GPG Public Key</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(wallet, index) in wallets" :key="index">
                <td>
                  <span class="currency-wrapper">
                    <img 
                      v-if="getCryptoIconPath(wallet.coinTicker)"
                      :src="getCryptoIconPath(wallet.coinTicker)!"
                      :alt="wallet.coinTicker"
                      class="currency-icon"
                      @error="($event.target as HTMLImageElement).style.display = 'none'"
                    />
                    <strong>{{ wallet.coinTicker }}</strong>
                  </span>
                </td>
                <td class="address-cell">
                  <code>{{ wallet.coinTicker.toLowerCase() }}://{{ wallet.address }}</code>
                </td>
                <td class="fingerprint-cell">
                  <code v-if="wallet.keyFingerprint">{{ wallet.keyFingerprint }}</code>
                  <span v-else class="no-data">—</span>
                </td>
                <td class="public-key-cell">
                  <code v-if="wallet.cryptoPublicKey">{{ truncateKey(wallet.cryptoPublicKey) }}</code>
                  <span v-else class="no-data">—</span>
                </td>
                <td class="gpg-key-cell">
                  <span v-if="wallet.gpgPublicKey" class="has-gpg">Yes</span>
                  <span v-else class="no-data">—</span>
                </td>
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
import type { ImportedWallet } from '../../../lib/cores/importStandard/importWallet.json';

const props = defineProps({
  show: { type: Boolean, required: true },
  file: { type: Object as () => File | null, default: null },
  wallets: { type: Array as () => ImportedWallet[], default: () => [] },
});

const emit = defineEmits(['close', 'confirm']);

const close = () => emit('close');
const confirm = () => emit('confirm', props.wallets);

const truncateKey = (key: string): string => {
  if (key.length <= 20) return key;
  return `${key.substring(0, 10)}...${key.substring(key.length - 10)}`;
};

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
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
  border-radius: 0.5rem;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #374151;
}

.modal-body {
  margin-bottom: 1.5rem;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.file-stats {
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.file-stats p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.table-wrapper {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

td {
  font-size: 0.875rem;
}

.currency-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.currency-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.address-cell code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  word-break: break-all;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  max-width: 100%;
}

.fingerprint-cell code,
.public-key-cell code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  word-break: break-all;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  max-width: 200px;
}

.no-data {
  color: #9ca3af;
  font-style: italic;
}

.has-gpg {
  color: #059669;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.btn-secondary {
  background-color: #ffffff;
  color: #1f2937;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}
</style>

