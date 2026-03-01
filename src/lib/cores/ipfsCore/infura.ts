/**
 * Infura IPFS provider metadata.
 * Enterprise-grade IPFS infrastructure by ConsenSys.
 * npm i kubo-rpc-client
 */

import type { IpfsProviderMeta } from './types'

export const InfuraMeta: IpfsProviderMeta = {
  id: 'infura',
  name: 'Infura',
  apiBaseUrl: 'https://ipfs.infura.io:5001',
  apiEndpoints: [
    { name: 'Add', path: '/api/v0/add', method: 'POST', description: 'Add file to IPFS' },
    { name: 'Cat', path: '/api/v0/cat', method: 'POST', description: 'Retrieve content by CID' },
    { name: 'Pin add', path: '/api/v0/pin/add', method: 'POST', description: 'Pin content to IPFS' },
    { name: 'Pin ls', path: '/api/v0/pin/ls', method: 'POST', description: 'List pinned content' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/Infura_io',
    discord: 'https://discord.gg/infura',
    github: 'https://github.com/INFURA',
    linkedin: 'https://www.linkedin.com/company/infura-io',
  },
  npmPackages: ['kubo-rpc-client'],
  documentation: [
    'https://docs.infura.io/',
    'https://docs.infura.io/infura/networks/ipfs',
    'https://docs.infura.io/infura/networks/ipfs/http-api-methods',
  ],
}

export default InfuraMeta
