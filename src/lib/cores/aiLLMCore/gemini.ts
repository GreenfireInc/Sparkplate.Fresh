/**
 * Gemini (Google) API integration metadata.
 * npm i @google/genai
 */

import type { LlmProviderMeta } from './types'

export const GeminiMeta: LlmProviderMeta = {
  id: 'gemini',
  name: 'Gemini',
  apiBaseUrl: 'https://generativelanguage.googleapis.com',
  apiEndpoints: [
    { name: 'Generate content', path: '/v1beta/models/{model}:generateContent', method: 'POST', description: 'Generate model response' },
    { name: 'Stream content', path: '/v1beta/models/{model}:streamGenerateContent', method: 'POST', description: 'Stream generate content' },
    { name: 'Count tokens', path: '/v1beta/models/{model}:countTokens', method: 'POST', description: 'Count tokens' },
    { name: 'Embed content', path: '/v1beta/models/{model}:embedContent', method: 'POST', description: 'Create embeddings' },
    { name: 'List models', path: '/v1beta/models', method: 'GET', description: 'List available models' },
    { name: 'Upload file', path: '/upload/v1beta/files', method: 'POST', description: 'Upload files' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/GoogleDeepMind',
    youtube: 'https://www.youtube.com/@GoogleDeepMind',
    linkedin: 'https://www.linkedin.com/company/google',
    github: 'https://github.com/googleapis/js-genai',
  },
  npmPackages: [
    '@google/genai',
  ],
  documentation: [
    'https://ai.google.dev/',
    'https://ai.google.dev/gemini-api/docs',
    'https://ai.google.dev/gemini-api/docs/quickstart',
    'https://cloud.google.com/gemini/docs',
  ],
}

export default GeminiMeta
