// import axios from 'axios'
import BlockchainInterface from './BlockchainInterface'
import xrpl from 'xrpl'
// import crypto from 'crypto'
// using a new method for generating xrp wallets
// but may want to go back to using hdkey
import hdkey from 'hdkey'
// testing derived wallet import with public and private keys
const { bytesToHex } = require('@noble/curves/abstract/utils')
const { ed25519: nobleEd25519 } = require('@noble/curves/ed25519')
const { secp256k1: nobleSecp256k1 } = require('@noble/curves/secp256k1')
const {
  getAlgorithmFromPrivateKey
} = require('ripple-keypairs/dist/utils/getAlgorithmFromKey')

/**
 * Remember to Add Support for recording: LastLedgerSequence for XRP Sends and what else?
 *
 * TO DO:
 * - Addded Text to Greenery For XRP that States ALL XRP Wallets must be funded between Mainnet and Total Balance
 * - Also do a server_info call and get the reserve_base_xrp and reserve_inc_xrp (Per Object or NFT Owners)
 *  - Get URL for server_info from XRPL Documentation
 *    - https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/server-info-methods/server_info
 *    - https://xrpl.org/resources/dev-tools/websocket-api-tool?server=wss%3A%2F%2Fxrplcluster.com%2F&req=%7B%20%20%22command%22%3A%20%22server_info%22%0A%7D
 *    - The JSON returned has a reserve_base_xrp showing as 1 now, still need to do more testing
 * - Link to XRP Explorer, the XRP implmentation has been added to explorerMixins.js
 * - Language about Locked Currency (is it 1, 10 or 20?) reserve_base_xrp is showing 1 so going with that for now, there is also reserve_inc_xrp for Objects (NFT)
 *  - The reserve_inc_xrp is currently set to .2 and is related to Objects or NFTs, need to test this on XRP Mainnet
 * - Find format function in xrpl for XRP transaction json values
 * - NOTE: XRP Payments can be set to an unfunded state, Transactions with tec codes destroy the XRP paid as a transaction cost, and consume a sequence number.
 * - see: https://xrpl.org/docs/references/protocol/transactions/transaction-results/tec-codes#tecUNFUNDED_PAYMENT
 */
class XRPInterface extends BlockchainInterface {
  constructor() {
    // NOTE: WebSocket URIs are required for XRPL Lib
    // Using wss://xrplcluster.com which has full history and CORS Support
    // wss://s1.ripple.com can also be used for mainnet but will likely be less reliable and detailed
    super('XrpAPI', {
      mainnet: 'wss://xrplcluster.com',
      testnet: 'wss://s.altnet.rippletest.net:51233'
    })
  }

  /**
   * getXRPLWallet - this function will likely be renamed, returning XRP Wallet based on network configured
   * On the XRP testnet funds can be allocated to new Wallets
   */
  async getXRPLWallet(seed, network, derivationIndex) {
    // this wallet address returns when trying to create a wallet on mainnet
    // r3nw1hfiaTT2BWvPgDhF5bc4Em2gGvBDau, test on Production Greenery Build
    this.setNetwork(network)
    const client = new xrpl.Client(this.network)
    await client.connect()
    try {
      // Moving back to using hdkey for wallet creation, the previous buffer concat was not creating
      // the same addresses on mainnet across different devices.
      const seedBuffer = Buffer.from(seed)
      // Create HD wallet from the seed
      const hdWallet = hdkey.fromMasterSeed(seedBuffer)
      // Wallet Addresses Are The Same For Mainnet and Testnet, Switch Between Them With The Relevant URI
      const derivationPath = "m/44'/144'/0'/0/" + derivationIndex
      // Derive the key pair using the specified path
      const derived = hdWallet.derive(derivationPath)
      // Convert to XRP keypair
      const privateKey = derived.privateKey.toString('hex')
      // Use xrpl.Wallet.fromEntropy to create a wallet from the derived private key
      // First tried fromSeed but the Private Key was not encoded in base58, might want to try getting it to work
      const derivedWallet = xrpl.Wallet.fromEntropy(privateKey)
      if (network === 'testnet') {
        // If on testnet try funding wallet now that is has been created
        // const fundResult = await client.fundWallet(derivedWallet)
        // do not capture to variable for now so result do not need to be dumped
        await client.fundWallet(derivedWallet)
      }
      var accountInfo = ''
      try {
        // Get account info
        accountInfo = await client.request({
          command: 'account_info',
          account: derivedWallet.address,
          ledger_index: 'validated'
        })

        return {
          address: derivedWallet.address,
          publicKey: derivedWallet.publicKey,
          privateKey: derivedWallet.privateKey,
          seed: derivedWallet.seed,
          derivationPath: derivationPath,
          accountInfo: accountInfo.result
        }
      } catch (err) {
        // For XRP Mainnet Wallets That Need To Be Funded
        // there is a data object coming back from accountInfo with error code 19
        // and an account wallet address that matches what is returned below
        // derivedWallet.address and err.data.request.account need to match, need to refactor
        if (network === 'mainnet') {
          if (
            parseInt(err.data.error_code) === 19 &&
            derivedWallet.address === err.data.request.account
          ) {
            return {
              address: derivedWallet.address,
              publicKey: derivedWallet.publicKey,
              privateKey: derivedWallet.privateKey,
              seed: derivedWallet.seed,
              derivationPath: derivationPath,
              accountInfo: 'invalid-fund'
            }
          }
        }
      }
    } catch (error) {
      throw new Error(`XRP Wallet creation failed: ${error.message}`)
    } finally {
      client.disconnect()
    }
  }

  // For Throwaway Wallet Option, review
  async getXRPLBasicWallet({ network }) {
    // look in to have this set at Class State where it is only called once
    this.setNetwork(network)
    const client = new xrpl.Client(this.network)
    // calling connect with an await and disconnecting below once Wallet has been created
    await client.connect()
    // basic XRP Wallet creation, without Derivation Path, will add later
    const xrpBasicWallet = xrpl.Wallet.generate()
    await client.disconnect()
    return xrpBasicWallet
  }

  async getBalance({ wallet, network }) {
    this.setNetwork(network)
    const { address } = wallet
    this.setNetwork(network)
    // client needs to be set outside try to be accessible
    const client = new xrpl.Client(this.network) // Use testnet URL
    try {
      await client.connect()
      const balance = await client.getXrpBalance(address)
      return balance
    } catch (error) {
      /*
       * When Mainnet wallets are first created they will be in a unfunded state and trigger an error here
       * The XRP Wallet Address should show up in Greenery but the Wallet needs to be funded first (Ledger)
       * See if the XRPL documentation supports a way to handle this without trapping for the error.
       *
       *
       * Need to trap for Testnet wallets that are not created yet but have a Mainnet wallet address (that remains in Greenery)
       * The below code only traps for testnet and if the wallet address is not funded then we trap on error code 19 and match
       * the wallet address with the error account address and then instatiate the wallet with XRPL so that it can be funded
       * NOTE: Creating a Throwaway Wallet on Testnet provides a good method for testing as these wallets are not funded
       * and will show up as account not found and will be funded.
       */

      console.error('Error fetching XRP balance:', error)
      if (network === 'testnet') {
        if (
          parseInt(error.data.error_code) === 19 &&
          wallet.address === error.data.request.account
        ) {
          // the importWallet function also uses the below method for obtaining the derived wallet
          // look it to refactoring as a separate function so it can be called when needed.
          const privateKey = wallet.privateKey
          const ED_ALGO = 'ed25519'
          const SECP256K1_ALGO = 'ecdsa-secp256k1'
          // Determine what algorithm to use
          const algorithm = getAlgorithmFromPrivateKey(privateKey)
          const rawPrivateKey = privateKey.slice(2)
          let publicKey
          // Derive publicKeyBytes using proper algorithm
          if (algorithm === ED_ALGO) {
            const publicKeyBytes = nobleEd25519.getPublicKey(rawPrivateKey)
            publicKey = 'ED' + bytesToHex(publicKeyBytes)
          } else if (algorithm === SECP256K1_ALGO) {
            const publicKeyBytes = nobleSecp256k1.getPublicKey(
              rawPrivateKey,
              true
            )
            publicKey = bytesToHex(publicKeyBytes)
          } else {
            throw new Error('Unable to import this private key')
          }
          const derivedWallet = new xrpl.Wallet(publicKey, privateKey)
          // disabling unused vars warning, may want to add funding status checks in to interface for all instances
          const fundingStatus = await client.fundWallet(derivedWallet) // eslint-disable-line no-unused-vars
          // console.log('IPC - xrpInterface.js - getBalance ==> fundingStatus :', fundingStatus)
        }
      } else if (
        network === 'mainnet' &&
        parseInt(error.data.error_code) === 19
      ) {
        // If on mainnet and error code 19 Account Not Found is returned then return a zero balance
        // may want to label mainnet addresses that are not funded, testnet addresses should fund themselves if found
        // NOTE: Also the jsstore wallets table will save a 0 (zero) balance for mainnet wallets and then replace that jsstore balance value
        // with a testnet funded balance when the user switches to XRP Testnet, so the jsstore wallets table is not keeping separate
        // entries for testnet and mainnet wallets
        return 0
      }
    } finally {
      client.disconnect()
    }
  }

  // see if Public XRP Ledger offers decent transaction history
  // NOTE: adding limit default as 20 for now during testing
  async getTransactionData(network, wallet, limit = 20) {
    const address = wallet.address
    this.setNetwork(network)
    const client = new xrpl.Client(this.network)
    try {
      await client.connect()
      // Get account transactions
      const response = await client.request({
        command: 'account_tx',
        account: address,
        limit: limit,
        ledger_index_min: -1, // -1 means earliest available
        ledger_index_max: -1, // -1 means most recent
        binary: false,
        forward: false // Most recent first
      })
      // Process and format transactions
      const transactions = response.result.transactions.map((tx) => {
        // NOTE: tx.meta.TransactionResult contains tesSUCCESS for a successful transaction, there may be other results to map
        // may want to trap for tesSUCCESS and others if needed
        // console.log('IPC - xrpInterface.js - getTransactionData ==> tx:', tx)
        const transaction = tx.tx_json
        const meta = tx.meta
        // Calculate balance change, look at what getBalanceChanges is doing
        // Need to incorporate in to Greenery Transaction History Running Balance?
        // getBalanceChanges was not working in dev testing so researching, leaving as reference
        // see if the value accountChanges can be used in the future, not being used now
        const balanceChanges = xrpl.getBalanceChanges(meta)
        const accountChanges = balanceChanges.find(
          (change) => change.account === address
        )
        // NOTE: tx.hash uniquely identifies this specific transaction, used to look up this exact transaction
        // The tx.ledger_hash identifies the ledger that contains this transaction
        // Multiple transactions can share the same ledger_hash
        // transaction.data is Ripple Time, an Epoch starting at 1/1/2000, the below conversion example: 2025-02-18T00:49:50.000Z
        // look in to how other platforms format Date

        // return from within map function
        return {
          type: transaction.TransactionType,
          hash: tx.hash,
          // date: new Date(xrpl.rippleTimeToUnixTime(transaction.date)).toISOString(),
          date: new Date(xrpl.rippleTimeToUnixTime(transaction.date)),
          sender: transaction.Account,
          recipient: transaction.Destination,
          amount: meta.delivered_amount,
          fee: xrpl.dropsToXrp(transaction.Fee),
          balanceChange: accountChanges ? accountChanges.values : [],
          result: meta.TransactionResult, // should be tesSUCCESS
          ledgerIndex: tx.ledger_index,
          raw: transaction // Include raw transaction data if needed
        }
      })
      const allTransactions = this.mapDataPoints(transactions, network, wallet)
      return allTransactions
    } catch (error) {
      console.log('IPC - xrpInterface.js - getTransactionData error: ', error)
    } finally {
      await client.disconnect()
    }
  }

  // map xrp transaction data to Greenery
  mapDataPoints(transactionHistory, network, wallet) {
    const allTransactions = []
    for (const tx of transactionHistory) {
      // XRP labels xrp sends as Payment, look for other type labels
      if (tx.type === 'Payment') {
        // init transaction array that will hold batch transactions for insertion into db
        const receiver = tx.recipient
        const sender = tx.sender
        const activityCategory = this.setActivityCategory(
          wallet,
          receiver,
          sender
        )
        const transTime = new Date(tx.date)
        // setting uniqueId to the hash
        // also prepending wallet address so id is unique by address, outbound and inbound transactions may have duplicate ids
        const uniqueId = wallet.address + tx.hash.toString()
        const transactionId = tx.hash.toString()
        // need to find correct conversion for XRP amounts, xrpl should have something
        // example: xrpl.dropsToXrp(amount)
        const amount = xrpl.dropsToXrp(tx.amount)

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
   * sendXRPL - LastLedgerSequence has been added for sending XRP Payments (Transactions)
   * @param {*} param
   * @returns hashResultTx
   */
  async sendXRPL({ wallet, toAddress, amount, network }) {
    const { address, privateKey, publicKey } = wallet
    this.setNetwork(network)
    const client = new xrpl.Client(this.network)
    try {
      await client.connect()
      // Get current ledger index
      const ledgerResponse = await client.request({
        command: 'ledger',
        ledger_index: 'validated'
      })
      const currentLedgerIndex = ledgerResponse.result.ledger_index
      // Prepare transaction
      // Look in to implementing DestinationTag for off ledger information purposes
      // https://xrpl.org/docs/concepts/transactions/source-and-destination-tags#source-and-destination-tags
      const paymentTx = {
        TransactionType: 'Payment',
        Account: address,
        Amount: xrpl.xrpToDrops(amount),
        Destination: toAddress,
        LastLedgerSequence: currentLedgerIndex + 75 // Add 75 which roughly gives 5 minutes for the transaction to validate
      }
      // Autofill additional fields and sign
      const preparedTx = await client.autofill(paymentTx)
      // A new XRPL wallet instance is created from the XRP Derived Wallet so that it can Sign the Transaction
      const derivedWallet = new xrpl.Wallet(publicKey, privateKey)
      const signedTx = derivedWallet.sign(preparedTx)
      // Submit and wait for validation
      const tx = await client.submitAndWait(signedTx.tx_blob)
      // Check transaction results
      const result = tx.result
      var hashResultTx = ''
      if (result.meta.TransactionResult === 'tesSUCCESS') {
        hashResultTx = tx.result.hash
      } else {
        throw new Error(`Transaction failed: ${result.meta.TransactionResult}`)
      }
      return hashResultTx
    } catch (error) {
      console.error('Error executing XRP Send:', error)
    } finally {
      // make sure this is still working on dev builds
      // console.log('IPC - xrpInterface.js - sendXRPL ==> disconnecting client *******')
      client.disconnect()
    }
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
}

export default XRPInterface
