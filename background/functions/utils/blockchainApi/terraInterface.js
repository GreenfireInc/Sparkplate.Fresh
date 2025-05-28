import { LCDClient, TreasuryAPI, Coin } from '@terra-money/terra.js'
import { formatUnits } from 'ethers'
import axios from 'axios'
import BlockchainInterface from './BlockchainInterface'
const { nowNodesApiKey } = JSON.parse(process.env.functional)

class TerraClient extends BlockchainInterface {
  constructor() {
    super('Terra', {
      mainnet: {
        // PublicNode LCD & FCD
        URL: 'https://terra-classic-lcd.publicnode.com',
        fcdURL: 'https://terra-classic-fcd.publicnode.com/',
        // Terra Classic Mainnet ID
        chainID: 'columbus-5'
      },
      localterra: {
        // LocalTerra Config
        URL: 'http://localhost:1317',
        fcdURL: 'https://localhost:3060',
        chainID: 'localterra'
      },
      'mainnet.private': {
        // NowNodes Private LCD & FCD
        URL: 'https://lunc.nownodes.io/' + nowNodesApiKey,
        fcdURL: 'https://lunc-fcd.nownodes.io/' + nowNodesApiKey,
        chainID: 'columbus-5'
      }
    })
  }

  // Get gas price from FCD at '/v1/txs/gas_prices'
  async getGasPrice(denom, network) {
    this.setNetwork(network)

    const endpoint = this.network.fcdURL + '/v1/txs/gas_prices'
    const result = await axios.get(endpoint)

    const amount = result.data[denom]
    if (!amount) throw new Error('No gas estimate found for provided denom.')

    // Create Coin instance for use in LCD modules
    return new Coin(denom, amount)
  }

  async getTaxRate(network) {
    const lcd = this.getLCDClient(network)
    const treasury = new TreasuryAPI(lcd)
    const taxRate = await treasury.taxRate()
    return taxRate
  }

  // Create Instance of Light Client Daemon
  getLCDClient(network) {
    this.setNetwork(network)
    const lcd = new LCDClient(this.network)
    return lcd
  }

  async getBalance({ address, network }) {
    const lcd = this.getLCDClient(network)
    // Destructure coins from first item in array
    // Second item in array is pagination. May be needed for large accounts
    let uluna, coins, pagination
    while (!uluna) {
      if (pagination && pagination.next_key === null) return 0
      const key = pagination ? pagination.next_key : null
      const result = await lcd.bank.balance(address, { key }) // returns all coins for account address
      coins = result[0]
      pagination = result[1]

      // Get Luna balance from coins
      uluna = coins._coins.uluna
      if (!uluna) continue

      // Format and return balance
      const balance = formatUnits(uluna.amount.toString(), 6)
      return balance
    }
  }

  async getTransactions({ network, wallet }) {
    // Default limit of 10 transactions
    this.setNetwork(network)
    const baseURL = this.network.fcdURL
    const url = `${baseURL}/v1/txs?account=${wallet.address}`
    const response = await axios.get(url)

    // Store LUNC transactions in allTxs array
    const txsList = response.data.txs
    let allTxs = []

    // Look through transactions for all LUNC transfers
    for (const txData of txsList) {
      if (txData.tx.type !== 'core/StdTx') continue // Skip if not standard transaction type

      let msgCount = 0 // keep index of msg in txData.tx.value.msg
      for (const msg of txData.tx.value.msg) {
        if (msg.type !== 'bank/MsgSend') continue // Skip all other types of messages
        msgCount++ // increment count

        for (const amount of msg.value.amount) {
          if (amount.denom !== 'uluna') continue // Skip all other denoms

          const isInboundTx = wallet.address === msg.value.to_address
          const isOutboundTx = wallet.address === msg.value.from_address

          if (!isOutboundTx && !isInboundTx) continue // Skip if wallet address not included in message
          const txType = isInboundTx ? 'inbound' : 'outbound'

          // Create transaction object and add to allTxs array
          const amountLUNC = formatUnits(amount.amount, 6)
          const tx = {
            transactionId: txData.txhash,
            uniqueId: `${wallet.address}${txData.txhash}-${msgCount}`,
            date: new Date(txData.timestamp),
            source: msg.value.from_address,
            destination: msg.value.to_address,
            amount: parseFloat(amountLUNC),
            activityCategory: `${txType}-transaction`,
            runningBalance: '',
            txType
          }
          allTxs.push(tx)

          // break out of amount loop once uluna has been found and tx added to list
          break
        }
      }
    }

    return allTxs
  }
}

export default new TerraClient()
