/**
 * Kimi (Moonshot AI) API integration metadata.
 * npm i @jacksontian/kimi-cli; npm i @jacksontian/kimi
 */

import type { LlmProviderMeta } from './types'

export const KimiMeta: LlmProviderMeta = {
  id: 'kimi',
  name: 'Kimi',
  apiBaseUrl: 'https://api.moonshot.ai/v1',
  apiEndpoints: [
    { name: 'Chat completions', path: '/chat/completions', method: 'POST', description: 'OpenAI-compatible chat completions' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/MoonshotAI',
    github: 'https://github.com/MoonshotAI',
  },
  npmPackages: [
    '@jacksontian/kimi-cli',
    '@jacksontian/kimi',
  ],
  documentation: [
    'https://platform.moonshot.ai/docs',
    'https://platform.moonshot.ai/docs/guide/start-using-kimi-api',
    'https://kimi-ai.chat/docs/api/',
  ],
}

export default KimiMeta
