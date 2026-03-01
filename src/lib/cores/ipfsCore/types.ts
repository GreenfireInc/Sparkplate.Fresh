/**
 * Shared types for IPFS provider core modules.
 */

export interface ApiEndpoint {
  name: string
  path: string
  method?: string
  description?: string
}

export interface IpfsProviderMeta {
  id: string
  name: string
  apiBaseUrl: string
  apiEndpoints: ApiEndpoint[]
  socialMedia: Record<string, string>
  npmPackages: string[]
  documentation: string[]
}
