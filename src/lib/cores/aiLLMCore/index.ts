/**
 * AI LLM Core – provider metadata (API endpoints, social links, npm packages, documentation).
 * Centralized export for all supported LLM providers.
 */

export type { ApiEndpoint, LlmProviderMeta } from './types'

import ChatGPTMeta from './chatgpt'
import ClaudeMeta from './claude'
import DeepSeekMeta from './deepseek'
import GeminiMeta from './gemini'
import GrokMeta from './grok'
import KimiMeta from './kimi'
import ManusMeta from './manus'
import MetaMeta from './meta'
import MistralMeta from './mistral'
import PerplexityMeta from './perplexity'
import QwenMeta from './qwen'

export { ChatGPTMeta, ClaudeMeta, DeepSeekMeta, GeminiMeta, GrokMeta, KimiMeta, ManusMeta, MetaMeta, MistralMeta, PerplexityMeta, QwenMeta }

export const AiLLMProviders = {
  ChatGPT: ChatGPTMeta,
  Claude: ClaudeMeta,
  DeepSeek: DeepSeekMeta,
  Gemini: GeminiMeta,
  Grok: GrokMeta,
  Kimi: KimiMeta,
  Manus: ManusMeta,
  Meta: MetaMeta,
  Mistral: MistralMeta,
  Perplexity: PerplexityMeta,
  Qwen: QwenMeta,
} as const

export default AiLLMProviders
