<template>
  <div class="adapters-proxies">
    <h4 class="net-section-title">Detected Adapters</h4>
    <p v-if="isLoading" class="net-section-desc">Loading network adapters…</p>
    <div v-else-if="networkAdapters.length === 0" class="net-empty">No network adapters detected.</div>
    <div v-else class="adapter-cards">
      <div
        v-for="adapter in networkAdapters"
        :key="adapter.device"
        class="adapter-card"
      >
        <div class="adapter-header">
          <span class="adapter-name">{{ adapter.device }}</span>
          <span v-if="adapter.ipAddresses.length" class="adapter-ip">{{ adapter.ipAddresses[0] }}</span>
        </div>
        <div class="adapter-meta">
          <span v-if="adapter.interface" class="adapter-badge">{{ adapter.interface }}</span>
          <span v-if="adapter.manufacturer && adapter.manufacturer !== '—'" class="adapter-badge">{{ adapter.manufacturer }}</span>
        </div>

        <div class="adapter-section">
          <h5 class="adapter-subtitle">Connected instances</h5>
          <div class="instance-list">
            <div v-for="(inst, i) in connectedByAdapter[adapter.device] || []" :key="i" class="instance-row">
              {{ inst }}
            </div>
            <div v-if="!connectedByAdapter[adapter.device]?.length" class="instance-empty">None</div>
          </div>
        </div>

        <div class="adapter-section">
          <h5 class="adapter-subtitle">Proxy / Tunnels</h5>
          <div class="proxy-tunnels">
            <div class="proxy-row">
              <label class="proxy-label">Proxy list</label>
              <input v-model="proxyByAdapter[adapter.device]" type="text" class="proxy-input" placeholder="http://host:port" />
            </div>
            <div class="proxy-row">
              <label class="proxy-toggle">
                <input type="checkbox" v-model="ngrokByAdapter[adapter.device]" class="sr-only" />
                <span class="proxy-toggle-track" />
                Ngrok
              </label>
            </div>
            <div class="proxy-row">
              <label class="proxy-toggle">
                <input type="checkbox" v-model="cloudflareByAdapter[adapter.device]" class="sr-only" />
                <span class="proxy-toggle-track" />
                Cloudflare 1.1.1.1
              </label>
            </div>
            <div class="proxy-row">
              <label class="proxy-toggle">
                <input type="checkbox" v-model="tailscaleByAdapter[adapter.device]" class="sr-only" />
                <span class="proxy-toggle-track" />
                Tailscale
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useNetworkAdapters } from '@/components/partials/hardware/network'

const { networkAdapters, isLoading } = useNetworkAdapters()

const connectedByAdapter = reactive<Record<string, string[]>>({})

const proxyByAdapter = reactive<Record<string, string>>({})
const ngrokByAdapter = reactive<Record<string, boolean>>({})
const cloudflareByAdapter = reactive<Record<string, boolean>>({})
const tailscaleByAdapter = reactive<Record<string, boolean>>({})

watch(
  () => networkAdapters.value.map((a) => a.device),
  (devices) => {
    for (const d of devices) {
      if (!(d in proxyByAdapter)) proxyByAdapter[d] = ''
      if (!(d in ngrokByAdapter)) ngrokByAdapter[d] = false
      if (!(d in cloudflareByAdapter)) cloudflareByAdapter[d] = false
      if (!(d in tailscaleByAdapter)) tailscaleByAdapter[d] = false
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.adapters-proxies {
  padding: 0.25rem 0;
}

.net-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.net-section-desc {
  font-size: 0.8125rem;
  color: #6b7280;
}

.net-empty {
  font-size: 0.875rem;
  color: #9ca3af;
  padding: 1rem 0;
}

.adapter-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.adapter-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.adapter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.adapter-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.adapter-ip {
  font-size: 0.8125rem;
  color: #6b7280;
}

.adapter-meta {
  display: flex;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
}

.adapter-badge {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  color: #374151;
}

.adapter-section {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.adapter-subtitle {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.instance-list, .instance-empty {
  font-size: 0.8125rem;
  color: #6b7280;
}

.instance-row {
  padding: 0.25rem 0;
}

.proxy-tunnels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.proxy-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.proxy-label {
  font-size: 0.8125rem;
  color: #374151;
  min-width: 6rem;
}

.proxy-input {
  flex: 1;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.proxy-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #374151;
  cursor: pointer;
}

.proxy-toggle-track {
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: #d1d5db;
}

.proxy-toggle input:checked + .proxy-toggle-track {
  background: #3b82f6;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
</style>
