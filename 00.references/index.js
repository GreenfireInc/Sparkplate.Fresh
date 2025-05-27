/*
 * Contributors: Aciel Ochoa
 *
 * Description: Module exports all directory contents along with methods
 *   used for dynamic interaction with all domain name services
 */
import uns from './uns'
import bugReporter from '@/logging/BugReporter'

const tezos = {
  getAddress: async ({ domain, coinTicker }) => {
    // Throw Error for coins other than tezos
    if (coinTicker.toLowerCase() !== 'xtz')
      throw new Error(
        `${coinTicker.toUpperCase()} not supported for .tez domains`
      )

    const result = await window.domains.resolveAddress(domain, coinTicker)
    if (result.success) {
      return result.data
    } else {
      bugReporter.catchError(result.error)
      throw new Error('An error occured while trying to resolve tezos domain.')
    }
  }
}

function configExtensions() {
  // create an object with key value pairs pointing to each domain service
  const extensions = {
    eth: {
      resolver: uns, // use uns resolver for .eth domains
      service: 'ens'
    },
    tez: {
      resolver: tezos,
      service: 'tezos'
    }
    // The script below adds all extensions for 'uns'
  }

  // List of UNS extensions
  const unstoppabledomains = [
    'x',
    'crypto',
    'coin',
    'wallet',
    'bitcoin',
    '888',
    'nft',
    'dao',
    'zil',
    'blockchain'
  ]
  unstoppabledomains.forEach((ext) => {
    extensions[ext] = {
      resolver: uns,
      service: 'uns'
    }
  })

  return extensions
}

export default {
  uns,
  tezos,
  extensions: configExtensions(),
  async resolveAddress({ domain, coinTicker }) {
    // Get domain extension to determine what resolution service to use
    const domainExtension = domain.split('.').slice(-1)
    const extension = this.extensions[domainExtension]

    // if extenstion is not registered, use UNS to resolve custom ENS domain extension
    if (!extension) {
      const address = await this.uns.getAddress({ domain, coinTicker })
      return { address, service: 'ens' }
    }

    const { resolver, service } = extension
    const address = await resolver.getAddress({ domain, coinTicker })
    return { address, service }
  }
}
