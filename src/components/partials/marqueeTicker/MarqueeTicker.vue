<!-- This is a marquee ticker component that displays a list of cryptocurrencies and their prices. 
 It uses the CoinGecko API to fetch the data. 
 Worked on by Corey Stedman
 -->

<template>
  <div class="marquee-ticker">
    <div class="marquee-container">
      <div
        class="marquee-content"
        ref="marqueeContent"
        :style="{ animationDuration: `${duration}s` }"
      >
        <div class="marquee-item">
          <div
            v-for="coin in coins"
            :key="coin.id"
            class="coin-item"
            @click.stop="handleCoinClick(coin)"
          >
            <!-- This is the coin icon, had to prepend ./assets/cryptoicons/ to the path because it was not loading the icons -->
            <img
              :src="`./assets/icons/crypto/${coin.symbol.toLowerCase()}.svg`"
              :alt="coin.symbol"
              class="coin-icon"
            />
            <span class="coin-symbol">{{ coin.symbol }}</span>
            <span
              class="coin-price"
              :class="{
                'price-up': coin.priceChange > 0,
                'price-down': coin.priceChange < 0
              }"
            >
              ${{ formatPrice(coin.price) }} ({{
                coin.priceChange > 0 ? '+' : ''
              }}{{ coin.priceChange.toFixed(2) }}%)
            </span>
          </div>
        </div>
        <!-- Duplicate for seamless looping -->
        <div class="marquee-item">
          <div
            v-for="coin in coins"
            :key="`dup-${coin.id}`"
            class="coin-item"
            @click.stop="handleCoinClick(coin)"
          >
            <img
              :src="`./assets/icons/crypto/${coin.symbol.toLowerCase()}.svg`"
              :alt="coin.symbol"
              class="coin-icon"
            />
            <span class="coin-symbol">{{ coin.symbol }}</span>
            <span
              class="coin-price"
              :class="{
                'price-up': coin.priceChange > 0,
                'price-down': coin.priceChange < 0
              }"
            >
              ${{ formatPrice(coin.price) }} ({{
                coin.priceChange > 0 ? '+' : ''
              }}{{ coin.priceChange.toFixed(2) }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Coin Details Modal -->
    <DialogRoot :open="!!selectedCoin" @update:open="onDialogOpenChange">
      <DialogPortal>
        <DialogOverlay class="mt-modal-overlay" />
        <DialogContent class="mt-modal-content" :aria-describedby="undefined">
          <div v-if="selectedCoin" class="mt-modal-inner">
            <div class="mt-modal-header">
              <img
                :src="`./assets/icons/crypto/${selectedCoin.symbol.toLowerCase()}.svg`"
                :alt="selectedCoin.symbol"
                class="mt-modal-icon"
              />
              <DialogTitle class="mt-modal-title">
                {{ selectedCoin.name }} ({{ selectedCoin.symbol }})
              </DialogTitle>
            </div>
            <div class="mt-modal-metrics">
              <div class="mt-modal-row">
                <span class="mt-modal-label">{{ t('currentPrice') }}</span>
                <span class="mt-modal-value">${{ formatPrice(selectedCoin.price) }}</span>
              </div>
              <div class="mt-modal-row">
                <span class="mt-modal-label">{{ t('change24h') }}</span>
                <span
                  class="mt-modal-value"
                  :class="selectedCoin.priceChange > 0 ? 'mt-modal-value--up' : 'mt-modal-value--down'"
                >
                  {{ selectedCoin.priceChange > 0 ? '+' : '' }}{{ selectedCoin.priceChange.toFixed(2) }}%
                </span>
              </div>
              <div class="mt-modal-row">
                <span class="mt-modal-label">{{ t('marketCap') }}</span>
                <span class="mt-modal-value">${{ formatMarketCap(selectedCoin.marketCap) }}</span>
              </div>
            </div>
            <a
              :href="`https://gemini.com/share/jwqzg5fe`"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-modal-link"
            >
            {{ t('tradeOnGemini') }}
              <img src="/assets/icons/exchanges/gemini.svg" alt="Gemini" class="mt-modal-link-icon" />
              
            </a>
            <DialogClose class="mt-modal-close">
              {{ t('close') }}
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<script>
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue'
import { useI18n } from '@/composables/useI18n'
import { COINBASE50 } from '@/lib/cores/currencyCore/indexComposites/coinbase50'
import { coinGeckoAPI } from '@/lib/cores/currencyCore/aggregators/coinGeckoAPI'

export default {
  name: 'MarqueeTicker',
  components: {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogClose,
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      coins: [],
      selectedCoin: null,
      fetchInterval: null,
      duration: 240,
      isPaused: false,
      isLoading: true,
      loadingError: null
    }
  },
  methods: {
    // Helper function to shuffle an array (Fisher-Yates algorithm)
    shuffleArray(array) {
      const shuffled = [...array] // Create a copy to avoid modifying the original
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
      }
      return shuffled
    },

    async fetchCoinPrices() {
      try {
        this.isLoading = true
        this.loadingError = null

        // Randomize the coin list order before fetching
        const randomizedCoins = this.shuffleArray(COINBASE50)

        // Use CoinGecko API module
        const coinIds = randomizedCoins.map((coin) => coin.id)
        const data = await coinGeckoAPI.utils.fetchMarketData({
          ids: coinIds,
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h'
        })

        // Map the data to our coins array, using only local icons
        this.coins = randomizedCoins.map((coin) => {
          const coinData = data.find((item) => item.id === coin.id)
          return {
            ...coin,
            price: coinData?.current_price || 0,
            priceChange: coinData?.price_change_percentage_24h || 0,
            marketCap: coinData?.market_cap || 0
          }
        })

        this.isLoading = false
      } catch (error) {
        console.error('Error fetching coin prices:', error)
        this.loadingError = this.t('checkInternetConnection')
        this.isLoading = false
        this.coins = []
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      }).format(price)
    },
    formatMarketCap(marketCap) {
      if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`
      if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`
      if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`
      return marketCap.toFixed(2)
    },
    handleCoinClick(coin) {
      this.selectedCoin = coin
      this.isPaused = true
      this.$refs.marqueeContent.style.animationPlayState = 'paused'
    },
    closeModal() {
      this.selectedCoin = null
      this.isPaused = false
      this.$refs.marqueeContent.style.animationPlayState = 'running'
    },
    onDialogOpenChange(open) {
      if (!open) this.closeModal()
    }
  },
  mounted() {
    this.fetchCoinPrices()
    // Set up interval to refresh prices every 5 minutes
    this.fetchInterval = setInterval(this.fetchCoinPrices, 5 * 60 * 1000)
  },
  beforeUnmount() {
    if (this.fetchInterval) clearInterval(this.fetchInterval)
  }
}
</script>

<style scoped>
.marquee-ticker {
  height: 36px;
  background-color: #262b38;
  overflow: hidden;
  width: 100%;
}

.marquee-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: inline-flex;
  height: 100%;
  animation: marquee linear infinite;
  position: absolute;
}

.marquee-item {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
}

.coin-item {
  display: inline-flex;
  align-items: center;
  padding: 0 20px; /* Increased padding from 10px to 20px for more spacing */
  cursor: pointer;
  height: 100%;
  transition: background-color 0.2s;
  position: relative;
}

/* Add separator between items */
.coin-item:not(:last-child)::after {
  content: '•';
  position: absolute;
  right: 0;
  color: rgba(255, 255, 255, 0.3);
}

.coin-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.coin-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px; /* Increased from 5px to 8px for more spacing */
}

.coin-symbol {
  font-weight: bold;
  margin-right: 8px; /* Increased from 5px to 8px for more spacing */
  color: #fff;
}

.coin-price {
  color: #fff;
}

.price-up {
  color: #4ade80;
}

.price-down {
  color: #f87171;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ── Modal: Radix Dialog (portals to body, use unscoped block below) ── */
</style>

<!-- Unscoped: DialogPortal teleports to body -->
<style>
.mt-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.mt-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #262b38;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 0;
  max-width: 22rem;
  width: 92vw;
  z-index: 9999;
  overflow: hidden;
}

.mt-modal-inner {
  padding: 1.25rem;
}

.mt-modal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mt-modal-icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
}

.mt-modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  line-height: 1.3;
}

.mt-modal-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mt-modal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.mt-modal-label {
  color: rgba(255, 255, 255, 0.7);
}

.mt-modal-value {
  color: #fff;
  font-weight: 500;
}

.mt-modal-value--up {
  color: #4ade80;
}

.mt-modal-value--down {
  color: #f87171;
}

.mt-modal-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: #4ade80;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.75rem;
  transition: background 0.15s;
}

.mt-modal-link-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.mt-modal-link:hover {
  background: #22c55e;
}

.mt-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: #374151;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.mt-modal-close:hover {
  background: #4b5563;
}
</style> 