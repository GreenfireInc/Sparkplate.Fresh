/**
 * Perplexity API integration metadata.
 * npm i @perplexity-ai/perplexity_ai; npm i @ai-sdk/perplexity
 */

import type { LlmProviderMeta } from './types'

export const PerplexityMeta: LlmProviderMeta = {
  id: 'perplexity',
  name: 'Perplexity',
  apiBaseUrl: 'https://api.perplexity.ai/v1',
  apiEndpoints: [
    { name: 'Chat completions', path: '/chat/completions', method: 'POST', description: 'Sonar models with real-time web search' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/perplexity_ai',
    linkedin: 'https://www.linkedin.com/company/perplexity-ai',
    youtube: 'https://www.youtube.com/@perplexity-ai',
    discord: 'https://discord.gg/perplexity-ai',
    wikipedia: 'https://en.wikipedia.org/wiki/Perplexity_AI',
  },
  npmPackages: [
    '@perplexity-ai/perplexity_ai',
    '@ai-sdk/perplexity',
  ],
  documentation: [
    'https://docs.perplexity.ai/',
    'https://docs.perplexity.ai/home',
    'https://docs.perplexity.ai/guides/model-cards',
  ],
}

export default PerplexityMeta
