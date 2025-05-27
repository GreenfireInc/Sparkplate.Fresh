import BlockchainInterface from './BlockchainInterface'
import { JsonRpcProvider, formatEther, Wallet } from 'ethers'

class BinanceInterface extends BlockchainInterface {
  constructor() {
    super('Binance', {
      mainnet: 'https://bsc-dataseed1.binance.org/',
      testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    })
  }

  /**
   * @param {String} network name of BNB network to connect to. default: 'mainnet'
   * @returns Provider instance
   */
  getProvider(network = 'mainnet') {
    this.setNetwork(network)
    return new JsonRpcProvider(this.network)
  }

  /**
   * @param {String} address wallet to get balance for
   * @returns {String} of balance in BNB
   */
  async getBalance({ address, network }) {
    const provider = this.getProvider(network)
    const balance = await provider.getBalance(address)
    return formatEther(balance)
  }

  /**
   * @param {String} privateKey Wallet privateKey to create Signer instance
   * @param {String} network to use as provider
   * @returns {Wallet} instance of Signer
   */
  getSigner({ privateKey, network = 'mainnet' }) {
    const provider = this.getProvider(network)
    const signer = new Wallet(privateKey, provider)
    return signer
  }
}

export default new BinanceInterface()
