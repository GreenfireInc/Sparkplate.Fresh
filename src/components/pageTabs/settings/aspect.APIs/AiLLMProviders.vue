<template>
  <div class="tab-panel space-y-6">
    <h4 class="text-md font-medium text-gray-700">AI LLMs</h4>
    <p class="text-sm text-gray-500">
      API keys for AI language models (Gemini, Claude, ChatGPT, etc.).
    </p>
    <div class="llms-table-scroll rounded-lg border border-gray-200 overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">#</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Entity</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Status</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entity, idx) in llmTableData"
            :key="entity.id"
            class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
          >
            <td class="py-3 px-4 text-sm text-gray-600">{{ idx + 1 }}</td>
            <td class="py-3 px-4 text-sm font-medium text-gray-900">
              <div class="flex items-center gap-2">
                <img
                  v-if="llmIconMap[entity.id]"
                  :src="llmIconMap[entity.id]"
                  :alt="entity.name"
                  class="llm-entity-icon"
                />
                <span>{{ entity.name }}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-sm">
              <button
                class="text-blue-600 hover:text-blue-800 hover:underline"
                @click="openLlmModal(entity.id)"
              >
                {{ getLlmStatus(entity) }}
              </button>
            </td>
            <td class="py-3 px-4 text-sm">
              <button
                type="button"
                role="switch"
                :aria-checked="!!apiKeys[entity.apiKey]"
                :class="['llm-toggle', { 'llm-toggle-on': apiKeys[entity.apiKey] }]"
                @click="toggleEntity(entity)"
              >
                <span class="llm-toggle-thumb" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <LlmsModal v-model="llmsModalOpen" :entity-id="selectedLlmId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import LlmsModal from '@/components/modals/settings/apis/Llms.vue'
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
  { id: 'chatgpt', name: 'ChatGPT', apiKey: 'chatgpt_api_key' },
  { id: 'claude', name: 'Claude', apiKey: 'claude_api_key' },
  { id: 'deepseek', name: 'DeepSeek', apiKey: 'deepseek_api_key' },
  { id: 'gemini', name: 'Gemini', apiKey: 'gemini_api_key' },
  { id: 'grok', name: 'Grok', apiKey: 'grok_api_key' },
  { id: 'kimi', name: 'Kimi', apiKey: 'kimi_api_key' },
  { id: 'manus', name: 'Manus', apiKey: 'manus_api_key' },
  { id: 'meta', name: 'Meta', apiKey: 'meta_api_key' },
  { id: 'mistral', name: 'Mistral', apiKey: 'mistral_api_key' },
  { id: 'perplexity', name: 'Perplexity', apiKey: 'perplexity_api_key' },
  { id: 'qwen', name: 'Qwen', apiKey: 'qwen_api_key' },
]

export default defineComponent({
  name: 'AiLLMProviders',
  components: { LlmsModal },
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
.llms-table-scroll {
  max-height: 100%;
  overflow-y: auto;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #f9fafb;
  }

  .llm-entity-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    object-fit: contain;
  }
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

.api-table-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: white;
}

.api-table-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
</style>
