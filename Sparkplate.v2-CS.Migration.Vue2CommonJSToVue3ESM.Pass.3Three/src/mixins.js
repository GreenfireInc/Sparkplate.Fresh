import Vue from 'vue'
import { mapState } from 'vuex'
import moment from 'moment'
import cc from 'currency-codes'

export default Vue.mixin({
  computed: {
    ...mapState({
      accounts: (state) => state.accounts,
      coinsInfo: (state) => state.coinsInfo,
      contacts: (state) => state.contacts.list
    }),
    loggedIn() {
      return Boolean(this.$store.state.accounts.active)
    },
    loggedUserData() {
      const activeUser = this.accounts.active
      return JSON.parse(JSON.stringify(activeUser))
    },
    userCurrency() {
      const currency = this.loggedUserData.globalCurrency
        ? this.loggedUserData.globalCurrency
        : this.loggedUserData.currency
      return currency
    }
  },
  methods: {
    currencyToGlobalValue(balance, currency) {
      if (currency.toLowerCase() === 'tst') return 0
      const crypto = this.coinsInfo.find(
        (coin) => coin.symbol === currency.toUpperCase()
      )
      return crypto.quote[this.userCurrency].price * balance
    },
    formatDate(date) {
      const dateToFormat = moment(date)
      // We can pass in the date of each item to be formatted for the card.
      const formatted = dateToFormat.format('MMM Do YYYY h:mm:ss a')
      return formatted
    },
    formatFigure(figure) {
      if (!figure) return ''
      return figure.toLocaleString()
    },
    formatCurrencyWithSettings(value, fixedValue) {
      // NOTE: integers and float values could be passed here, check integers passed
      // NOTE see if original formatCurrency based on country-currency-map import is still needed or remove
      // NOTE: verify loggedUserData.currency is bringing in setting set in User Profile Settings
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.userCurrency,
        minimumFractionDigits: fixedValue
      }).format(value)
    },
    formatNum(num, points = 4) {
      if (!num) return 0

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: points
      })
        .format(num)
        .replace('$', '')
    },
    formatMenuLabel(label) {
      const re = /[-]+/g
      const formatted = label.replace(re, ' ')
      const firstLetter = formatted.charAt(0)
      const remainder = formatted.slice(1)
      return firstLetter.toUpperCase() + remainder
    },
    getDisplayCurrencyFormat(code) {
      let currencyName
      if (this.globalCurrencyIsFiat) {
        currencyName = cc.code(code).currency
      } else {
        currencyName = this.$store.state.coinsMeta[code.toUpperCase()].name
      }
      return `${currencyName} (${code})`
    },
    async onFileDrag(promise) {
      try {
        const { content } = await promise
        this.qrParser(content)
      } catch {
        this.invalidQRToast()
      }
    },
    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver
    },
    async onQrInit(promise) {
      this.qrLoading = true
      try {
        await promise
      } catch {
        console.error('QR initialization failed')
      } finally {
        this.qrLoading = false
      }
    },
    onQrDecode(data) {
      this.qrParser(data)
    },
    convertCurrency(currency) {
      const crypto = this.coinsInfo.find(
        (coin) => coin.symbol === currency.toUpperCase()
      )
      return crypto.quote[this.userCurrency].price
    },
    handleNumInput(e) {
      const value = e.target.value
      const regex = /^[0-9]*\.?[0-9]*$/
      if (regex.test(value)) {
        this.amount = value
      }
    }
  }
})
