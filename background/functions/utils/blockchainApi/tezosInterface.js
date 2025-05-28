import BlockchainInterface from './BlockchainInterface'
import { TezosToolkit } from '@taquito/taquito'
import { RpcClient } from '@taquito/rpc'
import { InMemorySigner } from '@taquito/signer'
import { formatUnits } from 'ethers'

class TezosInterface extends BlockchainInterface {
  constructor() {
    // RPC Nodes can be found here: https://tezostaquito.io/docs/rpc_nodes/
    super('ECAD Labs', {
      mainnet: 'https://mainnet.ecadinfra.com',
      ghostnet: 'https://ghostnet.ecadinfra.com',
      smartpy: 'https://mainnet.smartpy.io'
    })
  }

  getInstance(network = 'mainnet') {
    this.setNetwork(network)
    return new TezosToolkit(this.network)
  }

  async getBalance({ address, network }) {
    const client = this.getInstance(network)
    const balance = await client.tz.getBalance(address)
    return formatUnits(balance.toFixed(), 6)
  }

  async getSigner(privateKey) {
    const signer = await InMemorySigner.fromSecretKey(privateKey)
    return signer
  }

  getRpcClient(network) {
    this.setNetwork(network)
    const client = new RpcClient(this.network)
    return client
  }
}

export default new TezosInterface()
