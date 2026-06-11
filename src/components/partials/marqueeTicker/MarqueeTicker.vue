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

    <ModalMarqueeTicker :coin="selectedCoin" @close="closeModal" />
  </div>
</template>

<script>
import { useI18n } from '@/composables/useI18n'
import ModalMarqueeTicker from '@/components/modals/login/modal.marqueeTicker.vue'
import { COINBASE50 } from '@/lib/cores/currencyCore/indexComposites/coinbase50'
import { useCoinsStore } from '@/stores/useCoinsStore'

export default {
  name: 'MarqueeTicker',
  components: {
    ModalMarqueeTicker,
  },
  setup() {
    const { t } = useI18n()
    const coinsStore = useCoinsStore()
    return { t, coinsStore }
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

        // Source prices through the shared useCoinsStore cache (one fetch + warm-start across the app).
        // COINBASE50 items carry accurate CoinGecko ids, so the aggregator resolves them directly.
        await this.coinsStore.fetchCoinPrices(randomizedCoins)

        // Read the merged store cache (keyed by lowercase symbol) back into the display list.
        this.coins = randomizedCoins.map((coin) => {
          const coinData = this.coinsStore.prices[coin.symbol.toLowerCase()]
          return {
            ...coin,
            price: coinData?.price || 0,
            priceChange: coinData?.priceChange || 0,
            marketCap: coinData?.marketCap || 0
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
</style>