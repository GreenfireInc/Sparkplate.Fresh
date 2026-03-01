/**
 * Pinata IPFS provider metadata.
 * npm i pinata-cloud
 */

import type { IpfsProviderMeta } from './types'

export const PinataMeta: IpfsProviderMeta = {
  id: 'pinata',
  name: 'Pinata',
  apiBaseUrl: 'https://api.pinata.cloud',
  apiEndpoints: [
    { name: 'Pin file to IPFS', path: '/pinning/pinFileToIPFS', method: 'POST', description: 'Upload and pin a file to IPFS' },
    { name: 'Pin JSON to IPFS', path: '/pinning/pinJSONToIPFS', method: 'POST', description: 'Pin a JSON object to IPFS' },
    { name: 'Test authentication', path: '/data/testAuthentication', method: 'GET', description: 'Verify API credentials' },
    { name: 'Hash metadata', path: '/pinning/hashMetadata', method: 'GET', description: 'Get metadata for a pinned file' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/pinatacloud',
    discord: 'https://discord.gg/pinata',
    youtube: 'https://www.youtube.com/pinatacloud',
    github: 'https://github.com/PinataCloud',
  },
  npmPackages: ['pinata-cloud'],
  documentation: [
    'https://docs.pinata.cloud/',
    'https://docs.pinata.cloud/api-reference',
    'https://docs.pinata.cloud/api-reference/pinning-service-api',
  ],
}

export default PinataMeta
