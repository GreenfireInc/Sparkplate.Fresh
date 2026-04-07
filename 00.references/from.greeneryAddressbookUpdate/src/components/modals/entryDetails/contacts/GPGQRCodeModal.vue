<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>GPG Public Key QR Code</h2>
        <button class="close-button" @click="handleClose" title="Close">
          <X :size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <div v-if="loading" class="loading-state">
          <p>Generating QR code...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <p class="error-message">{{ error }}</p>
          <button @click="generateQRCode" class="retry-button">Retry</button>
        </div>
        
        <div v-else-if="qrCodeDataUrl && wallet" class="gpg-qr-container">
          <!-- Currency Address above QR Code -->
          <div class="address-section">
            <span class="gpg-currency-wrapper">
              <img 
                v-if="getCryptoIconPath(wallet.coinTicker)"
                :src="getCryptoIconPath(wallet.coinTicker)!"
                :alt="wallet.coinTicker"
                class="gpg-currency-icon"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
              <code class="address-text">{{ wallet.coinTicker.toLowerCase() }}://{{ wallet.address }}</code>
            </span>
          </div>
          
          <!-- QR Code -->
          <div class="qr-code-wrapper">
            <img :src="qrCodeDataUrl" alt="GPG Public Key QR Code" class="qr-code-image" />
          </div>
          
          <!-- Key Fingerprint below QR Code -->
          <div v-if="wallet.keyFingerprint" class="fingerprint-section">
            <code class="fingerprint-text">{{ wallet.keyFingerprint }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { X } from 'lucide-vue-next';
import QRCode from 'qrcode';
import type { Wallet } from '../../../../services/walletService';

const props = defineProps<{
  show: boolean;
  wallet: Wallet | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const loading = ref(false);
const error = ref<string | null>(null);
const qrCodeDataUrl = ref<string | null>(null);

const generateQRCode = async () => {
  if (!props.wallet || !props.wallet.gpgPublicKey) {
    error.value = 'No GPG public key provided';
    return;
  }

  loading.value = true;
  error.value = null;
  qrCodeDataUrl.value = null;

  try {
    const dataUrl = await QRCode.toDataURL(props.wallet.gpgPublicKey, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    qrCodeDataUrl.value = dataUrl;
  } catch (err: any) {
    console.error('Error generating QR code:', err);
    error.value = err.message || 'Failed to generate QR code';
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  emit('close');
};

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
};

// Generate QR code when modal opens
watch(() => props.show, (newVal) => {
  if (newVal && props.wallet && props.wallet.gpgPublicKey) {
    generateQRCode();
  }
});

onMounted(() => {
  if (props.show && props.wallet && props.wallet.gpgPublicKey) {
    generateQRCode();
  }
});
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
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: color 0.2s;
  border-radius: 0.25rem;
}

.close-button:hover {
  color: #374151;
  background-color: #f3f4f6;
}

.modal-body {
  padding: 2rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 1rem;
}

.error-message {
  color: #dc2626;
  margin-bottom: 1rem;
}

.retry-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #1d4ed8;
}

.gpg-qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.address-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.gpg-currency-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.gpg-currency-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.address-text {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #374151;
  word-break: break-all;
}

.qr-code-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.qr-code-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.fingerprint-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.fingerprint-text {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #374151;
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  word-break: break-all;
  text-align: center;
}
</style>

