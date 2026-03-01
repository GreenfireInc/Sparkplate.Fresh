/**
 * Lighthouse IPFS provider metadata.
 * Decentralized storage with encryption and Filecoin backup.
 */

import type { IpfsProviderMeta } from './types'

export const LighthouseMeta: IpfsProviderMeta = {
  id: 'lighthouse',
  name: 'Lighthouse',
  apiBaseUrl: 'https://node.lighthouse.storage/api/v0',
  apiEndpoints: [
    { name: 'Add file', path: '/add', method: 'POST', description: 'Upload file to Lighthouse IPFS' },
    { name: 'Upload encrypted', path: '/encrypt/upload', method: 'POST', description: 'Upload with optional encryption' },
    { name: 'Get file info', path: '/get_file_info', method: 'POST', description: 'Get file metadata' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/LighthouseWeb3',
    discord: 'https://discord.gg/lighthouse',
    telegram: 'https://t.me/Lighthouse_Storage',
    github: 'https://github.com/lighthouse-web3',
  },
  npmPackages: ['@lighthouse-web3/sdk'],
  documentation: [
    'https://docs.lighthouse.storage/',
    'https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/overview',
    'https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/ipfs',
  ],
}

export default LighthouseMeta
