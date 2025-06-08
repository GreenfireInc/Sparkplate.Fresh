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
              :src="`/assets/icons/crypto/${coin.symbol.toLowerCase()}.svg`"
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
    <div v-if="selectedCoin" class="coin-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <img
            :src="`./assets/icons/crypto/${selectedCoin.symbol.toLowerCase()}.svg`"
            :alt="selectedCoin.symbol"
            class="modal-coin-icon"
          />
          <div class="coin-title">
            <h3>{{ selectedCoin.name }} ({{ selectedCoin.symbol }})</h3>
          </div>
        </div>
        <div class="coin-metrics">
          <p>Current Price: ${{ formatPrice(selectedCoin.price) }}</p>
          <p>
            24h Change:
            <span
              :class="selectedCoin.priceChange > 0 ? 'price-up' : 'price-down'"
              >{{ selectedCoin.priceChange > 0 ? '+' : ''
              }}{{ selectedCoin.priceChange.toFixed(2) }}%</span
            >
          </p>
          <p>Market Cap: ${{ formatMarketCap(selectedCoin.marketCap) }}</p>
        </div>
        <a
          :href="`https://gemini.com/share/jwqzg5fe`"
          target="_blank"
          class="gemini-link"
        >
          Trade on Gemini
        </a>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
// Filter COINBASE50 to only include currencies for which we have icons
const COINBASE50 = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'render-token', symbol: 'RENDER', name: 'Render' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'zcash', symbol: 'ZEC', name: 'ZCash' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'oasis-network', symbol: 'ROSE', name: 'Oasis Network' },
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
  { id: 'bonk', symbol: 'BONK', name: 'BONK' },
  { id: 'elrond-erd-2', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },
  { id: 'jasmycoin', symbol: 'JASMY', name: 'JasmyCoin' },
  { id: 'blur', symbol: 'BLUR', name: 'Blur' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'quant-network', symbol: 'QNT', name: 'Quant Network' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'Sand' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'havven', symbol: 'SNX', name: 'Synthetix' },
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: '1inch', symbol: '1INCH', name: '1inch' }
  // Only included coins that have icons in the cryptoicons directory
]

export default {
  name: 'MarqueeTicker',
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

        // Use CoinGecko API with proper coin IDs
        const coinIds = randomizedCoins.map((coin) => coin.id).join(',')
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
        )

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

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
        this.loadingError = 'Please check internet connection'
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

.coin-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #262b38;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  max-width: 400px;
  width: 90%;
}

.coin-metrics {
  margin: 15px 0;
  text-align: left; /* Explicitly set left alignment for the metrics content */
  width: 100%;
}

.coin-metrics p {
  margin: 8px 0;
  text-align: left;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
  justify-content: flex-start;
}

.modal-coin-icon {
  width: 36px;
  height: 36px;
  margin-right: 8px; /* Reduced from 12px to 8px to close the gap */
  flex-shrink: 0;
}

.coin-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 44px); /* Account for icon width + margin */
}

.modal-content h3 {
  text-align: left;
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 600;
  width: 100%;
}

.gemini-link {
  display: block; /* Changed from inline-block to block */
  background-color: #4ade80;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  text-decoration: none;
  margin: 15px auto; /* Center the link with auto margins */
  width: fit-content; /* Make the button only as wide as its content */
  text-align: center;
  font-weight: bold;
}

.gemini-link:hover {
  background-color: #3acf70;
}

button {
  background-color: #f87171;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  display: block;
  width: 100%;
}

button:hover {
  background-color: #ef4444;
}
</style> 