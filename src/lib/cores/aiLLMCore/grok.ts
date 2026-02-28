/**
 * Grok (xAI) API integration metadata.
 * npm i @tanstack/ai-grok; npm i @ai-sdk/xai
 */

import type { LlmProviderMeta } from './types'

export const GrokMeta: LlmProviderMeta = {
  id: 'grok',
  name: 'Grok',
  apiBaseUrl: 'https://api.x.ai/v1',
  apiEndpoints: [
    { name: 'Chat completions', path: '/chat/completions', method: 'POST', description: 'OpenAI-compatible chat completions' },
    { name: 'Completions', path: '/completions', method: 'POST', description: 'Text completion' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/xai',
    linkedin: 'https://www.linkedin.com/company/xai',
    github: 'https://github.com/xai-org',
  },
  npmPackages: [
    '@tanstack/ai-grok',
    '@ai-sdk/xai',
  ],
  documentation: [
    'https://docs.x.ai/',
    'https://docs.x.ai/developers/regions',
    'https://docs.x.ai/api',
  ],
}

export default GrokMeta
