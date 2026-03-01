/**
 * ChatGPT (OpenAI) API integration metadata.
 * npm i chatgpt; npm i chatgpt-scraper
 */

import type { LlmProviderMeta } from './types'

export const ChatGPTMeta: LlmProviderMeta = {
  id: 'chatgpt',
  name: 'ChatGPT',
  apiBaseUrl: 'https://api.openai.com/v1',
  apiEndpoints: [
    { name: 'Chat completions', path: '/chat/completions', method: 'POST', description: 'Create model response for a chat conversation' },
    { name: 'Completions', path: '/completions', method: 'POST', description: 'Text completion' },
    { name: 'Embeddings', path: '/embeddings', method: 'POST', description: 'Create embeddings' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
    { name: 'Audio transcription', path: '/audio/transcriptions', method: 'POST', description: 'Whisper transcription' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/OpenAI',
    youtube: 'https://www.youtube.com/openai',
    discord: 'https://discord.gg/openai',
    linkedin: 'https://www.linkedin.com/company/openai',
    github: 'https://github.com/openai',
    wikipedia: 'https://en.wikipedia.org/wiki/OpenAI',
  },
  npmPackages: [
    'chatgpt',
    'chatgpt-scraper',
  ],
  documentation: [
    'https://platform.openai.com/docs/',
    'https://platform.openai.com/docs/api-reference',
    'https://platform.openai.com/docs/guides/chat',
  ],
}

export default ChatGPTMeta
