/**
 * Filebase IPFS provider metadata.
 * S3-compatible IPFS storage with multi-region redundancy.
 */

import type { IpfsProviderMeta } from './types'

export const FilebaseMeta: IpfsProviderMeta = {
  id: 'filebase',
  name: 'Filebase',
  apiBaseUrl: 'https://s3.filebase.com',
  apiEndpoints: [
    { name: 'S3 PutObject', path: '/', method: 'PUT', description: 'S3-compatible upload to IPFS bucket' },
    { name: 'S3 GetObject', path: '/', method: 'GET', description: 'Retrieve object from IPFS bucket' },
    { name: 'S3 ListObjects', path: '/', method: 'GET', description: 'List objects in bucket' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/filebase',
    telegram: 'https://t.me/filebase',
    discord: 'https://discord.gg/filebase',
    linkedin: 'https://www.linkedin.com/company/filebase',
    github: 'https://github.com/filebase',
  },
  npmPackages: [],
  documentation: [
    'https://docs.filebase.com/',
    'https://docs.filebase.com/ipfs/ipfs-filebase',
    'https://docs.filebase.com/s3-api',
  ],
}

export default FilebaseMeta
