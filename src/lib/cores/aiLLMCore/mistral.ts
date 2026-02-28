/**
 * Mistral API integration metadata.
 * npm i @ai-sdk/mistral; npm i @metorial/mistral
 */

import type { LlmProviderMeta } from './types'

export const MistralMeta: LlmProviderMeta = {
  id: 'mistral',
  name: 'Mistral',
  apiBaseUrl: 'https://api.mistral.ai',
  apiEndpoints: [
    { name: 'Chat completions', path: '/v1/chat/completions', method: 'POST', description: 'Chat completions' },
    { name: 'Embeddings', path: '/v1/embeddings', method: 'POST', description: 'Create embeddings' },
    { name: 'Models list', path: '/v1/models', method: 'GET', description: 'List available models' },
    { name: 'Batch', path: '/v1/batch', method: 'POST', description: 'Batch processing' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/MistralAI',
    linkedin: 'https://www.linkedin.com/company/mistral-ai',
    github: 'https://github.com/mistralai',
    discord: 'https://discord.gg/mistralai',
  },
  npmPackages: [
    '@ai-sdk/mistral',
    '@metorial/mistral',
  ],
  documentation: [
    'https://docs.mistral.ai/',
    'https://docs.mistral.ai/api',
    'https://docs.mistral.ai/platform/endpoints',
  ],
}

export default MistralMeta
