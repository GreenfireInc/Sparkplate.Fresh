<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="llms-modal-overlay" />
      <DialogContent class="llms-modal-content" :aria-describedby="undefined">
        <DialogTitle class="llms-modal-title">LLM API Configuration</DialogTitle>
        <div class="llms-modal-body">
          <div class="rounded-lg border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">#</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Entity</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">API Key</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">API Secret</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">API Passphrase</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Active</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idx) in llmTable.getRowModel().rows"
                  :key="row.id"
                  class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    class="py-3 px-4 text-sm text-gray-900"
                  >
                    <FlexRender :render="cell.column.columnDef.cell!" :props="cell.getContext()" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
  type ColumnDef,
  FlexRender,
} from '@tanstack/vue-table'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from 'radix-vue'

const STORAGE_PREFIX = 'sparkplate_api_'

export interface LlmEntity {
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
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const formData = ref<Record<string, { apiKey: string; apiSecret: string; apiPassphrase: string; active: boolean }>>({})

function loadFormData() {
  const data: Record<string, { apiKey: string; apiSecret: string; apiPassphrase: string; active: boolean }> = {}
  for (const entity of LLM_ENTITIES) {
    try {
      const apiKey = localStorage.getItem(STORAGE_PREFIX + entity.apiKey) || ''
      const apiSecret = localStorage.getItem(STORAGE_PREFIX + entity.apiSecret) || ''
      const apiPassphrase = localStorage.getItem(STORAGE_PREFIX + entity.apiPassphrase) || ''
      data[entity.id] = {
        apiKey,
        apiSecret,
        apiPassphrase,
        active: !!(apiKey || apiSecret || apiPassphrase),
      }
    } catch {
      data[entity.id] = { apiKey: '', apiSecret: '', apiPassphrase: '', active: false }
    }
  }
  formData.value = data
}

function saveEntity(entity: LlmEntity) {
  const d = formData.value[entity.id]
  if (!d) return
  try {
    if (d.apiKey) localStorage.setItem(STORAGE_PREFIX + entity.apiKey, d.apiKey)
    else localStorage.removeItem(STORAGE_PREFIX + entity.apiKey)
    if (d.apiSecret) localStorage.setItem(STORAGE_PREFIX + entity.apiSecret, d.apiSecret)
    else localStorage.removeItem(STORAGE_PREFIX + entity.apiSecret)
    if (d.apiPassphrase) localStorage.setItem(STORAGE_PREFIX + entity.apiPassphrase, d.apiPassphrase)
    else localStorage.removeItem(STORAGE_PREFIX + entity.apiPassphrase)
  } catch {
    // ignore
  }
}

function testPing(entity: LlmEntity) {
  console.log('Test/Ping', entity.name)
  // TODO: implement actual API test
}

watch(open, (v) => {
  if (v) loadFormData()
})

type LlmRow = LlmEntity & { index: number }

const columnHelper = createColumnHelper<LlmRow>()

const llmTable = useVueTable({
  get data() {
    return LLM_ENTITIES.map((e, i) => ({ ...e, index: i + 1 }))
  },
  get columns(): ColumnDef<LlmRow, unknown>[] {
    return [
      columnHelper.accessor('index', {
        header: '#',
        cell: (info) => h('span', { class: 'text-gray-600' }, info.getValue()),
      }),
      columnHelper.accessor('name', {
        header: 'Entity',
        cell: (info) => h('span', { class: 'font-medium' }, info.getValue()),
      }),
      columnHelper.display({
        id: 'apiKey',
        header: 'API Key',
        cell: ({ row }) => {
          const entity = row.original
          const d = formData.value[entity.id]
          return h('input', {
            type: 'password',
            class: 'llms-input',
            placeholder: 'API Key',
            value: d?.apiKey ?? '',
            onInput: (e: Event) => {
              if (!formData.value[entity.id]) formData.value[entity.id] = { apiKey: '', apiSecret: '', apiPassphrase: '', active: false }
              formData.value[entity.id].apiKey = (e.target as HTMLInputElement).value
            },
          })
        },
      }),
      columnHelper.display({
        id: 'apiSecret',
        header: 'API Secret',
        cell: ({ row }) => {
          const entity = row.original
          const d = formData.value[entity.id]
          return h('input', {
            type: 'password',
            class: 'llms-input',
            placeholder: 'API Secret',
            value: d?.apiSecret ?? '',
            onInput: (e: Event) => {
              if (!formData.value[entity.id]) formData.value[entity.id] = { apiKey: '', apiSecret: '', apiPassphrase: '', active: false }
              formData.value[entity.id].apiSecret = (e.target as HTMLInputElement).value
            },
          })
        },
      }),
      columnHelper.display({
        id: 'apiPassphrase',
        header: 'API Passphrase',
        cell: ({ row }) => {
          const entity = row.original
          const d = formData.value[entity.id]
          return h('input', {
            type: 'password',
            class: 'llms-input',
            placeholder: 'API Passphrase',
            value: d?.apiPassphrase ?? '',
            onInput: (e: Event) => {
              if (!formData.value[entity.id]) formData.value[entity.id] = { apiKey: '', apiSecret: '', apiPassphrase: '', active: false }
              formData.value[entity.id].apiPassphrase = (e.target as HTMLInputElement).value
            },
          })
        },
      }),
      columnHelper.display({
        id: 'active',
        header: 'Active',
        cell: ({ row }) => {
          const entity = row.original
          const d = formData.value[entity.id]
          return h('input', {
            type: 'checkbox',
            class: 'llms-checkbox',
            checked: d?.active ?? false,
            onChange: (e: Event) => {
              if (!formData.value[entity.id]) formData.value[entity.id] = { apiKey: '', apiSecret: '', apiPassphrase: '', active: false }
              formData.value[entity.id].active = (e.target as HTMLInputElement).checked
            },
          })
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const entity = row.original
          return h('div', { class: 'flex gap-2' }, [
            h('button', {
              class: 'llms-btn llms-btn-save',
              onClick: () => saveEntity(entity),
            }, 'Save'),
            h('button', {
              class: 'llms-btn llms-btn-test',
              onClick: () => testPing(entity),
            }, 'Test/Ping'),
          ])
        },
      }),
    ]
  },
  getCoreRowModel: getCoreRowModel(),
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
  min-width: 640px;
  max-width: 95vw;
  max-height: 90vh;
  overflow: auto;
  z-index: 9999;
}

.llms-modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.llms-modal-body {
  overflow-x: auto;
}

.llms-input {
  width: 100%;
  min-width: 120px;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.llms-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.llms-checkbox {
  width: 1rem;
  height: 1rem;
}

.llms-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
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
