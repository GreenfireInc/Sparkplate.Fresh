<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="ipfs-modal-overlay" />
      <DialogContent
        class="ipfs-modal-content"
        :class="{ 'ipfs-modal-content--wide': consoleOpen }"
        :aria-describedby="undefined"
      >
        <div class="ipfs-modal-layout">
        <div class="ipfs-form-panel">
        <DialogTitle class="ipfs-modal-title">
          <div class="ipfs-modal-title-left flex items-center gap-2 min-w-0">
            <img
              v-if="entity && iconMap[entity.id]"
              :src="iconMap[entity.id]"
              :alt="entity.name"
              class="ipfs-title-icon"
            />
            <i v-else-if="entity" class="bi bi-cloud-arrow-up ipfs-title-icon ipfs-title-icon-bi"></i>
            <span class="wrap-break-word">{{ entity?.name }} API Configuration</span>
          </div>
        </DialogTitle>
        <div v-if="entity" class="ipfs-modal-body">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                v-model="formData.apiKey"
                type="password"
                class="ipfs-input"
                :placeholder="entity.needsSecret ? `${entity.name} API Key` : `${entity.name} API Token / Key`"
                autocomplete="off"
              />
            </div>
            <div v-if="entity.needsSecret">
              <label class="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
              <input
                v-model="formData.apiSecret"
                type="password"
                class="ipfs-input"
                :placeholder="`${entity.name} API Secret`"
                autocomplete="off"
              />
            </div>
            <div class="flex flex-wrap gap-2 pt-2 justify-between items-center">
              <div v-if="hasProviderLinks" class="flex flex-wrap gap-3 items-center text-sm">
                <a
                  v-if="providerMeta?.documentation?.[0]"
                  :href="providerMeta.documentation[0]"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ipfs-link"
                  title="API Documentation"
                >
                  <i class="bi bi-code-slash"></i>
                </a>
                <a
                  v-if="providerMeta?.socialMedia?.github"
                  :href="providerMeta.socialMedia.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ipfs-link"
                  title="GitHub"
                >
                  <i class="bi bi-github"></i>
                </a>
                <a
                  v-if="providerMeta?.socialMedia?.twitter"
                  :href="providerMeta.socialMedia.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ipfs-link"
                  title="Twitter / X"
                >
                  <i class="bi bi-twitter-x"></i>
                </a>
              </div>
              <div class="flex gap-2 shrink-0 items-center">
                <input ref="importFileEl" type="file" accept=".json" class="hidden" @change="importKeys" />

                <button class="ipfs-btn ipfs-btn-save" @click="save">
                  <i class="bi bi-floppy"></i> Save
                </button>

                <DropdownMenuRoot v-model:open="actionsOpen">
                  <DropdownMenuTrigger class="ipfs-btn ipfs-actions-trigger" :class="{ 'ipfs-actions-trigger--pinging': pinging }">
                    <span v-if="pinging" class="ipfs-ping-dot" />
                    Actions
                    <i class="bi bi-chevron-down ipfs-actions-chevron" :class="{ 'ipfs-actions-chevron--open': actionsOpen }"></i>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuContent class="ipfs-actions-menu" :side-offset="6" align="end">
                      <DropdownMenuItem class="ipfs-actions-item" @click="importFileEl?.click()">
                        <i class="bi bi-box-arrow-in-down"></i> Import
                      </DropdownMenuItem>
                      <DropdownMenuItem class="ipfs-actions-item" @click="exportKeys">
                        <i class="bi bi-box-arrow-up"></i> Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator class="ipfs-actions-separator" />
                      <DropdownMenuItem
                        class="ipfs-actions-item ipfs-actions-item--ping"
                        :disabled="pinging"
                        @click="testPing"
                      >
                        <span v-if="pinging" class="ipfs-ping-dot" />
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
        </div><!-- /.ipfs-form-panel -->

        <!-- ── Console panel ─────────────────────────────────────────────── -->
        <Transition name="ipfs-console">
          <div v-if="consoleOpen" class="ipfs-console-panel">
            <div class="ipfs-console-header">
              <span class="ipfs-console-dots">
                <span class="ipfs-console-dot ipfs-console-dot--red" />
                <span class="ipfs-console-dot ipfs-console-dot--yellow" />
                <span class="ipfs-console-dot ipfs-console-dot--green" />
              </span>
              <span class="ipfs-console-title">console</span>
              <button class="ipfs-console-close" title="Close" @click="consoleOpen = false">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div ref="consoleScrollEl" class="ipfs-console-body">
              <div
                v-for="entry in consoleLogs"
                :key="entry.id"
                :class="['ipfs-console-line', `ipfs-console-line--${entry.level}`]"
              >
                <span class="ipfs-console-ts">{{ entry.ts }}</span>
                <span class="ipfs-console-msg">{{ entry.msg }}</span>
              </div>
              <div v-if="pinging" class="ipfs-console-line ipfs-console-line--info">
                <span class="ipfs-console-ts">{{ timestamp() }}</span>
                <span class="ipfs-console-msg ipfs-console-cursor">▋</span>
              </div>
            </div>
          </div>
        </Transition>

        </div><!-- /.ipfs-modal-layout -->
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
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
import { IpfsProviders } from '@/lib/cores/ipfsCore'
import type { IpfsProviderMeta } from '@/lib/cores/ipfsCore'
import { useIpfsConsole } from './ext/console.ipfs'

const STORAGE_PREFIX = 'sparkplate_api_'

const PROVIDERS_NEED_SECRET = new Set(['pinata', 'filebase', 'fleek', 'infura'])

// Icons from public/assets/icons/ipfs
const iconMap: Record<string, string> = {
  crust: '/assets/icons/ipfs/crust.svg',
  filebase: '/assets/icons/ipfs/filebase.svg',
  fleek: '/assets/icons/ipfs/ipfs.svg',
  infura: '/assets/icons/ipfs/infura.svg',
  lighthouse: '/assets/icons/ipfs/lighthouse.svg',
  nftstorage: '/assets/icons/ipfs/nftStorage.svg',
  pinata: '/assets/icons/ipfs/pinata.svg',
  storacha: '/assets/icons/ipfs/storacha.svg',
}

interface IPFSEntity {
  id: string
  name: string
  apiKey: string
  apiSecret: string
  needsSecret: boolean
}

const IPFS_ENTITIES: IPFSEntity[] = (Object.values(IpfsProviders) as IpfsProviderMeta[]).map((meta) => {
  const id = meta.id
  return {
    id,
    name: meta.name,
    apiKey: `${id}_api_key`,
    apiSecret: `${id}_api_secret`,
    needsSecret: PROVIDERS_NEED_SECRET.has(id),
  }
})

const props = defineProps<{
  modelValue: boolean
  providerId: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const entity = computed(() => IPFS_ENTITIES.find((e) => e.id === props.providerId) ?? null)

const providerMeta = computed((): IpfsProviderMeta | null => {
  const list = Object.values(IpfsProviders) as IpfsProviderMeta[]
  return list.find((m) => m.id === props.providerId) ?? null
})

const hasProviderLinks = computed(() => {
  const m = providerMeta.value
  if (!m) return false
  return !!((m.documentation?.length ?? 0) > 0 || m.socialMedia?.github || m.socialMedia?.twitter)
})

const formData = reactive({
  apiKey: '',
  apiSecret: '',
})

// ── Actions dropdown ────────────────────────────────────────────────────────
const actionsOpen  = ref(false)
const importFileEl = ref<HTMLInputElement | null>(null)

// ── Console panel — ext/console.ipfs.ts ─────────────────────────────────────
const { consoleOpen, pinging, consoleLogs, consoleScrollEl, timestamp, testPing } =
  useIpfsConsole(entity, formData)

function loadFormData() {
  const e = entity.value
  if (!e) return
  try {
    formData.apiKey = localStorage.getItem(STORAGE_PREFIX + e.apiKey) || ''
    formData.apiSecret = e.needsSecret ? (localStorage.getItem(STORAGE_PREFIX + e.apiSecret) || '') : ''
  } catch {
    formData.apiKey = ''
    formData.apiSecret = ''
  }
}

function save() {
  const e = entity.value
  if (!e) return
  try {
    if (formData.apiKey) localStorage.setItem(STORAGE_PREFIX + e.apiKey, formData.apiKey)
    else localStorage.removeItem(STORAGE_PREFIX + e.apiKey)
    if (e.needsSecret) {
      if (formData.apiSecret) localStorage.setItem(STORAGE_PREFIX + e.apiSecret, formData.apiSecret)
      else localStorage.removeItem(STORAGE_PREFIX + e.apiSecret)
    }
  } catch {
    // ignore
  }
}

function exportKeys() {
  const e = entity.value
  if (!e) return
  const payload: Record<string, string> = {}
  if (formData.apiKey)    payload.apiKey    = formData.apiKey
  if (formData.apiSecret) payload.apiSecret = formData.apiSecret
  const blob = new Blob(
    [JSON.stringify({ provider: e.id, keys: payload }, null, 2)],
    { type: 'application/json' },
  )
  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
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
      if (keys.apiKey)    formData.apiKey    = keys.apiKey
      if (keys.apiSecret) formData.apiSecret = keys.apiSecret
    } catch { /* malformed file — ignore */ }
    if (importFileEl.value) importFileEl.value.value = ''
  }
  reader.readAsText(file)
}

watch(open, (v) => {
  if (v) loadFormData()
})

watch(() => props.providerId, () => {
  if (open.value) loadFormData()
})
</script>

<style scoped>
.ipfs-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.ipfs-modal-content {
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

.ipfs-modal-layout {
  display: flex;
  align-items: stretch;
}

.ipfs-form-panel {
  padding: 1.5rem 2rem;
  min-width: 380px;
  flex-shrink: 0;
}

.ipfs-modal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.ipfs-title-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.ipfs-title-icon-bi {
  font-size: 1.5rem;
  color: #6b7280;
  object-fit: unset;
}

.ipfs-modal-body {
  margin-bottom: 0.5rem;
}

.ipfs-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.ipfs-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.ipfs-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid #d1d5db;
  background: white;
}

.ipfs-btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.ipfs-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

/* ── Actions dropdown ────────────────────────────────────────────────────── */
.ipfs-actions-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding-right: 0.6rem;
}

.ipfs-actions-trigger--pinging {
  background: #f0fdf4;
  border-color: #22c55e;
}

.ipfs-actions-chevron {
  font-size: 0.65rem;
  transition: transform 0.18s ease;
  opacity: 0.6;
}

.ipfs-actions-chevron--open {
  transform: rotate(180deg);
}

.ipfs-ping-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: ipfs-blink 0.9s infinite;
}

@keyframes ipfs-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}

/* ── Console panel ───────────────────────────────────────────────────────── */
.ipfs-console-panel {
  width: 340px;
  background: #0d1117;
  border-left: 1px solid #21262d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ipfs-console-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  user-select: none;
}

.ipfs-console-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.ipfs-console-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.ipfs-console-dot--red    { background: #ff5f57; }
.ipfs-console-dot--yellow { background: #febc2e; }
.ipfs-console-dot--green  { background: #28c840; }

.ipfs-console-title {
  flex: 1;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.7rem;
  color: #6e7681;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: lowercase;
}

.ipfs-console-close {
  background: none;
  border: none;
  color: #6e7681;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  font-size: 0.75rem;
  transition: color 0.15s;
}

.ipfs-console-close:hover { color: #e6edf3; }

.ipfs-console-body {
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

.ipfs-console-body::-webkit-scrollbar       { width: 4px; }
.ipfs-console-body::-webkit-scrollbar-track { background: #0d1117; }
.ipfs-console-body::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }

.ipfs-console-line {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

.ipfs-console-ts {
  color: #484f58;
  flex-shrink: 0;
  font-size: 0.65rem;
}

.ipfs-console-msg { flex: 1; }

.ipfs-console-line--info    .ipfs-console-msg { color: #8b949e; }
.ipfs-console-line--request .ipfs-console-msg { color: #c084fc; }
.ipfs-console-line--success .ipfs-console-msg { color: #3fb950; }
.ipfs-console-line--error   .ipfs-console-msg { color: #f85149; }
.ipfs-console-line--warn    .ipfs-console-msg { color: #d29922; }

.ipfs-console-cursor {
  animation: ipfs-cursor-blink 1s steps(1) infinite;
}

@keyframes ipfs-cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── Slide-in transition ─────────────────────────────────────────────────── */
.ipfs-console-enter-active,
.ipfs-console-leave-active {
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.22s ease;
  overflow: hidden;
}

.ipfs-console-enter-from,
.ipfs-console-leave-to {
  width: 0 !important;
  opacity: 0;
}

.ipfs-console-enter-to,
.ipfs-console-leave-from {
  width: 340px;
  opacity: 1;
}

.ipfs-link {
  display: inline-flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s;
}

.ipfs-link:hover {
  color: #3b82f6;
}

.ipfs-link .bi {
  font-size: 1.125rem;
}
</style>

<!-- Unscoped: DropdownMenuPortal teleports to <body>, outside the scoped tree -->
<style>
.ipfs-actions-menu {
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -3px rgba(0, 0, 0, 0.08);
  padding: 0.25rem;
  z-index: 10000;
  animation: ipfs-menu-in 0.12s ease;
}

@keyframes ipfs-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ipfs-actions-separator {
  height: 1px;
  background: #f3f4f6;
  margin: 0.25rem 0;
}

.ipfs-actions-item {
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

.ipfs-actions-item:hover,
.ipfs-actions-item[data-highlighted] {
  background: #f3f4f6;
  color: #111827;
}

.ipfs-actions-item[data-disabled] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.ipfs-actions-item--ping:hover,
.ipfs-actions-item--ping[data-highlighted] {
  background: #f0fdf4;
  color: #16a34a;
}
</style>
