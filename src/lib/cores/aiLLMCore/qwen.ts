/**
 * Qwen (Alibaba) API integration metadata.
 * npm i @qwen-code/qwen-code; npm i @qwen-code/qwen-code-core
 */

import type { LlmProviderMeta } from './types'

export const QwenMeta: LlmProviderMeta = {
  id: 'qwen',
  name: 'Qwen',
  apiBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiEndpoints: [
    { name: 'Chat completions (CN)', path: '/chat/completions', method: 'POST', description: 'OpenAI-compatible chat (Beijing)' },
    { name: 'Chat completions (SG)', path: '/chat/completions', method: 'POST', description: 'Singapore: https://dashscope-intl.aliyuncs.com/compatible-mode/v1' },
    { name: 'Chat completions (US)', path: '/chat/completions', method: 'POST', description: 'Virginia: https://dashscope-us.aliyuncs.com/compatible-mode/v1' },
    { name: 'Models list', path: '/models', method: 'GET', description: 'List available models' },
  ],
  socialMedia: {
    twitter: 'https://twitter.com/QwenLM',
    github: 'https://github.com/QwenLM',
    huggingface: 'https://huggingface.co/Qwen',
    wikipedia: 'https://en.wikipedia.org/wiki/Qwen',
  },
  npmPackages: [
    '@qwen-code/qwen-code',
    '@qwen-code/qwen-code-core',
  ],
  documentation: [
    'https://help.aliyun.com/zh/dashscope/',
    'https://www.alibabacloud.com/help/en/model-studio',
    'https://qwen-ai.chat/docs/api/',
  ],
}

export default QwenMeta
