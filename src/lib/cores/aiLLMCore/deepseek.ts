/**
 * DeepSeek API integration metadata.
 * npm i @ai-sdk/deepseek; npm i @langchain/deepseek
 */

import type { LlmProviderMeta } from './types'

export const DeepSeekMeta: LlmProviderMeta = {
  id: 'deepseek',
  name: 'DeepSeek',
  apiBaseUrl: 'https://api.deepseek.com',
  apiEndpoints: [
    { name: 'Chat completions', path: '/v1/chat/completions', method: 'POST', description: 'OpenAI-compatible chat completions' },
    { name: 'Models list', path: '/v1/models', method: 'GET', description: 'List available models' },
    { name: 'Beta', path: '/beta', method: 'POST', description: 'Beta features (e.g. tool calls)' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/deepseek_ai',
    github: 'https://github.com/deepseek-ai',
    discord: 'https://discord.gg/deepseek',
  },
  npmPackages: [
    '@ai-sdk/deepseek',
    '@langchain/deepseek',
  ],
  documentation: [
    'https://platform.deepseek.com/api-docs',
    'https://api-docs.deepseek.com/',
    'https://api-docs.deepseek.com/guides/tool_calls',
  ],
}

export default DeepSeekMeta
