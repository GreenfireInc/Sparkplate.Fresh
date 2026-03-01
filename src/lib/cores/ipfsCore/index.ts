/**
 * IPFS Core – provider metadata (API endpoints, social links, npm packages, documentation).
 * Centralized export for all supported IPFS storage providers.
 */

export type { ApiEndpoint, IpfsProviderMeta } from './types'

import CrustMeta from './crust'
import FilebaseMeta from './filebase'
import FleekMeta from './fleek'
import InfuraMeta from './infura'
import LighthouseMeta from './lighthouse'
import NftStorageMeta from './nftstorage'
import PinataMeta from './pinata'
import StorachaMeta from './storacha'

export { CrustMeta, FilebaseMeta, FleekMeta, InfuraMeta, LighthouseMeta, NftStorageMeta, PinataMeta, StorachaMeta }

export const IpfsProviders = {
  Crust: CrustMeta,
  Filebase: FilebaseMeta,
  Fleek: FleekMeta,
  Infura: InfuraMeta,
  Lighthouse: LighthouseMeta,
  NftStorage: NftStorageMeta,
  Pinata: PinataMeta,
  Storacha: StorachaMeta,
} as const

export default IpfsProviders
