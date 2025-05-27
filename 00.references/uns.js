/*
 * Contributors: Aciel Ochoa
 *
 * Description: Methods for interacting eth Unstoppable Domain Services
 * Resolution Docs: https://github.com/unstoppabledomains/resolution
 */

import { coins } from '@/config/walletListConfig'
import Resolution from '@unstoppabledomains/resolution'
import transport from '../transport'

const resolution = Resolution.infura(transport.infuraProjectID)

export default {
  async getAddress({ domain, coinTicker }) {
    const crypto = coins[coinTicker.toLowerCase()]
    if (crypto.coinType === 'token') {
      const address = await resolution.multiChainAddr(
        domain,
        coinTicker,
        'ERC20'
      )
      return address
    } else {
      const address = await resolution.addr(domain, coinTicker)
      return address
    }
  }
}
