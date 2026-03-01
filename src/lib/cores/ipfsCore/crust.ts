/**
 * Crust Network IPFS provider metadata.
 * Decentralized cloud storage on IPFS and Polkadot.
 */

import type { IpfsProviderMeta } from './types'

export const CrustMeta: IpfsProviderMeta = {
  id: 'crust',
  name: 'Crust Network',
  apiBaseUrl: 'https://gw.crustfiles.app/api/v0',
  apiEndpoints: [
    { name: 'Add file', path: '/add', method: 'POST', description: 'Upload file to IPFS via Crust gateway' },
    { name: 'Add directory', path: '/add', method: 'POST', description: 'Upload directory to IPFS' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/CrustNetwork',
    telegram: 'https://t.me/CrustNetwork',
    discord: 'https://discord.gg/crustnetwork',
    github: 'https://github.com/crustio',
  },
  npmPackages: [],
  documentation: [
    'https://docs.crust.network/',
    'https://docs.crust.network/storage',
    'https://gw.crustfiles.app/',
  ],
}

export default CrustMeta
