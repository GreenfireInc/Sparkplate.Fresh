<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="llms-modal-overlay" />
      <DialogContent class="llms-modal-content" :aria-describedby="undefined">
        <DialogTitle class="llms-modal-title">
          <img
            v-if="entity && iconMap[entity.id]"
            :src="iconMap[entity.id]"
            :alt="entity.name"
            class="llms-title-icon"
          />
          {{ entity?.name }} API Configuration
        </DialogTitle>
        <div v-if="entity" class="llms-modal-body">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                v-model="formData.apiKey"
                type="password"
                class="llms-input"
                placeholder="API Key"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
              <input
                v-model="formData.apiSecret"
                type="password"
                class="llms-input"
                placeholder="API Secret"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Passphrase</label>
              <input
                v-model="formData.apiPassphrase"
                type="password"
                class="llms-input"
                placeholder="API Passphrase"
              />
            </div>
            <div class="flex gap-2 pt-2">
              <button class="llms-btn llms-btn-save" @click="save">Save</button>
              <button class="llms-btn llms-btn-test" @click="testPing">Test/Ping</button>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from 'radix-vue'
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

const iconMap: Record<string, string> = {
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

const STORAGE_PREFIX = 'sparkplate_api_'

interface LlmEntity {
  id: string
  name: string
  apiKey: string
  apiSecret: string
  apiPassphrase: string
}

const LLM_ENTITIES: LlmEntity[] = [
  { id: 'chatgpt', name: 'ChatGPT', apiKey: 'chatgpt_api_key', apiSecret: 'chatgpt_api_secret', apiPassphrase: 'chatgpt_api_passphrase' },
  { id: 'claude', name: 'Claude', apiKey: 'claude_api_key', apiSecret: 'claude_api_secret', apiPassphrase: 'claude_api_passphrase' },
  { id: 'deepseek', name: 'DeepSeek', apiKey: 'deepseek_api_key', apiSecret: 'deepseek_api_secret', apiPassphrase: 'deepseek_api_passphrase' },
  { id: 'gemini', name: 'Gemini', apiKey: 'gemini_api_key', apiSecret: 'gemini_api_secret', apiPassphrase: 'gemini_api_passphrase' },
  { id: 'grok', name: 'Grok', apiKey: 'grok_api_key', apiSecret: 'grok_api_secret', apiPassphrase: 'grok_api_passphrase' },
  { id: 'kimi', name: 'Kimi', apiKey: 'kimi_api_key', apiSecret: 'kimi_api_secret', apiPassphrase: 'kimi_api_passphrase' },
  { id: 'manus', name: 'Manus', apiKey: 'manus_api_key', apiSecret: 'manus_api_secret', apiPassphrase: 'manus_api_passphrase' },
  { id: 'meta', name: 'Meta', apiKey: 'meta_api_key', apiSecret: 'meta_api_secret', apiPassphrase: 'meta_api_passphrase' },
  { id: 'mistral', name: 'Mistral', apiKey: 'mistral_api_key', apiSecret: 'mistral_api_secret', apiPassphrase: 'mistral_api_passphrase' },
  { id: 'perplexity', name: 'Perplexity', apiKey: 'perplexity_api_key', apiSecret: 'perplexity_api_secret', apiPassphrase: 'perplexity_api_passphrase' },
  { id: 'qwen', name: 'Qwen', apiKey: 'qwen_api_key', apiSecret: 'qwen_api_secret', apiPassphrase: 'qwen_api_passphrase' },
]

const props = defineProps<{
  modelValue: boolean
  entityId: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const entity = computed(() => LLM_ENTITIES.find((e) => e.id === props.entityId) ?? null)

const formData = reactive({
  apiKey: '',
  apiSecret: '',
  apiPassphrase: '',
})

function loadFormData() {
  const e = entity.value
  if (!e) return
  try {
    formData.apiKey = localStorage.getItem(STORAGE_PREFIX + e.apiKey) || ''
    formData.apiSecret = localStorage.getItem(STORAGE_PREFIX + e.apiSecret) || ''
    formData.apiPassphrase = localStorage.getItem(STORAGE_PREFIX + e.apiPassphrase) || ''
  } catch {
    formData.apiKey = ''
    formData.apiSecret = ''
    formData.apiPassphrase = ''
  }
}

function save() {
  const e = entity.value
  if (!e) return
  try {
    if (formData.apiKey) localStorage.setItem(STORAGE_PREFIX + e.apiKey, formData.apiKey)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiKey)
    if (formData.apiSecret) localStorage.setItem(STORAGE_PREFIX + e.apiSecret, formData.apiSecret)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiSecret)
    if (formData.apiPassphrase) localStorage.setItem(STORAGE_PREFIX + e.apiPassphrase, formData.apiPassphrase)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiPassphrase)
  } catch {
    // ignore
  }
}

function testPing() {
  const e = entity.value
  if (!e) return
  console.log('Test/Ping', e.name)
}

watch(open, (v) => {
  if (v) loadFormData()
})

watch(() => props.entityId, () => {
  if (open.value) loadFormData()
})
</script>

<style scoped>
.llms-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.llms-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 2rem;
  min-width: 380px;
  max-width: 90vw;
  z-index: 9999;
}

.llms-modal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.llms-title-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.llms-modal-body {
  margin-bottom: 0.5rem;
}

.llms-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.llms-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.llms-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: white;
}

.llms-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

.llms-btn-test:hover {
  background: #f0fdf4;
  border-color: #22c55e;
}
</style>
