import axios from 'axios'
import BlockchainInterface from './BlockchainInterface'
import { formatUnits } from 'ethers'

const tzproApiKey = import.meta.env.DEV
  ? import.meta.env.VITE_TZPRO_API_KEY
  : JSON.parse(process.env.functional).tzproApiKey

class TzstatsInterface extends BlockchainInterface {
  constructor() {
    super('Tzstats', {
      mainnet: 'https://api.tzkt.io/',
      ghostnet: 'https://api.ghostnet.tzkt.io/'
    })
  }

  /**
   * getTransactionData - set base network url and get transaction data
   * @param {*} network
   * @param {*} wallet
   * @returns allTransactions
   */
  async getTransactionData(network, wallet) {
    this.setNetwork(network)
    const url =
      this.network + 'v1/accounts/' + wallet.address + '/operations?limit=500'

    // Get data from API
    const response = await axios.get(url, {
      headers: { 'X-API-KEY': tzproApiKey }
    })

    if (response.statusText !== 'OK') {
      throw new Error(response)
    }
    const transactionHistory = response.data

    // sortDate is currently sorting from oldest transaction to newest transaction
    this.sortByDate(transactionHistory)

    if (transactionHistory.length > 0) {
      // Map data points coming off API with column names in JSStore transactions table
      const allTransactions = this.mapDataPoints(
        transactionHistory,
        network,
        wallet
      )

      return allTransactions
    } else return []
  }

  /**
   * mapDataPoints - async should not be needed, remove
   * @param {*} transactionHistory
   * @param {*} wallet
   * @returns allTransactions
   */
  mapDataPoints(transactionHistory, network, wallet) {
    const allTransactions = []

    for (const tx of transactionHistory) {
      // reveal may be passed as type so make sure type is set to transaction
      if (tx.type === 'transaction') {
        // init transaction array that will hold batch transactions for insertion into db
        const receiver = tx.target.address
        const sender = tx.sender.address
        const activityCategory = this.setActivityCategory(
          wallet,
          receiver,
          sender
        )
        const transTime = new Date(tx.timestamp)
        // setting uniqueId to the hash
        // also prepending wallet address so id is unique by address, outbound and inbound transactions may have duplicate ids
        const uniqueId = wallet.address + tx.hash.toString()
        const transactionId = tx.hash.toString()
        const amount = formatUnits(tx.amount, 6) || 0

        const updatedTx = {
          uniqueId: uniqueId,
          source: sender,
          destination: receiver,
          amount,
          txType: activityCategory,
          date: transTime,
          transactionId: transactionId,
          runningBalance: '',
          runningBalanceValue: '',
          activityCategory
        }
        allTransactions.push(updatedTx)
      }
    }
    return allTransactions
  }

  /**
   * setActivityCategory - set inbound or outbound transaction based on to and from in API
   * @param {*} wallet
   * @param {*} to
   * @param {*} from
   * @returns activityCategory
   */
  setActivityCategory(wallet, to, from) {
    let activityCategory
    // setting both to lower case otherwise no match
    if (wallet.address.toLowerCase() === from.toLowerCase()) {
      activityCategory = 'outbound-transaction'
    } else if (wallet.address.toLowerCase() === to.toLowerCase()) {
      activityCategory = 'inbound-transaction'
    } else {
      // trap and set default if need be for activityCategory
      activityCategory = 'NA'
    }
    return activityCategory
  }

  sortByDate(transactionHistory) {
    const sorter = (a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    }
    transactionHistory.sort(sorter)
  }
}

export default TzstatsInterface
