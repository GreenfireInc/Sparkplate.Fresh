<template>
  <div class="tab-panel space-y-6">
    <h4 class="text-md font-medium text-gray-700">AI LLMs</h4>
    <p class="text-sm text-gray-500">
      API keys for AI language models (Gemini, Claude, ChatGPT, etc.).
    </p>
    <div class="llms-cards-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="entity in llmTableData"
        :key="entity.id"
        class="llm-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300 transition-colors"
      >
        <button
          type="button"
          class="w-full flex items-center gap-2 text-left mb-3 min-w-0"
          @click="openLlmModal(entity.id)"
        >
          <img
            v-if="llmIconMap[entity.id]"
            :src="llmIconMap[entity.id]"
            :alt="entity.name"
            class="llm-entity-icon shrink-0"
          />
          <span class="text-sm font-medium text-gray-900 wrap-break-word">{{ entity.name }}</span>
        </button>
        <button
          type="button"
          role="switch"
          :aria-checked="!!apiKeys[entity.apiKey]"
          :class="['llm-toggle', { 'llm-toggle-on': apiKeys[entity.apiKey] }]"
          @click.stop="toggleEntity(entity)"
        >
          <span class="llm-toggle-thumb" />
        </button>
      </div>
    </div>
    <LlmModal v-model="llmsModalOpen" :entity-id="selectedLlmId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import LlmModal from '@/components/modals/settings/apis/LlmModal.vue'
import openaiIcon from '@lobehub/icons-static-svg/icons/openai.svg?url'
import claudeIcon from '@lobehub/icons-static-svg/icons/claude.svg?url'
import deepseekIcon from '@lobehub/icons-static-svg/icons/deepseek.svg?url'
import geminiIcon from '@lobehub/icons-static-svg/icons/gemini.svg?url'
import grokIcon from '@lobehub/icons-static-svg/icons/grok.svg?url'
import kimiIcon from '@lobehub/icons-static-svg/icons/kimi.svg?url'
import manusIcon from '@lobehub/icons-static-svg/icons/manus.svg?url'
import metaIcon from '@lobehub/icons-static-svg/icons/meta.svg?url'
import mistralIcon from '@lobehub/icons-static-svg/icons/mistral.svg?url'
import perplexityIcon from '@lobehub/icons-static-svg/icons/perplexity.svg?url'
import qwenIcon from '@lobehub/icons-static-svg/icons/qwen.svg?url'

const STORAGE_PREFIX = 'sparkplate_api_'

const LLM_ICON_MAP: Record<string, string> = {
  chatgpt: openaiIcon,
  claude: claudeIcon,
  deepseek: deepseekIcon,
  gemini: geminiIcon,
  grok: grokIcon,
  kimi: kimiIcon,
  manus: manusIcon,
  meta: metaIcon,
  mistral: mistralIcon,
  perplexity: perplexityIcon,
  qwen: qwenIcon,
}

const LLM_ENTITIES = [
  { id: 'chatgpt',    name: 'ChatGPT',    apiKey: 'chatgpt_api_key_1' },
  { id: 'claude',     name: 'Claude',     apiKey: 'claude_api_key_1' },
  { id: 'deepseek',   name: 'DeepSeek',   apiKey: 'deepseek_api_key_1' },
  { id: 'gemini',     name: 'Gemini',     apiKey: 'gemini_api_key_1' },
  { id: 'grok',       name: 'Grok',       apiKey: 'grok_api_key_1' },
  { id: 'kimi',       name: 'Kimi',       apiKey: 'kimi_api_key_1' },
  { id: 'manus',      name: 'Manus',      apiKey: 'manus_api_key_1' },
  { id: 'meta',       name: 'Meta',       apiKey: 'meta_api_key_1' },
  { id: 'mistral',    name: 'Mistral',    apiKey: 'mistral_api_key_1' },
  { id: 'perplexity', name: 'Perplexity', apiKey: 'perplexity_api_key_1' },
  { id: 'qwen',       name: 'Qwen',       apiKey: 'qwen_api_key_1' },
]

export default defineComponent({
  name: 'AiLLMProviders',
  components: { LlmModal },
  setup() {
    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      for (const entity of LLM_ENTITIES) {
        try {
          const stored = localStorage.getItem(STORAGE_PREFIX + entity.apiKey)
          if (stored) keys[entity.apiKey] = stored
        } catch {
          // Ignore storage errors
        }
      }
      apiKeys.value = keys
    }

    const saveApiKey = (key: string) => {
      const value = apiKeys.value[key]
      try {
        if (value) {
          localStorage.setItem(STORAGE_PREFIX + key, value)
        } else {
          localStorage.removeItem(STORAGE_PREFIX + key)
        }
      } catch {
        // Ignore storage errors
      }
    }

    const llmsModalOpen = ref(false)
    const selectedLlmId = ref('')

    const getLlmStatus = (entity: { apiKey: string }) => {
      const key = apiKeys.value[entity.apiKey]
      return key ? 'Configured' : '—'
    }

    const openLlmModal = (entityId: string) => {
      selectedLlmId.value = entityId
      llmsModalOpen.value = true
    }

    const toggleEntity = (entity: { id: string; apiKey: string }) => {
      if (apiKeys.value[entity.apiKey]) {
        apiKeys.value[entity.apiKey] = ''
        saveApiKey(entity.apiKey)
      } else {
        openLlmModal(entity.id)
      }
    }

    const llmTableData = computed(() => LLM_ENTITIES)

    onMounted(loadApiKeys)

    watch(llmsModalOpen, (open) => {
      if (!open) loadApiKeys()
    })

    return {
      apiKeys,
      saveApiKey,
      llmTableData,
      llmsModalOpen,
      selectedLlmId,
      getLlmStatus,
      openLlmModal,
      toggleEntity,
      llmIconMap: LLM_ICON_MAP,
    }
  }
})
</script>

<style lang="scss" scoped>
.llms-cards-scroll {
  max-height: 100%;
  overflow-y: auto;
}

.llm-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.llm-entity-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.llm-toggle {
  position: relative;
  display: inline-flex;
  width: 2.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  border: none;
  border-radius: 9999px;
  background: #d1d5db;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.llm-toggle:hover {
  background: #9ca3af;
}

.llm-toggle-on {
  background: #22c55e;
}

.llm-toggle-on:hover {
  background: #16a34a;
}

.llm-toggle-thumb {
  position: absolute;
  left: 2px;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.llm-toggle-on .llm-toggle-thumb {
  transform: translateX(1rem);
}
</style>
