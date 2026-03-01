/**
 * Claude (Anthropic) API integration metadata.
 * npm i @anthropic-ai/claude-agent-sdk; npm i @anthropic-ai/claude-code
 */

import type { LlmProviderMeta } from './types'

export const ClaudeMeta: LlmProviderMeta = {
  id: 'claude',
  name: 'Claude',
  apiBaseUrl: 'https://api.anthropic.com/v1',
  apiEndpoints: [
    { name: 'Messages', path: '/messages', method: 'POST', description: 'Create a message completion (primary chat API)' },
    { name: 'Messages stream', path: '/messages', method: 'POST', description: 'Stream message completion' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/AnthropicAI',
    linkedin: 'https://www.linkedin.com/company/anthropic',
    youtube: 'https://www.youtube.com/@AnthropicAI',
    github: 'https://github.com/anthropics',
    wikipedia: 'https://en.wikipedia.org/wiki/Anthropic',
  },
  npmPackages: [
    '@anthropic-ai/claude-agent-sdk',
    '@anthropic-ai/claude-code',
  ],
  documentation: [
    'https://docs.anthropic.com/',
    'https://docs.anthropic.com/en/api/overview',
    'https://docs.anthropic.com/en/api/complete',
  ],
}

export default ClaudeMeta
