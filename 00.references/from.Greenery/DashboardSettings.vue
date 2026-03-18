<!--
Contributors: Aciel Ochoa

Description: Settings for toggling visiblity and network options for the dashboard currencies
-->

<template>
  <div>
    <div class="flex w-100 justify-content-between">
      <span class="text-xl mb-3">Dashboard Settings</span>
      <span class="text-xl mb-3"
        >Active Currencies: {{ activeCryptoCount }}</span
      >
    </div>
    <table class="table table-auto">
      <thead class="container">
        <tr class="row">
          <th class="th cell col-1">#</th>
          <th class="th cell col-1">Coin</th>
          <th class="th cell col-3">Name</th>
          <th class="th cell col-2">Ticker</th>
          <th class="th cell col-2">Visibility</th>
          <th class="th cell col-3">Network</th>
        </tr>
      </thead>
      <tbody class="container">
        <tr
          class="row"
          v-for="(currency, index) in currenciesOrdered"
          :key="`${currency.identifier}-network-selection-table-row`"
        >
          <td class="th cell col-1 center-cell">{{ index + 1 }}</td>
          <td class="th cell col-1 center-cell">
            <currency-symbol
              :symbol="currency.coinTicker"
              forceIcon
              :size="32"
            />
          </td>
          <td class="th cell col-3 capitalize">
            {{ currency.name }}<br />
            <span class="text-muted uppercase text-sm">{{
              currency.blockchain
            }}</span>
          </td>
          <td class="th cell col-2 center-cell">
            {{ currency.coinTicker.toUpperCase() }}
          </td>
          <td class="th cell col-2 center-cell">
            <div class="input-group">
              <div class="d-flex">
                <toggle-button
                  class="text-xl pt-1"
                  :tag="`visibilityToggles.${currency.identifier}`"
                  :value="userSettings.visibilityToggles[currency.identifier]"
                  :sync="true"
                  @change="toggleVisibility"
                />
              </div>
            </div>
          </td>
          <td class="th cell col-3 center-cell">
            <div class="input-group">
              <select
                class="w-100 capitalize"
                :ref="currency.identifier + 'NetworkSelection'"
                :name="'networkSelection.' + currency.coinTicker"
                @change="selectNetwork"
              >
                <option
                  v-for="network in currency.networkOptions"
                  class="capitalize"
                  :key="'network-' + network.toLowerCase()"
                  :value="network"
                >
                  {{ network }}
                </option>
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'DashboardSettings',
  data: () => ({}),
  components: {},
  computed: {
    ...mapState(['userSettings']),
    currenciesOrdered() {
      // Format data for display in dashboard
      const coins = this.$walletListConfig.coinsList
      const cryptos = coins.map((config) => {
        const coinInfo =
          this.$store.state.coinsMeta[config.coinTicker.toUpperCase()]
        try {
          const name = coinInfo.name
          const isToken = coinInfo.category === 'token'
          const networkOptions = config.networks
          return {
            blockchain: config.blockchain,
            coinTicker: config.coinTicker,
            identifier: config.identifier,
            isToken,
            name,
            networkOptions
          }
        } catch (err) {
          console.error({ message: err.message, coinTicker: config })
          return {
            blockchain: config.blockchain,
            coinTicker: config.coinTicker,
            identifier: config.identifier,
            name: ''
          }
        }
      })

      // Return list sorted by crypto name
      return cryptos.sort((cryptoA, cryptoB) => {
        if (cryptoA.name > cryptoB.name) {
          return 1
        } else if (cryptoA.name < cryptoB.name) {
          return -1
        } else return 0
      })
    },
    activeCryptoCount() {
      // Count coins enabled using walletListConfig
      const coins = this.$walletListConfig.coinsList.map((c) => c.identifier)
      const visibilityToggles = { ...this.userSettings.visibilityToggles }
      let count = 0

      for (const identifier of coins) {
        if (visibilityToggles[identifier]) count++
      }

      return count
    }
  },
  methods: {
    async selectNetwork(e) {
      const [, coinTicker] = e.target.name.split('.')
      const network = e.target.value
      if (network !== 'useCustomInput') {
        try {
          await this.$store.dispatch('userSettings/updateNetworkSelection', {
            coinTicker,
            network
          })
          this.$toast.success(
            `Successfully updated ${coinTicker.toUpperCase()} mainnet toggle.`
          )
        } catch (err) {
          this.$toast.success(
            'Could not update ',
            coinTicker.toUpperCase(),
            ' mainnet toggle.'
          )
        }
      }
    },
    async toggleVisibility(e) {
      const visibilityToggles = { ...this.userSettings.visibilityToggles }
      const [setting, coinTicker, blockchain] = e.tag.split('.') // NOTE: blockchain will only be assigned for Tokens
      const identifier = blockchain ? `${coinTicker}.${blockchain}` : coinTicker

      if (this.activeCryptoCount <= 1 && visibilityToggles[identifier]) {
        return this.$toast.error(
          'At lease one currency must remain active.',
          'Error'
        )
      }

      const newState = !visibilityToggles[identifier]
      visibilityToggles[identifier] = newState

      try {
        await this.$store.dispatch('userSettings/updateSetting', {
          setting,
          value: visibilityToggles
        })
        this.$gtag.event(
          `dashboard-currency-${identifier}-${
            newState ? 'enabled' : 'disabled'
          }`
        )
        this.$toast.success(
          `Successfully updated ${identifier.toUpperCase()} visibility toggle.`
        )
      } catch (err) {
        this.$toast.success(
          'Could not update ',
          identifier.toUpperCase(),
          ' visibility toggle.'
        )
      }
    }
  },
  mounted() {
    let saveOnComplete = false

    // Apply user values to network dropdowns
    this.$walletListConfig.coinsList.forEach((coin) => {
      const refs = this.$refs[coin.identifier + 'NetworkSelection']
      if (refs) {
        let selectedNetwork =
          this.userSettings.networkSelection[coin.identifier]
        const networks = coin.networks

        // if no selected network, assign default
        if (!selectedNetwork || !networks.includes(selectedNetwork)) {
          selectedNetwork = coin.networks[0]

          // Store selection to userSettings.networkSelection state
          this.userSettings.networkSelection[coin.identifier] = selectedNetwork

          // Trigger save after all changes occur
          saveOnComplete = true
        }

        const networkDropdown = refs[0]
        networkDropdown.value = selectedNetwork
      }
    })

    // Perform update on saved user network selection if needed
    if (saveOnComplete) {
      this.$store.dispatch('userSettings/updateSetting', {
        setting: 'networkSelection',
        value: this.userSettings.networkSelection
      })
    }
  },
  watch: {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.center-cell {
  @apply flex justify-center items-center;
}

.text-sm {
  font-size: 0.8rem;
}
</style>
