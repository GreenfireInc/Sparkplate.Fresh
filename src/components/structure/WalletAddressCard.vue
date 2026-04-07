<template>
  <div class="wallet-item">
    <div class="wallet-network">
      <img 
        v-if="getCryptoIconPath(wallet.coinTicker)" 
        :src="getCryptoIconPath(wallet.coinTicker)" 
        :alt="wallet.coinTicker"
        class="crypto-icon"
        @error="$event.target.style.display = 'none'"
      />
      <span class="network-badge">{{ wallet.coinTicker }}</span>
    </div>
    <button 
      class="delete-button" 
      @click="handleDelete"
      title="Delete wallet"
    >
      <Trash2 :size="16" />
    </button>
    <div class="wallet-qr">
      <QrCode :size="80" class="qr-icon" />
    </div>
    <div class="wallet-content">
      <div class="wallet-address">
        <code class="address-text">{{ wallet.coinTicker.toLowerCase() }}://{{ wallet.address }}</code>
        <button 
          class="copy-button" 
          @click="copyToClipboard(wallet.address)"
          title="Copy address"
        >
          <Copy :size="16" />
        </button>
      </div>
      <div v-if="wallet.keyFingerprint" class="wallet-fingerprint">
        <code class="fingerprint-text">{{ wallet.keyFingerprint }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QrCode, Copy, Trash2 } from 'lucide-vue-next';
import type { Wallet } from '@/services/addressBook/walletService';

const props = defineProps<{
  wallet: Wallet;
}>();

const emit = defineEmits<{
  (e: 'delete', walletId: number): void;
  (e: 'copy', address: string): void;
}>();

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    emit('copy', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const handleDelete = () => {
  emit('delete', props.wallet.id);
};
</script>

<style scoped>
.wallet-item {
  aspect-ratio: 1;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #ffffff;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;
}

.wallet-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wallet-qr {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
}

.qr-icon {
  color: #374151;
  opacity: 0.6;
}

.wallet-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.wallet-network {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.crypto-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  object-fit: contain;
}

.network-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
}

.wallet-address {
  padding: 0.5rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  word-break: break-all;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.address-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.7rem;
  color: #1f2937;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.delete-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  z-index: 1;
}

.delete-button:hover {
  background-color: #fee2e2;
}

.copy-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.copy-button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.wallet-fingerprint {
  padding: 0.5rem;
  background-color: #f0f9ff;
  border-radius: 0.375rem;
  text-align: center;
  margin-top: 0.25rem;
}

.fingerprint-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.65rem;
  color: #0369a1;
  margin: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

