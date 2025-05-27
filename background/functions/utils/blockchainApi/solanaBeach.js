import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import BlockchainInterface from './BlockchainInterface'
import axios from 'axios'
const { solanaBeachApiKey } = JSON.parse(process.env.functional)

class SolanaBeach extends BlockchainInterface {
  constructor() {
    super('SolanaBeach', {
      'mainnet-beta': axios.create({
        baseURL: 'https://api.solanabeach.io/v1',
        headers: {
          Accept: 'application/json',
          Authorization: solanaBeachApiKey
        }
      })
    })
  }

  async getTransactionData(network, wallet) {
    // Fetch transaction history from API
    this.setNetwork(network)
    const endpoint = `/account/${wallet.address}/transactions`
    const response = await this.network.get(endpoint) // this.network resolves to an axios instance

    const data = response.data
    const transactions = data.map((tx) => {
      // Find account Index in tx.accounts array
      let accountIndex
      for (let i = 0; i < tx.accounts.length; i++) {
        if (tx.accounts[i].account.address === wallet.address) {
          accountIndex = i
          break
        }
      }

      // Calculate difference between pre and post account balance
      const preBalance = tx.meta.preBalances[accountIndex]
      const postBalance = tx.meta.postBalances[accountIndex]
      const balanceChange = postBalance - preBalance
      const amount = Math.abs(balanceChange) / LAMPORTS_PER_SOL

      // Determine if tx is inboud/outbound
      const isInbound = balanceChange > 0
      const txType = isInbound ? 'inbound' : 'outbound'

      // return data model for front end rendering
      return {
        uniqueId: wallet.address + tx.transactionHash,
        source: isInbound ? null : wallet.address,
        destination: isInbound ? wallet.address : null,
        amount: amount,
        txType,
        date: new Date(tx.blocktime.absolute * 1000), // convert from unix timestamp
        transactionId: tx.transactionHash,
        activityCategory: `${txType}-transaction`
      }
    })

    return transactions
  }
}

export default new SolanaBeach()
