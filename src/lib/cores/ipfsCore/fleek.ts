/**
 * Fleek IPFS provider metadata.
 * Fast IPFS storage with CDN acceleration.
 */

import type { IpfsProviderMeta } from './types'

export const FleekMeta: IpfsProviderMeta = {
  id: 'fleek',
  name: 'Fleek',
  apiBaseUrl: 'https://api.fleek.co/ipfs',
  apiEndpoints: [
    { name: 'Add file', path: '/add', method: 'POST', description: 'Upload file to Fleek IPFS' },
    { name: 'Get hash', path: '/hash', method: 'POST', description: 'Get IPFS hash for content' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/FleekHQ',
    discord: 'https://discord.gg/fleek',
    github: 'https://github.com/fleekhq',
  },
  npmPackages: ['@fleekhq/fleek-storage'],
  documentation: [
    'https://docs.fleek.co/',
    'https://docs.fleek.co/storage/ipfs',
    'https://docs.fleek.co/storage/ipfs-gateways',
  ],
}

export default FleekMeta
