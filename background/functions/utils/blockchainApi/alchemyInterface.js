import axios from 'axios'
import BlockchainInterface from './BlockchainInterface'
import delay from '../delay'
import retry from 'async-retry'

import ERC20Token from '../cryptos/tokens/eth/ERC20Token'
import BEP20Token from '../cryptos/tokens/bnb/BEP20Token'
import { formatUnits } from 'ethers'

const { alchemyApiKey } = JSON.parse(process.env.functional)

/**
 * AlchemyInterface
 * Need To And From Wallet Address Calls (Sent and Received)
 * Also make sure metadata is set so that timestamp comes back in the response
 * Use Alchemy Composer : https://dashboard.alchemy.com/composer
 *
 */
class AlchemyInterface extends BlockchainInterface {
  constructor(symbol) {
    // set category for fetching transfers
    if (symbol === 'eth') {
      super('AlchemyAPI', {
        homestead: 'https://eth-mainnet.g.alchemy.com/',
        mainnet: 'https://eth-mainnet.g.alchemy.com/',
        sepolia: 'https://eth-sepolia.g.alchemy.com/'
      })
      this.assetTransfersCategory = [
        'external',
        'internal',
        'erc20',
        'erc1155',
        'specialnft'
      ]
      this.Token = ERC20Token
    } else if (symbol === 'bnb') {
      super('AlchemyAPI', {
        mainnet: 'https://bnb-mainnet.g.alchemy.com/',
        testnet: 'https://bnb-testnet.g.alchemy.com/'
      })
      this.assetTransfersCategory = [
        'external',
        'erc20',
        'erc1155',
        'specialnft'
      ]
      this.Token = BEP20Token
    } else {
      throw new Error(
        'Invalid value supplied for symbol in Alchemy Interface constructor.'
      )
    }

    this.symbol = symbol.toLowerCase()
  }

  async retryAxiosCallback(callback, options = {}) {
    return await retry(
      async (bail) => {
        let errorMessage = ''
        let shouldRetry = false

        try {
          // Attempt axios callback and return response if successful
          const response = await callback()
          return response
        } catch (err) {
          // Store error message for bailing if needed
          errorMessage = err.message

          // Retry if error code is 429 or 500, or if a response is not received
          if (err.response) {
            // Request was made and the server responded with status code that
            // falls out of the range of 2xx
            if (err.response.status === 429) shouldRetry = true
            else if (err.response.status <= 500) shouldRetry = true
          } else if (err.request) {
            // Request was made but no response was received
            shouldRetry = true
          } else {
            // Something happened in setting up the request that triggered an Error
            // Do not retry for this type of error
            shouldRetry = false
          }
        }

        // Bail or Retry
        if (!shouldRetry) {
          bail(new Error(errorMessage))
          return
        } else {
          throw new Error(errorMessage)
        }
      },
      {
        retries: 2,
        factor: 2,
        minTimeout: 1250,
        maxTimeout: 30000,
        ...options
      }
    )
  }

  /**
   * set Alchemy API base URL and get both sender and receiver transaction history
   * in separate API calls
   * @param {*} network
   * @param {*} wallet
   * @returns allTransactions
   */
  async getTransactionData(network, wallet) {
    this.setNetwork(network)
    // NOTE: this function should be executing on a per wallet address and when from and to transactons get merged then all transactions
    // must be sorted properly by datetime, so look into sorting function here before calling setRunningBalance
    const senderTransactions = await this.retryAxiosCallback(() => {
      return this.getTransactionsByType('from', wallet, network)
    })
    await delay(1250)

    const receiverTransactions = await this.retryAxiosCallback(() => {
      return this.getTransactionsByType('to', wallet, network)
    })
    await delay(1250)

    const allTransactions = senderTransactions.concat(receiverTransactions)
    const sortByDate = (allTransactions) => {
      const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      allTransactions.sort(sorter)
    }
    // sortDate is currently sorting from oldest transaction to newest transaction
    sortByDate(allTransactions)
    return allTransactions
  }

  /**
   * getTransactionsByType - Alchemy API has to do separate sender and receiver transaction history API calls
   * @param {*} type
   * @param {*} wallet
   * @returns transactionHistory
   */
  async getTransactionsByType(type, wallet, network) {
    const payload = this.getPayloadByType(type, wallet)
    var requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      payload: payload
    }
    // NOTE: apiKey comes in with env config
    const apiKey = alchemyApiKey
    const apiURL = this.network + 'v2/' + apiKey
    const response = await axios.post(apiURL, payload, requestOptions.headers)
    // Keep in mind issues with forEach loops and the async await calls that are occuring between the Vue and IPC Bridge
    // object can not be cloned :: https://stackoverflow.com/questions/65933253/how-can-i-fix-ipc-error-error-invoking-remote-method-an-object-could-not-be-cl
    const { status, data } = response
    if (status === 200) {
      const transactionHistory = await this.mapDataPoints(data, wallet, network)
      return transactionHistory
    }
  }

  /**
   * mapDataPoints - data points from Alchemy are mapped to the relevant column names in the JSStore
   * transaction table
   * @param {*} data
   * @param {*} wallet
   * @returns
   */
  async mapDataPoints(data, wallet, network) {
    const isChainEth = this.symbol === 'eth'
    const allTransactionPromises = data.result.transfers.map(async (tx) => {
      // Fill token data if the transaction is for a token transfer
      if (tx.category === 'erc20') {
        tx = await this.fillTokenTransactionData(tx, network)
      }

      // Determine correct symbol to use for coinTicker
      let coinTicker = tx.asset
      if (!coinTicker) coinTicker = this.symbol
      else if (tx.asset) {
        const isAssetEth = tx.asset.toLowerCase() === 'eth'
        if (isAssetEth && !isChainEth) coinTicker = this.symbol
      }

      // If tx.to === wallet.address then the transaction is inbound
      const isInbound = wallet.address.toLowerCase() === tx.to.toLowerCase()
      const txType = isInbound ? 'inbound' : 'outbound'
      const activityCategory = `${txType}-transaction`

      // basic conversion for UTC String to DateTime, JSStore will not save UTC String
      // NOTE: As a temporary solution that will prevent duplicate transactions into the database, see if
      // transaction time can be checked for in the database and then do not add transaction
      const blockTimestamp = tx.metadata.blockTimestamp
      const transactionTime = new Date(blockTimestamp)

      const amountFloat = parseFloat(tx.value)
      // There are duplicate uniqueIds for outbound and inbound transactions
      // so prepending wallet address to uniqueId for now may update this
      const uniqueId = wallet.address + tx.uniqueId.toString()
      const transactionId = tx.hash.toString()
      // running balance value needs to be computed with the Global Currency selected by User
      // setting runningBalanceValue to 0 for now, jsstore sets default 0 also - calculate value on front end

      return {
        coinTicker: coinTicker,
        uniqueId: uniqueId,
        source: tx.from,
        destination: tx.to,
        amount: amountFloat,
        txType: txType,
        date: transactionTime,
        transactionId: transactionId,
        activityCategory: activityCategory
      }
    })

    const settled = await Promise.allSettled(allTransactionPromises)
    return settled.map((result) => result.value)
  }

  /**
   * getPayloadByType - If type is from or sender then create that payload,
   * if type is to or receiver then create a receiver payload
   * @param {*} type
   * @param {*} wallet
   * @returns payload
   */
  getPayloadByType(type, wallet) {
    if (!type || !wallet.address)
      throw new Error('Argument error for getPayloadByType')

    const addressParam = type === 'from' ? 'fromAddress' : 'toAddress'
    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'alchemy_getAssetTransfers',
      params: [
        {
          fromBlock: '0x0',
          [addressParam]: wallet.address,
          excludeZeroValue: true,
          withMetadata: true,
          category: this.assetTransfersCategory
        }
      ]
    }

    return JSON.stringify(payload)
  }

  async fillTokenTransactionData(transaction, network) {
    // skip this method if transaction already has asset data
    if (transaction.asset && transaction.value) return transaction

    // Create token contract instance
    const address = transaction.rawContract.address
    const token = new this.Token(address)
    const tokenContract = await token.getContract(network)

    if (!transaction.asset) {
      transaction.asset = await tokenContract.symbol()
    }

    if (!transaction.value) {
      const tokenDecimals = await tokenContract.decimals()
      transaction.value = formatUnits(
        transaction.rawContract.value,
        tokenDecimals
      )
    }

    return transaction
  }
}

export default AlchemyInterface
