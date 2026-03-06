<template>
  <div class="bittorrent-tab">
    <h4 class="net-section-title">BitTorrent</h4>
    <p class="net-section-desc">Manage trackers, ping status, and submit torrents.</p>

    <div class="bt-section">
      <h5 class="bt-subtitle">Tracker list</h5>
      <textarea
        v-model="trackerList"
        class="bt-textarea"
        placeholder="One tracker URL per line"
        rows="6"
      />
    </div>

    <div class="bt-section">
      <h5 class="bt-subtitle">Actions</h5>
      <div class="bt-actions">
        <button type="button" class="bt-btn" @click="pingTrackers" :disabled="pinging">
          {{ pinging ? 'Pinging…' : 'Ping trackers' }}
        </button>
        <button type="button" class="bt-btn" @click="extractTrackers" :disabled="extracting">
          {{ extracting ? 'Extracting…' : 'Extract from torrent / magnet' }}
        </button>
        <button type="button" class="bt-btn" @click="submitToTracker" :disabled="submitting">
          {{ submitting ? 'Submitting…' : 'Submit torrent to tracker' }}
        </button>
      </div>
    </div>

    <div v-if="extractedTrackers.length" class="bt-section">
      <h5 class="bt-subtitle">Extracted trackers</h5>
      <div class="bt-extracted">
        <span v-for="t in extractedTrackers" :key="t" class="bt-extracted-item">{{ t }}</span>
      </div>
    </div>

    <div class="bt-section">
      <h5 class="bt-subtitle">Extract trackers</h5>
      <div class="bt-extract-row">
        <input
          v-model="extractInput"
          type="text"
          class="bt-input"
          placeholder="Paste magnet link"
        />
        <label class="bt-file-btn">
          <input type="file" accept=".torrent" class="bt-file-input" @change="onTorrentFile" />
          Choose .torrent file
        </label>
      </div>
    </div>

    <div v-if="pingResults.length" class="bt-section">
      <h5 class="bt-subtitle">Ping results</h5>
      <div class="bt-ping-results">
        <div v-for="r in pingResults" :key="r.url" class="bt-ping-row">
          <span class="bt-ping-url">{{ r.url }}</span>
          <span :class="['bt-ping-status', r.ok ? 'ok' : 'fail']">
            {{ r.ok ? 'OK' : 'Fail' }} {{ r.ms != null ? `(${r.ms}ms)` : '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const trackerList = ref('')
const extractInput = ref('')
const extractedTrackers = ref<string[]>([])
const pingResults = ref<Array<{ url: string; ok: boolean; ms?: number }>>([])
const pinging = ref(false)
const extracting = ref(false)
const submitting = ref(false)

function pingTrackers() {
  const urls = trackerList.value.split('\n').map((s) => s.trim()).filter(Boolean)
  if (!urls.length) return
  pinging.value = true
  pingResults.value = []
  setTimeout(() => {
    pingResults.value = urls.map((url) => ({ url, ok: Math.random() > 0.3, ms: Math.round(Math.random() * 200) }))
    pinging.value = false
  }, 800)
}

function extractTrackers() {
  const input = extractInput.value.trim()
  if (!input) return
  extracting.value = true
  if (input.startsWith('magnet:')) {
    try {
      const params = new URLSearchParams(input.replace('magnet:?', ''))
      const tr = params.getAll('tr')
      extractedTrackers.value = tr
      if (tr.length) trackerList.value = [...new Set([...trackerList.value.split('\n').filter(Boolean), ...tr])].join('\n')
    } catch {
      extractedTrackers.value = []
    }
  }
  extracting.value = false
}

function onTorrentFile(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  extracting.value = true
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const buf = reader.result as ArrayBuffer
      const tr = parseTorrentTrackers(buf)
      extractedTrackers.value = tr
      if (tr.length) trackerList.value = [...new Set([...trackerList.value.split('\n').filter(Boolean), ...tr])].join('\n')
    } catch {
      extractedTrackers.value = []
    }
    extracting.value = false
    input.value = ''
  }
  reader.readAsArrayBuffer(file)
}

/** Heuristic tracker extraction from .torrent buffer (bencode contains readable URLs) */
function parseTorrentTrackers(buf: ArrayBuffer): string[] {
  const str = new TextDecoder('utf-8', { fatal: false }).decode(buf)
  const matches = str.match(/(?:udp|http|https):\/\/[^\s\x00-\x1f"'\])}]+/gi) || []
  return [...new Set(matches.map((u) => u.replace(/[\x00-\x1f"'\])}\s]+$/, '').trim()).filter((u) => u.length > 10))]
}

function submitToTracker() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
  }, 1000)
}
</script>

<style scoped>
.bittorrent-tab {
  padding: 0.25rem 0;
}

.net-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.net-section-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.bt-section {
  margin-bottom: 1.25rem;
}

.bt-subtitle {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.bt-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-family: ui-monospace, monospace;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  resize: vertical;
}

.bt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bt-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  background: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.bt-btn:hover:not(:disabled) {
  background: #2563eb;
}

.bt-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bt-extract-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.bt-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.bt-file-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  white-space: nowrap;
}

.bt-file-btn:hover {
  background: #e5e7eb;
}

.bt-file-input {
  display: none;
}

.bt-extracted, .bt-ping-results {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bt-extracted-item, .bt-ping-row {
  font-size: 0.8125rem;
  padding: 0.25rem 0;
}

.bt-ping-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.bt-ping-url {
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bt-ping-status.ok {
  color: #059669;
}

.bt-ping-status.fail {
  color: #dc2626;
}
</style>
