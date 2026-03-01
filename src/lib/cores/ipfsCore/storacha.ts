/**
 * Storacha (formerly web3.storage) IPFS provider metadata.
 * Free decentralized storage powered by IPFS and Filecoin.
 * npm i @web3-storage/w3up-client
 */

import type { IpfsProviderMeta } from './types'

export const StorachaMeta: IpfsProviderMeta = {
  id: 'storacha',
  name: 'Storacha',
  apiBaseUrl: 'https://up.web3.storage',
  apiEndpoints: [
    { name: 'Upload', path: '/upload', method: 'POST', description: 'Upload to IPFS and Filecoin' },
    { name: 'Status', path: '/status', method: 'GET', description: 'Check upload status' },
    { name: 'User info', path: '/user', method: 'GET', description: 'Get user account info' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/storacha',
    github: 'https://github.com/web3-storage',
    discord: 'https://discord.gg/web3storage',
  },
  npmPackages: ['@web3-storage/w3up-client'],
  documentation: [
    'https://docs.web3.storage/',
    'https://docs.web3.storage/concepts/',
    'https://web3.storage/docs/reference/w3up-client/',
  ],
}

export default StorachaMeta
