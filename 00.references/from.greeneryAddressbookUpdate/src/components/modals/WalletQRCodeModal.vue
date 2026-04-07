<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click.stop>
       
      
      <div class="modal-body">
        <div v-if="loading" class="loading-state">
          <p>Generating QR code...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <p class="error-message">{{ error }}</p>
          <button @click="generateQRCode" class="retry-button">Retry</button>
        </div>
        
        <div v-else-if="qrCodeDataUrl && wallet" class="wallet-qr-container">
          <!-- GPG Key Fingerprint at the top -->
          <div v-if="wallet?.keyFingerprint" class="fingerprint-section"> 
            <code class="fingerprint-text">{{ wallet.keyFingerprint }}</code>
          </div>
          
          <!-- QR Code -->
          <div class="qr-code-wrapper">
            <img :src="qrCodeDataUrl" alt="Wallet QR Code" class="qr-code-image" />
            <img 
              v-if="wallet && getCryptoIconPath(wallet.coinTicker)" 
              :src="getCryptoIconPath(wallet.coinTicker)" 
              :alt="wallet.coinTicker"
              class="crypto-icon-overlay"
              @error="$event.target.style.display = 'none'"
            />
          </div>
          
          <!-- Full Public Address -->
          <div class="address-section full-address-section"> 
            <label class="section-label">Public Wallet Address</label>
            <div class="full-address-wrapper">
              <code class="full-address-text">{{ fullAddress }}</code>
              <button @click="copyAddress" class="copy-button" title="Copy address">
                <Copy :size="16" />
              </button>
            </div>
          </div>
          
          <!-- Crypto Public Key -->
          <div v-if="wallet?.cryptoPublicKey" class="address-section crypto-public-key-section">
            <label class="section-label">Crypto Public Key</label>
            <div class="full-address-wrapper">
              <code class="full-address-text">{{ wallet.cryptoPublicKey }}</code>
              <button @click="copyCryptoPublicKey" class="copy-button" title="Copy crypto public key">
                <Copy :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Copy } from 'lucide-vue-next';
import QRCode from 'qrcode';
import type { Wallet } from '../../services/walletService';

const props = defineProps<{
  show: boolean;
  wallet: Wallet | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const loading = ref(true);
const error = ref<string | null>(null);
const qrCodeDataUrl = ref<string | null>(null);

// Full address with prefix
const fullAddress = computed(() => {
  if (!props.wallet) return '';
  return `${props.wallet.coinTicker.toLowerCase()}://${props.wallet.address}`;
});

const generateQRCode = async () => {
  if (!props.wallet) {
    error.value = 'No wallet provided';
    return;
  }

  loading.value = true;
  error.value = null;
  qrCodeDataUrl.value = null;

  try {
    const walletAddress = `${props.wallet.coinTicker.toLowerCase()}://${props.wallet.address}`;
    const dataUrl = await QRCode.toDataURL(walletAddress, {
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

const copyAddress = async () => {
  if (!fullAddress.value) return;

  try {
    await navigator.clipboard.writeText(fullAddress.value);
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy address:', err);
    alert('Failed to copy address to clipboard');
  }
};

const copyCryptoPublicKey = async () => {
  if (!props.wallet?.cryptoPublicKey) return;

  try {
    await navigator.clipboard.writeText(props.wallet.cryptoPublicKey);
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy crypto public key:', err);
    alert('Failed to copy crypto public key to clipboard');
  }
};

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
};

// Generate QR code when modal opens
watch(() => props.show, (newVal) => {
  if (newVal && props.wallet) {
    generateQRCode();
  }
});

onMounted(() => {
  if (props.show && props.wallet) {
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
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
}

.close-button:hover {
  color: #000;
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
  color: #d32f2f;
  margin-bottom: 1rem;
}

.retry-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #1565c0;
}

.wallet-qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.fingerprint-section {
  width: 100%;
  text-align: center;
}

.section-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fingerprint-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  color: #0369a1;
  background-color: #f0f9ff;
  padding: 0.75rem;
  border-radius: 0.375rem;
  display: block;
  word-break: break-all;
}

.qr-code-wrapper {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.qr-code-image {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
}

.crypto-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 8px;
  z-index: 1;
}

.address-section {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.address-section .section-label {
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
}

.address-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  color: #1f2937;
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.375rem;
  display: block;
  word-break: break-all;
  width: 100%;
}

.full-address-section {
  width: 100%;
}

.full-address-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.full-address-text {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8rem;
  color: #1f2937;
  display: block;
  word-break: break-all;
  flex: 1;
  min-width: 0;
  margin: 0;
}

.copy-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
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
</style>
