<template>
  <div class="donations-container">
    <h3 class="text-lg font-semibold text-center mb-4">Cryptocurrency Donations</h3>
    
    <!-- Hover overlay for centered QR codes -->
    <div 
      v-if="hoveredQR && shouldCenterMagnify(hoveredQR)"
      class="qr-overlay"
      @mouseenter="clearHoverTimeout"
      @mouseleave="scheduleHoverTimeout"
    >
      <div class="magnified-qr-container">
        <button @click="hoveredQR = null" class="close-btn">&times;</button>
        <img 
          :src="generateQRCode(getAddressWithoutPrefix(hoveredQR))" 
          :alt="`QR code for ${getSymbolFromAddress(hoveredQR)}`" 
          class="magnified-qr-code"
        />
        <div class="magnified-logo-overlay">
          <div class="magnified-logo-container">
            <img 
              :src="getLogoPath(getSymbolFromAddress(hoveredQR))" 
              :alt="`${getSymbolFromAddress(hoveredQR)} logo`" 
              class="magnified-crypto-logo"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div class="crypto-wallets-grid">
      <div 
        v-for="wallet in cryptoWallets" 
        :key="wallet.address" 
        class="wallet-card"
        :class="{ 'opacity-30': hoveredQR && hoveredQR !== wallet.address }"
      >
        <span class="font-bold text-sm">{{ getSymbolFromAddress(wallet.address) }}</span>
        
        <div 
          class="qr-container"
          :class="{ 
            'opacity-30': hoveredQR && hoveredQR !== wallet.address,
            'hidden-when-centered': hoveredQR === wallet.address && shouldCenterMagnify(wallet.address)
          }"
          :style="getQrContainerStyle(wallet.address)"
          @mouseenter="handleMouseEnter(wallet.address)"
          @mouseleave="handleMouseLeave"
        >
          <img 
            :src="generateQRCode(getAddressWithoutPrefix(wallet.address))" 
            :alt="`QR code for ${wallet.name}`" 
            class="qr-code"
          />
          <div class="logo-overlay">
            <div class="logo-container">
              <img 
                :src="getLogoPath(getSymbolFromAddress(wallet.address))" 
                :alt="`${wallet.name} logo`" 
                class="crypto-logo"
              />
            </div>
          </div>
        </div>
        
        <div :class="{ 'opacity-30': hoveredQR && hoveredQR !== wallet.address }">
          <p class="font-medium text-xs">{{ wallet.name }}</p>
          <div class="address-container">
            <div class="address-display">
              <span class="font-semibold">{{ getSymbolFromAddress(wallet.address) }}://</span>
              <span class="address-text" :title="wallet.address">{{ getAddressWithoutPrefix(wallet.address) }}</span>
            </div>
            <button 
              @click="copyToClipboard(wallet.address)"
              class="copy-button"
              :title="'Copy address'"
            >
              <span v-if="copiedAddress === wallet.address" class="checkmark">✓</span>
              <span v-else class="copy-icon">📋</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="other-support mt-6">
      <h3 class="text-lg font-semibold mb-2">Other Ways to Support</h3>
      <p class="text-sm text-muted">
        You can also support us by sharing Sparkplate with others who might find it useful,
        providing feedback, or contributing to our open source projects on GitHub. We also accept PayPal donations, 
        <a href="https://py.pl/1b3TBm" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">0xGreenfire</a>
      </p>
    </div>

    <div class="thank-you mt-4 pt-4 border-t">
      <p class="text-sm text-muted">
        Thank you for your support! All donations go directly toward server costs, data updates, and new features.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import QRCode from 'qrcode';

export default {
  name: 'DonationsView',
  setup() {
    const cryptoWallets = [
      {
        name: "Bitcoin Cash",
        address: "BCH://1PHveXq678AcmhmoGupo36hpovU3mSK3tz"
      },
      {
        name: "Bitcoin",
        address: "BTC://1PHveXq678AcmhmoGupo36hpovU3mSK3tz"
      },
      {
        name: "Litecoin",
        address: "LTC://LdmVDneQWKJf2T98KNV6BtRetpDtrHTZQK"
      },
      {
        name: "Ethereum",
        address: "ETH://0xD0607e1C8d2e6db204Db80A891a3014201017423"
      },
      {
        name: "Dogecoin",
        address: "DOGE://DHS4dKs4sTNEP6JKittxcYJSKr3V1W5ify"
      },
      {
        name: "Tezos",
        address: "XTZ://tz1Yypqjtxwp8p7Hg6roJm4GArcAfFhLg9Pr"
      },
      {
        name: "Terra Classic",
        address: "LUNC://terra1aacapxkck24yrf7mj06za3wz0fy3dxrll7gcrm"
      },
      {
        name: "Solana",
        address: "SOL://3BdhtQJPZ6vhWzfj6qQTUqSPdVyVNQ1BnBjTSjdaQyLu"
      },
      {
        name: "Binance Coin",
        address: "BNB://0xD0607e1C8d2e6db204Db80A891a3014201017423"
      }
    ];

    const copiedAddress = ref(null);
    const hoveredQR = ref(null);
    const qrCodes = ref({});
    const hoverTimeout = ref(null);

    const copyToClipboard = (address) => {
      navigator.clipboard.writeText(address);
      copiedAddress.value = address;
      setTimeout(() => {
        copiedAddress.value = null;
      }, 2000);
    };

    const getSymbolFromAddress = (address) => {
      const parts = address.split("://");
      return parts[0] || "";
    };

    const getAddressWithoutPrefix = (address) => {
      const parts = address.split("://");
      return parts.length > 1 ? parts[1] : address;
    };

    const getLogoPath = (symbol) => {
      const symbolLower = symbol.toLowerCase();
      return `/assets/icons/crypto/${symbolLower}.svg`;
    };

    const shouldCenterMagnify = (address) => {
      const symbol = getSymbolFromAddress(address);
      return ['BCH', 'LTC', 'ETH', 'XTZ', 'LUNC', 'BNB', 'BTC', 'DOGE', 'SOL'].includes(symbol);
    };
    
    const getQrContainerStyle = (address) => {
      return {
        zIndex: '1',
        transform: 'scale(1)',
        filter: hoveredQR.value && hoveredQR.value !== address ? 'blur(2px)' : 'none',
        position: 'relative'
      };
    };

    const clearHoverTimeout = () => {
      if (hoverTimeout.value) {
        clearTimeout(hoverTimeout.value);
        hoverTimeout.value = null;
      }
    };

    const scheduleHoverTimeout = () => {
      clearHoverTimeout();
      hoverTimeout.value = setTimeout(() => {
        hoveredQR.value = null;
      }, 100);
    };

    const handleMouseEnter = (address) => {
      clearHoverTimeout();
      hoveredQR.value = address;
    };

    const handleMouseLeave = () => {
      scheduleHoverTimeout();
    };

    const generateQRCode = (text) => {
      if (!qrCodes.value[text]) {
        try {
          QRCode.toDataURL(text, { 
            errorCorrectionLevel: 'H',
            margin: 2,
            width: 200,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          }).then(url => {
            qrCodes.value[text] = url;
          });
          return qrCodes.value[text] || '';
        } catch (err) {
          console.error("QR Code generation error:", err);
          return '';
        }
      }
      return qrCodes.value[text];
    };

    // Pre-generate QR codes for all wallets
    cryptoWallets.forEach(wallet => {
      const address = getAddressWithoutPrefix(wallet.address);
      generateQRCode(address);
    });

    // Cleanup timeout on unmount
    onUnmounted(() => {
      clearHoverTimeout();
    });

    return {
      cryptoWallets,
      copiedAddress,
      hoveredQR,
      copyToClipboard,
      getSymbolFromAddress,
      getAddressWithoutPrefix,
      getLogoPath,
      generateQRCode,
      shouldCenterMagnify,
      getQrContainerStyle,
      handleMouseEnter,
      handleMouseLeave,
      clearHoverTimeout,
      scheduleHoverTimeout
    };
  }
};
</script>

<style lang="scss" scoped>
.donations-container {
  padding: 1rem 0;
  position: relative;
}

.qr-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.magnified-qr-container {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    color: #666;
  }
}

.magnified-qr-code {
  width: 250px;
  height: 250px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.magnified-logo-overlay {
  position: absolute;
  inset: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.magnified-logo-container {
  background-color: white;
  padding: 8px;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.magnified-crypto-logo {
  width: 2rem;
  height: 2rem;
}

.crypto-wallets-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.wallet-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  transition: opacity 0.3s ease-in-out;
}

.qr-container {
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: relative;
  cursor: zoom-in;
  transition: all 0.3s ease-in-out;
  transform-origin: center center;
}

.hidden-when-centered {
  opacity: 0.3;
}

.qr-code {
  width: 100px;
  height: 100px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.logo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  background-color: white;
  padding: 0.25rem;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crypto-logo {
  width: 1rem;
  height: 1rem;
}

.address-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;
}

.address-display {
  font-size: 0.75rem;
  color: #666;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
}

.copy-button {
  margin-left: 0.25rem;
  color: #666;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.75rem;
  
  &:hover {
    color: #333;
  }
}

.checkmark {
  color: #22c55e;
}

.text-muted {
  color: #666;
}

@media (max-width: 768px) {
  .crypto-wallets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .crypto-wallets-grid {
    grid-template-columns: 1fr;
  }
}
</style> 