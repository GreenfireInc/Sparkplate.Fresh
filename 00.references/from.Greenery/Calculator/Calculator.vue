<template>
  <div class="view">
    <h1 class="view-name">Calculator</h1>
    <div class="main-content">
      <!-- left calculator field -->
      <form @submit.prevent="convertBitToCurrency" class="calc-section">
        <!-- currency toggle type -->
        <div class="d-flex flex-col">
          <span class="font-semibold leading-9">
            {{ !fromIsFiat ? 'Cryptocurrency' : 'Fiat' }}
          </span>
          <toggle-button v-model="fromIsFiat" />
        </div>

        <!-- amount & currency selection -->
        <div class="field-container">
          <div class="input-field">
            <label for="add-calculator-amount">Amount</label>
            <input
              class="mt-2 form-control"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              title="Positive numbers only"
              id="add-calculator-amount"
              step="0.0000001"
              min="0"
              @keypress="handleNumInput"
              v-model="args.amount"
              required
            />
          </div>
          <div class="input-field">
            <div class="currency-logo">
              <label for="add-contact-currency">Currency</label>
              <img
                height="35"
                width="35"
                class="logo"
                v-if="!fromIsFiat && args.from.symbol"
                :src="`./assets/cryptoicons/${args.from.symbol.toLowerCase()}.svg`"
              />
              <span class="h4 bold" v-else-if="fromIsFiat">{{
                getSymbolFromCurrency(args.from.symbol)
              }}</span>
            </div>
            <!-- look into sorting Fiat and Crypto By Name -->
            <fiat-drop-down
              v-if="fromIsFiat"
              :fiats="converts"
              @update-from="updateFrom"
              convert="from"
            />

            <crypto-drop-down
              v-else
              convert="from"
              @update="updateFrom"
              :coins="coinsMeta"
            />
          </div>
        </div>

        <!-- actions group -->
        <div class="d-flex mt-5">
          <button class="btn bg-green-600 text-white" v-ripple>Convert</button>
          <button
            class="btn bg-white"
            type="button"
            @click="initExport"
            v-ripple
          >
            Export
          </button>
        </div>
      </form>
      <!-- left calculator field end -->

      <!-- convert center icon -->
      <div class="mx-3">
        <div class="bg-green-600 inline-flex py-2 px-3 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="16px"
            width="16px"
            viewBox="0 0 24 24"
            class="text-white"
          >
            <path
              d="M6 16H20M20 16L17 19M20 16L17 13"
              stroke="currentColor"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M18 8H4M4 8L7 11M4 8L7 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>

      <!-- right calculator field -->
      <div class="calc-section">
        <!-- currency toggle type -->
        <div class="d-flex flex-col">
          <span class="font-semibold leading-9">
            {{ !toIsCrypto ? 'Fiat' : 'Cryptocurrency' }}
          </span>
          <toggle-button v-model="toIsCrypto" />
        </div>

        <!-- amount & currency selection -->
        <div class="field-container">
          <div class="input-field">
            <label for="add-calculator-amount">Amount</label>
            <input
              class="mt-2 form-control"
              v-model="solution.amount"
              type="text"
              id="add-calculator-amount"
              placeholder="Not yet converted"
              readonly
            />
          </div>
          <div class="input-field">
            <div class="currency-logo">
              <label for="add-contact-currency">Currency</label>
              <img
                height="35"
                width="35"
                class="logo"
                v-if="toIsCrypto && args.to.symbol"
                :src="`./assets/cryptoicons/${args.to.symbol.toLowerCase()}.svg`"
              />
              <span class="h4 bold mr-2" v-else-if="!toIsCrypto">{{
                getSymbolFromCurrency(args.to.symbol)
              }}</span>
            </div>
            <fiat-drop-down
              v-if="!toIsCrypto"
              :fiats="converts"
              @update-to="updateTo"
              convert="to"
            />

            <crypto-drop-down
              v-else
              convert="to"
              @update="updateTo"
              :coins="coinsMeta"
            />
          </div>
        </div>

        <!-- NOT VISIBLE TO EVENLY FILL WHITE SPACE -->
        <button class="btn bg-white mt-5 invisible" v-ripple>Convert</button>
      </div>
    </div>
    <calculator-export-canvas
      :args="args"
      :solution="solution"
      @initExport="getBeginExport"
    />
  </div>
</template>

<script>
// Components
import CryptoDropDown from '@/components/partials/CryptoDropDown.vue'
import FiatDropDown from '@/components/partials/FiatDropDown.vue'
import CalculatorExportCanvas from '@/components/calculator/CalculatorExportCanvas.vue'
// Utils
import { mapState, mapActions } from 'vuex'
import getSymbolFromCurrency from 'currency-symbol-map'
import BigNumber from 'bignumber.js'
import cc from 'currency-codes'

const initState = () => ({
  conversionRequired: true,
  toIsCrypto: false,
  fromIsFiat: false,
  logoVisibility: false,
  solution: {
    amount: '',
    rate: ''
  },
  converts: [
    ...cc.data.map((c) => {
      return {
        name: `${c.currency} (${c.code})`,
        symbol: c.code
      }
    })
  ],
  args: {
    from: {
      // Left side currency selection
      symbol: 'BTC',
      name: 'Bitcoin'
    },
    to: {
      // right side currency selection
      symbol: 'USD',
      name: 'US Dollar (USD)'
    },
    amount: 1
  },
  beginExport: null
})

export default {
  name: 'CalculatorView',
  components: { CalculatorExportCanvas, CryptoDropDown, FiatDropDown },
  data: initState,
  computed: {
    ...mapState(['coinsMeta'])
  },
  async mounted() {
    // fetch coin info for vuex state
    // cc.data.forEach((c) => {
    //   console.log('currency code', c.code)
    // })
    this.fetchCoinsInfo()
  },
  methods: {
    getSymbolFromCurrency,
    ...mapActions(['gainLossCalculator', 'fetchCoinsInfo']),
    async convertBitToCurrency() {
      const { amount, from, to } = this.args
      const res = await this.gainLossCalculator({
        amount: 1,
        symbol: from.symbol,
        convert: to.symbol
      })
      const rate = res[to.symbol].price.toFixed(8)
      const solutionRateBN = new BigNumber(rate)
      const solutionAmountBN = solutionRateBN.times(amount) // get from client side calculation

      // Convert to locale string
      const localeStringOpts = { maximumFractionDigits: 6 }
      this.solution.rate = parseFloat(solutionRateBN).toLocaleString(
        'en-US',
        localeStringOpts
      )
      this.solution.amount = parseFloat(solutionAmountBN).toLocaleString(
        'en-US',
        localeStringOpts
      )

      // Mark values as converted
      this.conversionRequired = false

      this.$gtag.event('calculator-conversion')
    },
    async initExport() {
      if (this.conversionRequired) await this.convertBitToCurrency()
      this.beginExport()
    },
    getBeginExport(method) {
      this.beginExport = method
    },
    updateFrom(updatedFrom) {
      this.args.from = updatedFrom
    },
    updateTo(updatedTo) {
      this.args.to = updatedTo
    }
  },
  watch: {
    toIsCrypto(isCrypto) {
      // Update to a default selected currency
      const argsToVal = isCrypto
        ? initState().args.from // BTC
        : initState().args.to // USD
      this.args.to = argsToVal

      // Since value change conversion is required before exporting
      this.conversionRequired = true
    },
    fromIsFiat(isFiat) {
      // Update to a default selected currency
      const argsToVal = isFiat
        ? initState().args.to // USD
        : initState().args.from // BTC
      this.args.from = argsToVal
      // Since value change conversion is required before exporting
      this.conversionRequired = true
    },
    'args.from'() {
      this.conversionRequired = true
    },
    'args.to'() {
      this.conversionRequired = true
    },
    'args.amount'() {
      this.conversionRequired = true
    }
  }
}
</script>

<style lang="scss" scoped>
.options {
  position: relative;
}
.options__ul {
  @apply absolute bg-white w-full;
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 1;
}
.main-content {
  @apply flex items-center justify-center;
  height: 80%;
  .calc-section {
    @apply border border-gray-500 rounded p-10;
    width: 40%;

    .field-container {
      @apply flex flex-col-reverse items-center mt-3 w-full;
    }
  }
}
.input-field {
  @apply w-full;
  min-height: 90px;
}
select {
  @apply w-full mt-1;
}
.currency-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label {
  min-height: 35px;
}
</style>
