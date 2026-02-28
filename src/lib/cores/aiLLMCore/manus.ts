/**
 * Manus AI API integration metadata.
 * Official NPM packages TBD.
 */

import type { LlmProviderMeta } from './types'

export const ManusMeta: LlmProviderMeta = {
  id: 'manus',
  name: 'Manus',
  apiBaseUrl: 'https://api.manus.ai',
  apiEndpoints: [
    { name: 'Create task', path: '/v1/tasks', method: 'POST', description: 'Create a new task' },
    { name: 'List tasks', path: '/v1/tasks', method: 'GET', description: 'List tasks' },
    { name: 'Create project', path: '/v1/projects', method: 'POST', description: 'Create a new project' },
    { name: 'Upload file', path: '/v1/files', method: 'POST', description: 'Upload a file' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/ManusAI_HQ',
    linkedin: 'https://www.linkedin.com/company/manus-ai',
    youtube: 'https://www.youtube.com/@Manus-AI',
    instagram: 'https://www.instagram.com/manusaiofficial',
  },
  npmPackages: [],
  documentation: [
    'https://open.manus.ai/docs/quickstart',
    'https://open.manus.ai/docs/api-reference/index',
    'https://manus.im/about',
  ],
}

export default ManusMeta
