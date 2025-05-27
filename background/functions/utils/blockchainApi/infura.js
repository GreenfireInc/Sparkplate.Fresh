import BlockchainInterface from './BlockchainInterface'
import { InfuraProvider, formatEther, Wallet } from 'ethers'
import walletListConfig from '../../config/walletListConfig'
const config = walletListConfig.coins.eth
const { infuraProjectID } = JSON.parse(process.env.functional)

// configure testnet values from walletListConfig
const testnets = {}
config.testnets.forEach((net) => {
  testnets[net] = net
})

class InfuraEthereum extends BlockchainInterface {
  constructor() {
    super('Infura', {
      homestead: 'homestead',
      mainnet: 'mainnet',
      ...testnets
    })
    this.projectId = infuraProjectID
  }

  /**
   * @param {String} network name of ETH network to connect to. default: 'homestead'
   * @returns InfuraProvider instance
   */
  getProvider(network = 'homestead') {
    this.setNetwork(network)
    return new InfuraProvider(this.network, this.projectId)
  }

  /**
   * @param {String} address wallet to get balance for
   * @returns {String} of balance in ETH
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
  getSigner({ privateKey, network = 'homestead' }) {
    const provider = this.getProvider(network)
    const signer = new Wallet(privateKey, provider)
    return signer
  }
}

export default new InfuraEthereum()
