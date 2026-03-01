import BalanceModel from '@/models/balanceModel'
import HistoryModel from '@/models/historyModel'
// NOTE: look into moving crypto import into new IPC exchanges bridge
// generateHashKey uses it once below
import crypto from 'crypto'
// var apiSecret
// const name = 'gemini'
// const exchangeNameSecret = `${name}_apiSecret`

export default {
  header: {
    'Content-Type': 'text/plain',
    'X-GEMINI-APIKEY': '',
    'X-GEMINI-PAYLOAD': 0,
    'X-GEMINI-SIGNATURE': ''
  },
  init(symbol = '', exchangeStore) {
    // symbol can be used to return specific coins, see api docs
    console.log(symbol) // console log symbol to prevent eslint error. if removed could cause breaking change
    this.apiSecret = exchangeStore.apiSecret
    /*
     * Due to the fact that gemini requires we generate CB-ACCESS-SIGN for individual request
     * We would not be performing any action here but instead we would run the generateHashKey in
     * Individual functions that requires API call
     */
    // setting header values in init instead of header declaration above, refactor
    this.header['X-GEMINI-APIKEY'] = exchangeStore.apiKey
    return null
  },
  generatePayload(path) {
    const timestamp = Date.now()
    const payload = {
      request: path,
      nonce: timestamp.toString()
      // account: 'primary'
    }

    this.generateHashKey(payload)
    return payload
  },
  generateHashKey(payload) {
    const encodedPayload = Buffer.from(
      JSON.stringify(payload),
      'utf-8'
    ).toString('base64')
    const secret = this.apiSecret
    // NOTE: generateHashKey gets called for balance and not history call
    // setting API key here as using header above to set key fails, window.exchangeStore data key is not accessible
    this.header['X-GEMINI-PAYLOAD'] = encodedPayload
    this.header['X-GEMINI-SIGNATURE'] = crypto
      .createHmac('sha384', secret)
      .update(encodedPayload)
      .digest('hex')
  },
  async getBalance() {
    // NOTE: removing payload for now as not needed but could pass in values returned from init
    const payload = this.generatePayload('/v1/balances')
    const url = 'https://api.gemini.com/v1/balances'
    // NOTE: set object key to headers
    const headers = { headers: this.header }
    // Now using direct API call here, request.js no longer needed
    const response = await window.axios.post(url, payload, headers)
    const balances = []
    // NOTE: res.data is getting returned from axios.js IPC bridge so removing data
    if (response) {
      response.map((balance) =>
        balances.push(
          new BalanceModel(
            balance.currency,
            balance.availableForWithdrawal,
            balance.type
          )
        )
      )
    }
    // console.log('****** gemini.js getBalance RESPONSE >>>>>>>> ', balances)
    return balances
  },
  // async getHistory (payload, accountId = '') { // payload is not being passed from Exchange.vue
  async getHistory() {
    // NOTE: see if accountId is needed, leaving here for now, check api docs
    const payload = this.generatePayload('/v1/transfers')
    const url = 'https://api.gemini.com/v1/transfers'
    // NOTE: set object key to headers
    const headers = { headers: this.header }
    const response = await window.axios.post(url, payload, headers)
    const histories = []
    // NOTE: axios.js IPC bridge returns res.data so check the response.data content below
    // History call is 429 ing but balance is coming through
    // Error: Request failed with status code 429
    // Refactor axios.js in IPC bridge to handle API errors more efficiently and also return the entire API response (may have accountId)
    if (response.length > 0) {
      // this.$store.state.coinsMeta[history.currency].name,
      response.map((history) =>
        histories.push(
          new HistoryModel(
            history.currency,
            Number(history.fee || 0) + Number(history.amount || 0),
            history.type,
            history.timestampms
          )
        )
      )
    } else {
      console.log('** error: gemini.js', response)
    }
    // console.log('****** gemini.js getHistory RESPONSE >>>>>>>> ', response)
    return histories
  }
}
