/**
 * Shared types for AI LLM provider core modules.
 */

export interface ApiEndpoint {
  name: string
  path: string
  method?: string
  description?: string
}

export interface LlmProviderMeta {
  id: string
  name: string
  apiBaseUrl: string
  apiEndpoints: ApiEndpoint[]
  socialMedia: Record<string, string>
  npmPackages: string[]
  documentation: string[]
}
