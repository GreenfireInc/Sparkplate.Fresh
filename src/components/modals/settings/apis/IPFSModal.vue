<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="ipfs-modal-overlay" />
      <DialogContent class="ipfs-modal-content" :aria-describedby="undefined">
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
              <div class="flex gap-2 shrink-0">
                <button class="ipfs-btn ipfs-btn-save" @click="save">Save</button>
                <button class="ipfs-btn ipfs-btn-test" @click="testPing">Test/Ping</button>
              </div>
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
import { IpfsProviders } from '@/lib/cores/ipfsCore'
import type { IpfsProviderMeta } from '@/lib/cores/ipfsCore'

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

function testPing() {
  const e = entity.value
  if (!e) return
  console.log('Test/Ping', e.name)
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
  padding: 1.5rem 2rem;
  min-width: 380px;
  max-width: 90vw;
  z-index: 9999;
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

.ipfs-btn-save:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

.ipfs-btn-test:hover {
  background: #f0fdf4;
  border-color: #22c55e;
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
