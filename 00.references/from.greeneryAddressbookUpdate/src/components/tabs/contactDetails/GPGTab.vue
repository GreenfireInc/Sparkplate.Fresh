<template>
  <div class="gpg-tab">
    <h3>GPG Public Keys</h3>
    <div v-if="gpgKeys.length === 0" class="empty-state">
      <p>No GPG public keys found for this contact.</p>
    </div>
    <div v-else class="gpg-keys-list">
      <div v-for="wallet in gpgKeys" :key="wallet.id" class="gpg-key-item">
        <div class="gpg-key-header">
          <div class="gpg-key-info">
            <span class="gpg-currency-wrapper">
              <img 
                v-if="getCryptoIconPath(wallet.coinTicker)"
                :src="getCryptoIconPath(wallet.coinTicker)!"
                :alt="wallet.coinTicker"
                class="gpg-currency-icon"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
              <span class="gpg-currency">{{ wallet.coinTicker.toLowerCase() }}://{{ wallet.address }}</span>
            </span>
            <span v-if="wallet.keyFingerprint" class="gpg-fingerprint">
              <code>{{ wallet.keyFingerprint }}</code>
            </span>
          </div>
        </div>
        <div v-if="wallet.gpgPublicKey" class="gpg-key-content">
          <div class="gpg-public-key-wrapper">
            <pre class="gpg-public-key"><code>{{ wallet.gpgPublicKey }}</code></pre>
            <div class="action-buttons">
              <button class="combine-button" title="Encrypt File" @click="handleEncryptFile(wallet)">
                <FileLock :size="16" />
              </button>
              <button class="qrcode-button" title="QR Code" @click="handleShowQRCode(wallet)">
                <QrCode :size="16" />
              </button>
              <button @click="copyGpgKey(wallet.gpgPublicKey)" class="copy-button" title="Copy GPG public key">
                <Copy :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GPGQRCodeModal
      :show="showQRCodeModal"
      :wallet="selectedWalletForQR"
      @close="showQRCodeModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Copy, FileLock, QrCode } from 'lucide-vue-next';
import { getWalletsForContact, type Wallet } from '../../../services/walletService';
import { encryptAndDownloadFile } from '../../../lib/cores/cryptographyCore/encryption.gpg/encryption.gpg';
import GPGQRCodeModal from '../../modals/entryDetails/contacts/GPGQRCodeModal.vue';

const props = defineProps<{
  contactId: number | null;
}>();

const gpgKeys = ref<Wallet[]>([]);
const showQRCodeModal = ref(false);
const selectedWalletForQR = ref<Wallet | null>(null);

const loadGPGKeys = async () => {
  if (props.contactId) {
    const wallets = await getWalletsForContact(props.contactId);
    // Filter wallets that have GPG public keys
    gpgKeys.value = wallets.filter(w => w.gpgPublicKey);
  } else {
    gpgKeys.value = [];
  }
};

onMounted(() => {
  loadGPGKeys();
});

watch(() => props.contactId, () => {
  loadGPGKeys();
}, { immediate: true });

// Get crypto icon path based on coin ticker
const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null;
  const tickerLower = coinTicker.toLowerCase();
  return `/assets/icons/crypto/${tickerLower}.svg`;
};

const copyGpgKey = async (gpgKey: string) => {
  try {
    await navigator.clipboard.writeText(gpgKey);
    // You could add a toast notification here
    console.log('GPG public key copied to clipboard');
  } catch (err) {
    console.error('Failed to copy GPG public key:', err);
    alert('Failed to copy GPG public key to clipboard');
  }
};

const handleEncryptFile = async (wallet: Wallet) => {
  if (!wallet.gpgPublicKey) {
    alert('No GPG public key available for this wallet');
    return;
  }

  // Create a file input element
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  
  input.onchange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) {
      document.body.removeChild(input);
      return;
    }

    try {
      await encryptAndDownloadFile(file, wallet.gpgPublicKey!);
      alert('File encrypted successfully!');
    } catch (err) {
      console.error('Error encrypting file:', err);
      alert(`Failed to encrypt file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      // Clean up
      document.body.removeChild(input);
    }
  };

  // Add to body, trigger click, and remove after
  document.body.appendChild(input);
  input.click();
};

const handleShowQRCode = (wallet: Wallet) => {
  if (!wallet.gpgPublicKey) {
    alert('No GPG public key available for this wallet');
    return;
  }
  selectedWalletForQR.value = wallet;
  showQRCodeModal.value = true;
};

// Expose a method to refresh GPG keys and the count from parent
defineExpose({
  refresh: loadGPGKeys,
  get count() {
    return gpgKeys.value.length;
  }
});
</script>

<style scoped>
.gpg-tab {
  padding: 1rem;
}

.gpg-tab h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-state p {
  margin: 0;
}

.gpg-keys-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gpg-key-item {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 1rem;
  background-color: #f9fafb;
}

.gpg-key-header {
  margin-bottom: 0.75rem;
}

.gpg-key-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.gpg-currency-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.gpg-currency-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.gpg-currency {
  font-size: 1rem;
  color: #1f2937;
}

.gpg-fingerprint {
  font-size: 0.875rem;
}

.gpg-fingerprint code {
  background-color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #374151;
  word-break: break-all;
}

.gpg-key-content {
  margin-top: 0.75rem;
}

.gpg-public-key-wrapper {
  position: relative;
}

.gpg-public-key {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

.gpg-public-key code {
  color: #374151;
  background: transparent;
  padding: 0;
  border: none;
}

.action-buttons {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.combine-button,
.qrcode-button,
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

.combine-button:hover,
.qrcode-button:hover,
.copy-button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

</style>

