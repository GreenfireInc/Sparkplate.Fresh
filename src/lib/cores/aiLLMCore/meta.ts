/**
 * Meta (Llama) API integration metadata.
 * npm i llama-api-client
 */

import type { LlmProviderMeta } from './types'

export const MetaMeta: LlmProviderMeta = {
  id: 'meta',
  name: 'Meta',
  apiBaseUrl: 'https://api.llama.com/v1',
  apiEndpoints: [
    { name: 'Chat completions', path: '/chat/completions', method: 'POST', description: 'Chat completions (Llama models)' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/MetaAI',
    facebook: 'https://www.facebook.com/Meta',
    linkedin: 'https://www.linkedin.com/company/meta',
    youtube: 'https://www.youtube.com/Meta',
    github: 'https://github.com/meta-llama/llama-api-typescript',
    wikipedia: 'https://en.wikipedia.org/wiki/Llama_(large_language_model)',
  },
  npmPackages: [
    'llama-api-client',
  ],
  documentation: [
    'https://llama.developer.meta.com/docs',
    'https://llama.developer.meta.com/docs/api/chat',
    'https://ai.meta.com/llama',
  ],
}

export default MetaMeta
