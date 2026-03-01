/**
 * NFT.Storage IPFS provider metadata.
 * Free NFT-specific storage backed by Filecoin.
 * npm i nft.storage
 */

import type { IpfsProviderMeta } from './types'

export const NftStorageMeta: IpfsProviderMeta = {
  id: 'nftstorage',
  name: 'NFT.Storage',
  apiBaseUrl: 'https://nft.storage',
  apiEndpoints: [
    { name: 'Store NFT', path: '/upload', method: 'POST', description: 'Store NFT asset and metadata' },
    { name: 'Status', path: '/status', method: 'GET', description: 'Check upload status by CID' },
    { name: 'User uploads', path: '/user/uploads', method: 'GET', description: 'List user uploads' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/nft_storage',
    github: 'https://github.com/nftstorage',
    discord: 'https://discord.gg/7v4F8n3N',
  },
  npmPackages: ['nft.storage'],
  documentation: [
    'https://nft.storage/docs/',
    'https://nft.storage/docs/concepts/',
    'https://nft.storage/docs/quickstart/',
  ],
}

export default NftStorageMeta
