<template>
  <div class="tab-panel space-y-6">
    <h4 class="text-md font-medium text-gray-700">IPFS Providers</h4>
    <p class="text-sm text-gray-500">
      API keys for IPFS pinning services (Filebase, Pinata, etc.).
    </p>
    <div class="ipfs-cards-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="provider in ipfsTableData"
        :key="provider.id"
        class="ipfs-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300 transition-colors"
      >
        <button
          type="button"
          class="w-full flex items-center gap-2 text-left mb-3 min-w-0"
          @click="openIpfsModal(provider.id)"
        >
          <img
            v-if="ipfsIconMap[provider.id]"
            :src="ipfsIconMap[provider.id]"
            :alt="provider.name"
            class="ipfs-entity-icon shrink-0"
          />
          <i v-else class="bi bi-cloud-arrow-up ipfs-entity-icon ipfs-entity-icon-bi shrink-0"></i>
          <span class="text-sm font-medium text-gray-900 wrap-break-word">{{ provider.name }}</span>
        </button>
        <button
          type="button"
          role="switch"
          :aria-checked="!!apiKeys[provider.apiKey]"
          :class="['ipfs-toggle', { 'ipfs-toggle-on': apiKeys[provider.apiKey] }]"
          @click.stop="toggleProvider(provider)"
        >
          <span class="ipfs-toggle-thumb" />
        </button>
      </div>
    </div>
    <IPFSModal v-model="ipfsModalOpen" :provider-id="selectedProviderId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import IPFSModal from '@/components/modals/settings/apis/IPFSModal.vue'
import { IpfsProviders } from '@/lib/cores/ipfsCore'
import type { IpfsProviderMeta } from '@/lib/cores/ipfsCore'

const STORAGE_PREFIX = 'sparkplate_api_'

const PROVIDERS_NEED_SECRET = new Set(['pinata', 'filebase', 'fleek', 'infura'])

const IPFS_ENTITIES = (Object.values(IpfsProviders) as IpfsProviderMeta[]).map((meta) => {
  const id = meta.id
  return {
    id,
    name: meta.name,
    apiKey: `${id}_api_key`,
    apiSecret: `${id}_api_secret`,
    needsSecret: PROVIDERS_NEED_SECRET.has(id),
  }
})

// Icons from public/assets/icons/ipfs (fallback to generic icon when missing)
const IPFS_ICON_MAP: Record<string, string> = {
  crust: '/assets/icons/ipfs/crust.svg',
  filebase: '/assets/icons/ipfs/filebase.svg',
  fleek: '/assets/icons/ipfs/ipfs.svg',
  infura: '/assets/icons/ipfs/infura.svg',
  lighthouse: '/assets/icons/ipfs/lighthouse.svg',
  nftstorage: '/assets/icons/ipfs/nftStorage.svg',
  pinata: '/assets/icons/ipfs/pinata.svg',
  storacha: '/assets/icons/ipfs/storacha.svg',
}

export default defineComponent({
  name: 'IPFSProviders',
  components: { IPFSModal },
  setup() {
    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      for (const provider of IPFS_ENTITIES) {
        try {
          const stored = localStorage.getItem(STORAGE_PREFIX + provider.apiKey)
          if (stored) keys[provider.apiKey] = stored
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

    const ipfsModalOpen = ref(false)
    const selectedProviderId = ref('')

    const openIpfsModal = (providerId: string) => {
      selectedProviderId.value = providerId
      ipfsModalOpen.value = true
    }

    const toggleProvider = (provider: { id: string; apiKey: string; apiSecret: string; needsSecret: boolean }) => {
      if (apiKeys.value[provider.apiKey]) {
        apiKeys.value[provider.apiKey] = ''
        if (provider.needsSecret) {
          apiKeys.value[provider.apiSecret] = ''
          saveApiKey(provider.apiSecret)
        }
        saveApiKey(provider.apiKey)
      } else {
        openIpfsModal(provider.id)
      }
    }

    const ipfsTableData = computed(() => IPFS_ENTITIES)

    onMounted(loadApiKeys)

    watch(ipfsModalOpen, (open) => {
      if (!open) loadApiKeys()
    })

    return {
      apiKeys,
      saveApiKey,
      ipfsTableData,
      ipfsModalOpen,
      selectedProviderId,
      openIpfsModal,
      toggleProvider,
      ipfsIconMap: IPFS_ICON_MAP,
    }
  }
})
</script>

<style lang="scss" scoped>
.ipfs-cards-scroll {
  max-height: 100%;
  overflow-y: auto;
}

.ipfs-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.ipfs-entity-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.ipfs-entity-icon-bi {
  font-size: 1.5rem;
  color: #6b7280;
  object-fit: unset;
}

.ipfs-toggle {
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

.ipfs-toggle:hover {
  background: #9ca3af;
}

.ipfs-toggle-on {
  background: #22c55e;
}

.ipfs-toggle-on:hover {
  background: #16a34a;
}

.ipfs-toggle-thumb {
  position: absolute;
  left: 2px;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.ipfs-toggle-on .ipfs-toggle-thumb {
  transform: translateX(1rem);
}
</style>
