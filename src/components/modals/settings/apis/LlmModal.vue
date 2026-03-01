<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="llms-modal-overlay" />
      <DialogContent
        class="llms-modal-content"
        :class="{ 'llms-modal-content--wide': consoleOpen }"
        :aria-describedby="undefined"
      >
        <div class="llms-modal-layout">
          <!-- ── Form panel ─────────────────────────────────────────── -->
          <div class="llms-form-panel">
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
                <div
                  v-for="slot in apiKeySlots"
                  :key="slot.storageKey"
                  class="llms-key-row flex flex-wrap items-center gap-2"
                >
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="formData.enabled[slot.storageKey]"
                    :class="['llms-slot-toggle', { 'llms-slot-toggle-on': formData.enabled[slot.storageKey] }]"
                    :title="formData.enabled[slot.storageKey] ? 'Disable' : 'Enable'"
                    @click="toggleSlot(slot.storageKey)"
                  >
                    <span class="llms-slot-toggle-thumb" />
                  </button>
                  <label class="text-sm font-medium text-gray-700 shrink-0 w-24">{{ slot.label }}</label>
                  <input
                    v-model="formData.values[slot.storageKey]"
                    type="password"
                    class="llms-input flex-1 min-w-0"
                    :placeholder="slot.label"
                    :disabled="!formData.enabled[slot.storageKey]"
                  />
                </div>
                <div class="flex flex-wrap gap-2 pt-2 justify-between items-center">
                  <div v-if="hasProviderLinks" class="flex flex-wrap gap-3 items-center text-sm">
                    <a
                      v-if="providerMeta.apiBaseUrl"
                      :href="providerMeta.apiBaseUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="llms-link"
                      title="API base URL"
                    >
                      <i class="bi bi-code-slash"></i>
                    </a>
                    <a
                      v-if="providerMeta.socialMedia?.github"
                      :href="providerMeta.socialMedia.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="llms-link"
                      title="GitHub"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                    <a
                      v-if="providerMeta.socialMedia?.twitter"
                      :href="providerMeta.socialMedia.twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="llms-link"
                      title="Twitter / X"
                    >
                      <i class="bi bi-twitter-x"></i>
                    </a>
                    <a
                      v-if="providerMeta.socialMedia?.wikipedia"
                      :href="providerMeta.socialMedia.wikipedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="llms-link"
                      title="Wikipedia"
                    >
                      <i class="bi bi-wikipedia"></i>
                    </a>
                    <a
                      v-for="pkg in providerMeta.npmPackages"
                      :key="pkg"
                      :href="`https://www.npmjs.com/package/${pkg}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="llms-link"
                      :title="`npm: ${pkg}`"
                    >
                      <Icon icon="logos:npm-2" class="llms-icon-npm" />
                    </a>
                  </div>
                  <div class="flex gap-2 shrink-0 items-center">
                    <input ref="importFileEl" type="file" accept=".json" class="hidden" @change="importKeys" />

                    <button class="llms-btn llms-btn-save" @click="save">
                      <i class="bi bi-floppy"></i> Save
                    </button>

                    <DropdownMenuRoot v-model:open="actionsOpen">
                      <DropdownMenuTrigger class="llms-btn llms-actions-trigger" :class="{ 'llms-actions-trigger--pinging': pinging }">
                        <span v-if="pinging" class="llms-ping-dot" />
                        Actions
                        <i class="bi bi-chevron-down llms-actions-chevron" :class="{ 'llms-actions-chevron--open': actionsOpen }"></i>
                      </DropdownMenuTrigger>

                      <DropdownMenuPortal>
                        <DropdownMenuContent class="llms-actions-menu" :side-offset="6" align="end">
                          <DropdownMenuItem class="llms-actions-item" @click="importFileEl?.click()">
                            <i class="bi bi-box-arrow-in-down"></i> Import
                          </DropdownMenuItem>
                          <DropdownMenuItem class="llms-actions-item" @click="exportKeys">
                            <i class="bi bi-box-arrow-up"></i> Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator class="llms-actions-separator" />
                          <DropdownMenuItem
                            class="llms-actions-item llms-actions-item--ping"
                            :disabled="pinging"
                            @click="testPing"
                          >
                            <span v-if="pinging" class="llms-ping-dot" />
                            <i v-else class="bi bi-reception-4"></i>
                            {{ pinging ? 'Pinging…' : 'Test / Ping' }}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenuRoot>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Console panel ──────────────────────────────────────── -->
          <Transition name="llms-console">
            <div v-if="consoleOpen" class="llms-console-panel">
              <div class="llms-console-header">
                <span class="llms-console-dots">
                  <span class="llms-console-dot llms-console-dot--red" />
                  <span class="llms-console-dot llms-console-dot--yellow" />
                  <span class="llms-console-dot llms-console-dot--green" />
                </span>
                <span class="llms-console-title">console</span>
                <button class="llms-console-close" @click="consoleOpen = false" title="Close">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div ref="consoleScrollEl" class="llms-console-body">
                <div
                  v-for="entry in consoleLogs"
                  :key="entry.id"
                  :class="['llms-console-line', `llms-console-line--${entry.level}`]"
                >
                  <span class="llms-console-ts">{{ entry.ts }}</span>
                  <span class="llms-console-msg">{{ entry.msg }}</span>
                </div>
                <div v-if="pinging" class="llms-console-line llms-console-line--info">
                  <span class="llms-console-ts">{{ timestamp() }}</span>
                  <span class="llms-console-msg llms-console-cursor">▋</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useLlmConsole } from './ext/console'
import { Icon } from '@iconify/vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { AiLLMProviders } from '@/lib/cores/aiLLMCore'
import type { LlmProviderMeta } from '@/lib/cores/aiLLMCore'
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

const API_KEY_SLOTS = [
  { storageKey: 'api_key_1', label: 'apiKey.1' },
  { storageKey: 'api_key_2', label: 'apiKey.2' },
  { storageKey: 'api_key_3', label: 'apiKey.3' },
] as const

const apiKeySlots = API_KEY_SLOTS

interface LlmEntity {
  id: string
  name: string
  apiKey1: string
  apiKey2: string
  apiKey3: string
}

const LLM_ENTITIES: LlmEntity[] = [
  { id: 'chatgpt',    name: 'ChatGPT',    apiKey1: 'chatgpt_api_key_1',    apiKey2: 'chatgpt_api_key_2',    apiKey3: 'chatgpt_api_key_3' },
  { id: 'claude',     name: 'Claude',     apiKey1: 'claude_api_key_1',     apiKey2: 'claude_api_key_2',     apiKey3: 'claude_api_key_3' },
  { id: 'deepseek',   name: 'DeepSeek',   apiKey1: 'deepseek_api_key_1',   apiKey2: 'deepseek_api_key_2',   apiKey3: 'deepseek_api_key_3' },
  { id: 'gemini',     name: 'Gemini',     apiKey1: 'gemini_api_key_1',     apiKey2: 'gemini_api_key_2',     apiKey3: 'gemini_api_key_3' },
  { id: 'grok',       name: 'Grok',       apiKey1: 'grok_api_key_1',       apiKey2: 'grok_api_key_2',       apiKey3: 'grok_api_key_3' },
  { id: 'kimi',       name: 'Kimi',       apiKey1: 'kimi_api_key_1',       apiKey2: 'kimi_api_key_2',       apiKey3: 'kimi_api_key_3' },
  { id: 'manus',      name: 'Manus',      apiKey1: 'manus_api_key_1',      apiKey2: 'manus_api_key_2',      apiKey3: 'manus_api_key_3' },
  { id: 'meta',       name: 'Meta',       apiKey1: 'meta_api_key_1',       apiKey2: 'meta_api_key_2',       apiKey3: 'meta_api_key_3' },
  { id: 'mistral',    name: 'Mistral',    apiKey1: 'mistral_api_key_1',    apiKey2: 'mistral_api_key_2',    apiKey3: 'mistral_api_key_3' },
  { id: 'perplexity', name: 'Perplexity', apiKey1: 'perplexity_api_key_1', apiKey2: 'perplexity_api_key_2', apiKey3: 'perplexity_api_key_3' },
  { id: 'qwen',       name: 'Qwen',       apiKey1: 'qwen_api_key_1',       apiKey2: 'qwen_api_key_2',       apiKey3: 'qwen_api_key_3' },
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

const providerMeta = computed((): LlmProviderMeta | null => {
  const list = Object.values(AiLLMProviders) as LlmProviderMeta[]
  return list.find((m) => m.id === props.entityId) ?? null
})

const hasProviderLinks = computed(() => {
  const m = providerMeta.value
  if (!m) return false
  return !!(
    m.apiBaseUrl ||
    m.socialMedia?.github ||
    m.socialMedia?.twitter ||
    m.socialMedia?.wikipedia ||
    (m.npmPackages?.length ?? 0) > 0
  )
})

const formData = reactive<{
  values: Record<string, string>
  enabled: Record<string, boolean>
}>({
  values: { api_key_1: '', api_key_2: '', api_key_3: '' },
  enabled: { api_key_1: false, api_key_2: false, api_key_3: false },
})

// slot storageKey → entity field holding the localStorage key name
const entityStorageKeys: Record<string, keyof LlmEntity> = {
  api_key_1: 'apiKey1',
  api_key_2: 'apiKey2',
  api_key_3: 'apiKey3',
}

function loadFormData() {
  const e = entity.value
  if (!e) return
  try {
    for (const slot of API_KEY_SLOTS) {
      const storageKey = e[entityStorageKeys[slot.storageKey]]
      const stored = localStorage.getItem(STORAGE_PREFIX + storageKey) || ''
      formData.values[slot.storageKey] = stored
      formData.enabled[slot.storageKey] = !!stored
    }
  } catch {
    for (const slot of API_KEY_SLOTS) {
      formData.values[slot.storageKey] = ''
      formData.enabled[slot.storageKey] = false
    }
  }
}

function toggleSlot(slotKey: string) {
  formData.enabled[slotKey] = !formData.enabled[slotKey]
  if (!formData.enabled[slotKey]) {
    formData.values[slotKey] = ''
  }
}

function save() {
  const e = entity.value
  if (!e) return
  try {
    for (const slot of API_KEY_SLOTS) {
      const storageKey = e[entityStorageKeys[slot.storageKey]]
      const value = formData.enabled[slot.storageKey] ? formData.values[slot.storageKey] : ''
      if (value) localStorage.setItem(STORAGE_PREFIX + storageKey, value)
      else localStorage.removeItem(STORAGE_PREFIX + storageKey)
    }
  } catch {
    // ignore
  }
}

// ── Actions dropdown ────────────────────────────────────────────────────────
const actionsOpen  = ref(false)
const importFileEl = ref<HTMLInputElement | null>(null)

function exportKeys() {
  const e = entity.value
  if (!e) return
  const payload: Record<string, string> = {}
  for (const slot of API_KEY_SLOTS) {
    const value = formData.enabled[slot.storageKey] ? formData.values[slot.storageKey] : ''
    if (value) payload[slot.label] = value
  }
  const blob = new Blob([JSON.stringify({ provider: e.id, keys: payload }, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${e.id}-api-keys.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importKeys(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string) as { keys?: Record<string, string> }
      const keys = json?.keys ?? {}
      for (const slot of API_KEY_SLOTS) {
        if (keys[slot.label]) {
          formData.values[slot.storageKey]  = keys[slot.label]
          formData.enabled[slot.storageKey] = true
        }
      }
    } catch { /* malformed file — ignore */ }
    if (importFileEl.value) importFileEl.value.value = ''
  }
  reader.readAsText(file)
}

// ── Console panel — ext/console.ts ─────────────────────────────────────────
const { consoleOpen, pinging, consoleLogs, consoleScrollEl, timestamp, testPing } =
  useLlmConsole(entity, API_KEY_SLOTS, formData)

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
  min-width: 380px;
  max-width: 92vw;
  z-index: 9999;
  overflow: hidden;
  transition: min-width 0.3s ease;
}

.llms-modal-layout {
  display: flex;
  align-items: stretch;
}

.llms-form-panel {
  padding: 1.5rem 2rem;
  min-width: 380px;
  flex-shrink: 0;
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

.llms-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}

.llms-key-row {
  gap: 0.5rem;
}

.llms-slot-toggle {
  position: relative;
  display: inline-flex;
  width: 2rem;
  height: 1.125rem;
  flex-shrink: 0;
  align-items: center;
  border: none;
  border-radius: 9999px;
  background: #d1d5db;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.llms-slot-toggle:hover {
  background: #9ca3af;
}

.llms-slot-toggle-on {
  background: #22c55e;
}

.llms-slot-toggle-on:hover {
  background: #16a34a;
}

.llms-slot-toggle-thumb {
  position: absolute;
  left: 2px;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.llms-slot-toggle-on .llms-slot-toggle-thumb {
  transform: translateX(0.875rem);
}

.llms-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: white;
}

.llms-btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.llms-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

/* ── Actions dropdown ────────────────────────────────────────────────────── */
.llms-actions-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding-right: 0.6rem;
}

.llms-actions-trigger--pinging {
  background: #f0fdf4;
  border-color: #22c55e;
}

.llms-actions-chevron {
  font-size: 0.65rem;
  transition: transform 0.18s ease;
  opacity: 0.6;
}

.llms-actions-chevron--open {
  transform: rotate(180deg);
}

/* ── Actions menu styles live in the global block below (portal escapes scoping) ── */

.llms-link {
  display: inline-flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s;
}

.llms-link:hover {
  color: #3b82f6;
}

.llms-link .bi {
  font-size: 1.125rem;
}

.llms-icon-npm {
  width: 1.25rem;
  height: 1.25rem;
  color: inherit;
}

/* ── Test button pinging state ───────────────────────────────────────────── */
.llms-btn-test:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.llms-btn-test--pinging {
  background: #f0fdf4;
  border-color: #22c55e;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.llms-ping-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: llms-blink 0.9s infinite;
}

@keyframes llms-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* ── Console panel ───────────────────────────────────────────────────────── */
.llms-console-panel {
  width: 340px;
  background: #0d1117;
  border-left: 1px solid #21262d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.llms-console-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  user-select: none;
}

.llms-console-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.llms-console-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.llms-console-dot--red    { background: #ff5f57; }
.llms-console-dot--yellow { background: #febc2e; }
.llms-console-dot--green  { background: #28c840; }

.llms-console-title {
  flex: 1;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.7rem;
  color: #6e7681;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: lowercase;
}

.llms-console-close {
  background: none;
  border: none;
  color: #6e7681;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  font-size: 0.75rem;
  transition: color 0.15s;
}

.llms-console-close:hover { color: #e6edf3; }

.llms-console-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.625rem 0.75rem;
  min-height: 180px;
  max-height: 320px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  scrollbar-width: thin;
  scrollbar-color: #30363d #0d1117;
}

.llms-console-body::-webkit-scrollbar       { width: 4px; }
.llms-console-body::-webkit-scrollbar-track { background: #0d1117; }
.llms-console-body::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }

.llms-console-line {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

.llms-console-ts {
  color: #484f58;
  flex-shrink: 0;
  font-size: 0.65rem;
}

.llms-console-msg { flex: 1; }

.llms-console-line--info    .llms-console-msg { color: #8b949e; }
.llms-console-line--request .llms-console-msg { color: #c084fc; }
.llms-console-line--success .llms-console-msg { color: #3fb950; }
.llms-console-line--error   .llms-console-msg { color: #f85149; }
.llms-console-line--warn    .llms-console-msg { color: #d29922; }

.llms-console-cursor {
  animation: llms-cursor-blink 1s steps(1) infinite;
}

@keyframes llms-cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Slide-in transition ─────────────────────────────────────────────────── */
.llms-console-enter-active,
.llms-console-leave-active {
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.22s ease;
  overflow: hidden;
}

.llms-console-enter-from,
.llms-console-leave-to {
  width: 0 !important;
  opacity: 0;
}

.llms-console-enter-to,
.llms-console-leave-from {
  width: 340px;
  opacity: 1;
}
</style>

<!-- Unscoped: DropdownMenuPortal teleports to <body>, outside the scoped tree -->
<style>
.llms-actions-menu {
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -3px rgba(0, 0, 0, 0.08);
  padding: 0.25rem;
  z-index: 10000;
  animation: llms-menu-in 0.12s ease;
}

@keyframes llms-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.llms-actions-separator {
  height: 1px;
  background: #f3f4f6;
  margin: 0.25rem 0;
}

.llms-actions-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #374151;
  text-align: left;
  transition: background 0.1s;
  outline: none;
  user-select: none;
}

.llms-actions-item:hover,
.llms-actions-item[data-highlighted] {
  background: #f3f4f6;
  color: #111827;
}

.llms-actions-item[data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.llms-actions-item--ping:hover,
.llms-actions-item--ping[data-highlighted] {
  background: #f0fdf4;
  color: #16a34a;
}
</style>
