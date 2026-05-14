<template>
  <div class="sb-view">
    <header class="sb-view__header">
      <h1 class="sb-view__title">
        <FlaskConical :size="22" class="sb-view__title-icon" aria-hidden="true" />
        Sandbox
      </h1>
      <p class="sb-view__subtitle">
        Run snippets, call HTTP endpoints, inspect storage, and try browser APIs — fits the viewport; only inner panels scroll.
      </p>
    </header>

    <Separator class="sb-view__separator" />

    <section class="sb-view__section" aria-label="Sandbox tools">
      <TabsRoot v-model="activeSection" class="sb-tabs">
        <TabsList class="sb-tabs__list" aria-label="Sandbox sections">
          <TabsTrigger value="playground" class="sb-tabs__trigger">
            <Code2 :size="14" class="sb-tabs__icon" aria-hidden="true" />
            Playground
          </TabsTrigger>
          <TabsTrigger value="http" class="sb-tabs__trigger">
            <Globe :size="14" class="sb-tabs__icon" aria-hidden="true" />
            HTTP
          </TabsTrigger>
          <TabsTrigger value="storage" class="sb-tabs__trigger">
            <HardDrive :size="14" class="sb-tabs__icon" aria-hidden="true" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="system" class="sb-tabs__trigger">
            <Monitor :size="14" class="sb-tabs__icon" aria-hidden="true" />
            System
          </TabsTrigger>
          <TabsTrigger value="webapis" class="sb-tabs__trigger">
            <Sparkles :size="14" class="sb-tabs__icon" aria-hidden="true" />
            Web APIs
          </TabsTrigger>
        </TabsList>

        <div class="sb-panel-shell">
          <!-- Code + console -->
          <TabsContent value="playground" class="sb-tabs__panel">
            <div class="sb-playground">
              <div class="sb-playground__editor">
                <TabsRoot v-model="activeEditorTab" class="sb-inner-tabs">
                  <TabsList class="sb-inner-tabs__list" aria-label="Editor language">
                    <TabsTrigger
                      v-for="tab in editorTabs"
                      :key="tab.id"
                      :value="tab.id"
                      class="sb-inner-tabs__trigger"
                    >
                      {{ tab.name }}
                    </TabsTrigger>
                  </TabsList>
                  <div class="sb-editor-body">
                    <textarea
                      v-model="currentCode"
                      class="sb-code-input"
                      placeholder="Enter your code here…"
                      spellcheck="false"
                    />
                    <div class="sb-editor-actions">
                      <button type="button" class="sb-btn sb-btn--primary" @click="runCode">Run</button>
                      <button type="button" class="sb-btn sb-btn--danger" @click="clearCode">Clear</button>
                      <button type="button" class="sb-btn sb-btn--quiet" @click="formatCode">Format</button>
                    </div>
                  </div>
                </TabsRoot>
              </div>
              <div class="sb-playground__console">
                <div class="sb-console-head">
                  <span class="sb-console-head__label">Output</span>
                  <button type="button" class="sb-btn sb-btn--xs sb-btn--danger" @click="clearConsole">Clear</button>
                </div>
                <div ref="consoleOutput" class="sb-console-out">
                  <div
                    v-for="(log, index) in consoleLogs"
                    :key="index"
                    class="sb-log"
                    :data-type="log.type"
                  >
                    <span class="sb-log__time">{{ log.timestamp }}</span>
                    <span class="sb-log__msg">{{ log.message }}</span>
                  </div>
                  <div v-if="consoleLogs.length === 0" class="sb-console-empty">Output from Run will appear here.</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- HTTP -->
          <TabsContent value="http" class="sb-tabs__panel">
            <div class="sb-scroll">
              <div class="sb-http-row">
                <select v-model="apiMethod" class="sb-select">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <input v-model="apiUrl" type="url" class="sb-input sb-input--grow" placeholder="Request URL…">
                <button type="button" class="sb-btn sb-btn--primary" :disabled="isApiLoading" @click="testApi">
                  {{ isApiLoading ? 'Loading…' : 'Send' }}
                </button>
              </div>

              <div class="sb-block">
                <h4 class="sb-block__title">Headers</h4>
                <div v-for="(header, index) in apiHeaders" :key="index" class="sb-kv-row">
                  <input v-model="header.key" class="sb-input" placeholder="Name">
                  <input v-model="header.value" class="sb-input sb-input--grow" placeholder="Value">
                  <button type="button" class="sb-btn sb-btn--xs sb-btn--danger" @click="removeHeader(index)">✕</button>
                </div>
                <button type="button" class="sb-btn sb-btn--quiet sb-btn--sm" @click="addHeader">+ Header</button>
              </div>

              <div v-if="apiMethod !== 'GET'" class="sb-block">
                <h4 class="sb-block__title">Body</h4>
                <textarea v-model="apiBody" class="sb-textarea sb-textarea--sm" placeholder="JSON body…" />
              </div>

              <div v-if="apiResponse" class="sb-block">
                <h4 class="sb-block__title">Response</h4>
                <div class="sb-response-meta">
                  <span class="sb-status" :data-kind="getStatusClass(apiResponse.status)">
                    {{ apiResponse.status }} {{ apiResponse.statusText }}
                  </span>
                  <span class="sb-muted">{{ apiResponse.responseTime }} ms</span>
                </div>
                <pre class="sb-pre">{{ apiResponse.data }}</pre>
              </div>
            </div>
          </TabsContent>

          <!-- Storage -->
          <TabsContent value="storage" class="sb-tabs__panel">
            <div class="sb-storage">
              <div class="sb-storage__controls">
                <input v-model="storageKey" class="sb-input" placeholder="Key">
                <input v-model="storageValue" class="sb-input sb-input--grow" placeholder="Value">
                <button type="button" class="sb-btn sb-btn--primary" @click="setStorageItem">Set</button>
                <button type="button" class="sb-btn sb-btn--quiet" @click="refreshStorage">Refresh</button>
                <button type="button" class="sb-btn sb-btn--danger" @click="clearAllStorage">Clear all</button>
              </div>
              <div class="sb-storage__list">
                <div v-for="(value, key) in localStorageItems" :key="key" class="sb-storage-item">
                  <span class="sb-storage-item__key">{{ key }}</span>
                  <span class="sb-storage-item__val">{{ truncateValue(value) }}</span>
                  <button type="button" class="sb-btn sb-btn--xs sb-btn--danger" @click="removeStorageItem(key)">Remove</button>
                </div>
                <div v-if="Object.keys(localStorageItems).length === 0" class="sb-console-empty">No keys in localStorage.</div>
              </div>
            </div>
          </TabsContent>

          <!-- System -->
          <TabsContent value="system" class="sb-tabs__panel">
            <div class="sb-scroll sb-scroll--pad">
              <div class="sb-info-grid">
                <div class="sb-info-row">
                  <strong>User agent</strong>
                  <span>{{ systemInfo.userAgent }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Platform</strong>
                  <span>{{ systemInfo.platform }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Language</strong>
                  <span>{{ systemInfo.language }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Timezone</strong>
                  <span>{{ systemInfo.timezone }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Screen</strong>
                  <span>{{ systemInfo.screenResolution }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Viewport</strong>
                  <span>{{ systemInfo.viewportSize }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Online</strong>
                  <span :class="systemInfo.online ? 'sb-ok' : 'sb-bad'">{{ systemInfo.online ? 'Yes' : 'No' }}</span>
                </div>
                <div class="sb-info-row">
                  <strong>Heap (if exposed)</strong>
                  <span>{{ systemInfo.memoryUsage }}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- Web APIs -->
          <TabsContent value="webapis" class="sb-tabs__panel">
            <div class="sb-scroll sb-scroll--pad">
              <div class="sb-api-block">
                <h4 class="sb-block__title">Geolocation</h4>
                <button type="button" class="sb-btn sb-btn--primary" :disabled="isGettingLocation" @click="getLocation">
                  {{ isGettingLocation ? '…' : 'Get location' }}
                </button>
                <div v-if="locationData" class="sb-api-result">
                  <p>Lat {{ locationData.latitude }}, lon {{ locationData.longitude }}, ±{{ locationData.accuracy }} m</p>
                </div>
              </div>

              <div class="sb-api-block">
                <h4 class="sb-block__title">Clipboard</h4>
                <input v-model="clipboardText" class="sb-input sb-input--block" placeholder="Text to copy">
                <div class="sb-btn-row">
                  <button type="button" class="sb-btn sb-btn--quiet" @click="copyToClipboard">Copy</button>
                  <button type="button" class="sb-btn sb-btn--quiet" @click="readFromClipboard">Read</button>
                </div>
                <div v-if="clipboardResult" class="sb-api-result">{{ clipboardResult }}</div>
              </div>

              <div class="sb-api-block">
                <h4 class="sb-block__title">Notifications</h4>
                <input v-model="notificationText" class="sb-input sb-input--block" placeholder="Message">
                <button type="button" class="sb-btn sb-btn--quiet" @click="showNotification">Show</button>
                <p class="sb-muted sb-mt-xs">Permission: {{ notificationPermission }}</p>
              </div>

              <div class="sb-api-block">
                <h4 class="sb-block__title">Media</h4>
                <div class="sb-btn-row">
                  <button type="button" class="sb-btn sb-btn--quiet" :disabled="isAccessingMedia" @click="accessCamera">
                    Camera
                  </button>
                  <button type="button" class="sb-btn sb-btn--quiet" :disabled="isAccessingMedia" @click="accessMicrophone">
                    Microphone
                  </button>
                </div>
                <video v-if="mediaStream" ref="videoElement" class="sb-video" autoplay muted playsinline />
              </div>
            </div>
          </TabsContent>
        </div>
      </TabsRoot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import {
  FlaskConical,
  Code2,
  Globe,
  HardDrive,
  Monitor,
  Sparkles,
} from 'lucide-vue-next'

defineOptions({ name: 'SandboxPage' })

const activeSection = ref('playground')

const editorTabs = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' },
] as const

const activeEditorTab = ref<(typeof editorTabs)[number]['id']>('javascript')

const codeSnippets = reactive({
  javascript: `// JavaScript Example
console.log('Hello from Sandbox!');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));`,
  html: `<!-- HTML Example -->
<div class="demo-container">
  <h2>HTML Demo</h2>
  <p>This is a sample HTML structure</p>
  <button onclick="alert('Hello!')">Click me</button>
</div>`,
  css: `/* CSS Example */
.demo-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-family: Arial, sans-serif;
}

.demo-container h2 {
  margin-top: 0;
  color: #fff;
}`,
  json: `{
  "name": "Sandbox Demo",
  "version": "1.0.0",
  "features": [
    "Code Testing",
    "API Testing",
    "Storage Management",
    "Web APIs"
  ],
  "settings": {
    "theme": "dark",
    "autoSave": true
  }
}`,
})

const currentCode = computed({
  get: () => codeSnippets[activeEditorTab.value],
  set: (value: string) => {
    codeSnippets[activeEditorTab.value] = value
  },
})

const consoleLogs = ref<Array<{ type: string; message: string; timestamp: string }>>([])
const consoleOutput = ref<HTMLElement>()

const addLog = (message: string, type: string = 'info') => {
  const timestamp = new Date().toLocaleTimeString()
  consoleLogs.value.push({ type, message, timestamp })
  void nextTick(() => {
    if (consoleOutput.value) {
      consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight
    }
  })
}

const clearConsole = () => {
  consoleLogs.value = []
}

const runCode = () => {
  try {
    addLog(`Running ${activeEditorTab.value}…`, 'info')

    if (activeEditorTab.value === 'javascript') {
      const originalConsoleLog = console.log
      const logs: string[] = []

      console.log = (...args: unknown[]) => {
        logs.push(args.map((arg) => String(arg)).join(' '))
        originalConsoleLog(...args)
      }

      // eslint-disable-next-line no-new-func
      new Function(currentCode.value)()

      console.log = originalConsoleLog

      logs.forEach((log) => addLog(log, 'success'))
    } else if (activeEditorTab.value === 'json') {
      const parsed = JSON.parse(currentCode.value)
      addLog(`JSON valid:\n${JSON.stringify(parsed, null, 2)}`, 'success')
    } else {
      addLog(`${activeEditorTab.value.toUpperCase()} — no runtime (preview only)`, 'success')
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    addLog(`Error: ${err.message}`, 'error')
  }
}

const clearCode = () => {
  codeSnippets[activeEditorTab.value] = ''
}

const formatCode = () => {
  try {
    if (activeEditorTab.value === 'json') {
      const parsed = JSON.parse(currentCode.value)
      currentCode.value = JSON.stringify(parsed, null, 2)
      addLog('JSON formatted', 'success')
    } else {
      addLog('Format is only implemented for JSON', 'info')
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    addLog(`Format error: ${err.message}`, 'error')
  }
}

const apiMethod = ref('GET')
const apiUrl = ref('https://jsonplaceholder.typicode.com/posts/1')
const apiHeaders = ref([{ key: 'Content-Type', value: 'application/json' }])
const apiBody = ref('{}')
const apiResponse = ref<{
  status: number
  statusText: string
  data: string
  responseTime: number
} | null>(null)
const isApiLoading = ref(false)

const addHeader = () => {
  apiHeaders.value.push({ key: '', value: '' })
}

const removeHeader = (index: number) => {
  apiHeaders.value.splice(index, 1)
}

const getStatusClass = (status: number) => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'client-error'
  if (status >= 500) return 'server-error'
  return 'info'
}

const testApi = async () => {
  if (!apiUrl.value) return

  isApiLoading.value = true
  const startTime = Date.now()

  try {
    const headers: Record<string, string> = {}
    apiHeaders.value.forEach((header) => {
      if (header.key && header.value) {
        headers[header.key] = header.value
      }
    })

    const options: RequestInit = {
      method: apiMethod.value,
      headers,
    }

    if (apiMethod.value !== 'GET' && apiBody.value) {
      options.body = apiBody.value
    }

    const response = await fetch(apiUrl.value, options)
    const responseTime = Date.now() - startTime

    let data: unknown
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    apiResponse.value = {
      status: response.status,
      statusText: response.statusText,
      data: typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data),
      responseTime,
    }

    addLog(`HTTP ${response.status} in ${responseTime} ms`, 'success')
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    addLog(`Request failed: ${err.message}`, 'error')
    apiResponse.value = {
      status: 0,
      statusText: 'Error',
      data: err.message,
      responseTime: Date.now() - startTime,
    }
  } finally {
    isApiLoading.value = false
  }
}

const storageKey = ref('')
const storageValue = ref('')
const localStorageItems = ref<Record<string, string>>({})

const refreshStorage = () => {
  const items: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) items[key] = localStorage.getItem(key) || ''
  }
  localStorageItems.value = items
}

const setStorageItem = () => {
  if (storageKey.value) {
    localStorage.setItem(storageKey.value, storageValue.value)
    refreshStorage()
    addLog(`Set localStorage: ${storageKey.value}`, 'success')
    storageKey.value = ''
    storageValue.value = ''
  }
}

const removeStorageItem = (key: string) => {
  localStorage.removeItem(key)
  refreshStorage()
  addLog(`Removed: ${key}`, 'info')
}

const clearAllStorage = () => {
  localStorage.clear()
  refreshStorage()
  addLog('localStorage cleared', 'info')
}

const truncateValue = (value: string) =>
  value.length > 50 ? `${value.substring(0, 50)}…` : value

const systemInfo = reactive({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screenResolution: `${screen.width}x${screen.height}`,
  viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  online: navigator.onLine,
  memoryUsage: 'N/A',
})

const locationData = ref<{
  latitude: string
  longitude: string
  accuracy: string
} | null>(null)
const isGettingLocation = ref(false)
const clipboardText = ref('Hello from Sandbox!')
const clipboardResult = ref('')
const notificationText = ref('Test notification from Sandbox')
const notificationPermission = ref(typeof Notification !== 'undefined' ? Notification.permission : 'unsupported')
const mediaStream = ref<MediaStream | null>(null)
const isAccessingMedia = ref(false)
const videoElement = ref<HTMLVideoElement>()

const getLocation = () => {
  if (!navigator.geolocation) {
    addLog('Geolocation not supported', 'error')
    return
  }
  isGettingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationData.value = {
        latitude: position.coords.latitude.toFixed(6),
        longitude: position.coords.longitude.toFixed(6),
        accuracy: position.coords.accuracy.toFixed(0),
      }
      addLog('Geolocation OK', 'success')
      isGettingLocation.value = false
    },
    (error) => {
      addLog(`Geolocation: ${error.message}`, 'error')
      isGettingLocation.value = false
    },
  )
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(clipboardText.value)
    clipboardResult.value = 'Copied.'
    addLog('Clipboard write OK', 'success')
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    clipboardResult.value = `Copy failed: ${err.message}`
    addLog(clipboardResult.value, 'error')
  }
}

const readFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    clipboardResult.value = `Read: “${text}”`
    addLog('Clipboard read OK', 'success')
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    clipboardResult.value = `Read failed: ${err.message}`
    addLog(clipboardResult.value, 'error')
  }
}

const showNotification = async () => {
  if (typeof Notification === 'undefined') {
    addLog('Notifications not available', 'error')
    return
  }
  if (Notification.permission === 'granted') {
    new Notification('Sandbox', { body: notificationText.value, icon: '/favicon.ico' })
    addLog('Notification shown', 'success')
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    notificationPermission.value = permission
    if (permission === 'granted') {
      showNotification()
    } else {
      addLog('Notification permission denied', 'error')
    }
  } else {
    addLog('Notifications blocked', 'error')
  }
}

const accessCamera = async () => {
  isAccessingMedia.value = true
  try {
    mediaStream.value?.getTracks().forEach((t) => t.stop())
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    mediaStream.value = stream
    await nextTick()
    if (videoElement.value) videoElement.value.srcObject = stream
    addLog('Camera OK', 'success')
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    addLog(`Camera: ${err.message}`, 'error')
  } finally {
    isAccessingMedia.value = false
  }
}

const accessMicrophone = async () => {
  isAccessingMedia.value = true
  try {
    mediaStream.value?.getTracks().forEach((t) => t.stop())
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStream.value = stream
    addLog('Microphone OK', 'success')
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    addLog(`Microphone: ${err.message}`, 'error')
  } finally {
    isAccessingMedia.value = false
  }
}

const updateSystemInfo = () => {
  systemInfo.viewportSize = `${window.innerWidth}x${window.innerHeight}`
  systemInfo.online = navigator.onLine
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mem = (performance as any).memory
  if (mem) {
    const used = Math.round(mem.usedJSHeapSize / 1024 / 1024)
    const total = Math.round(mem.totalJSHeapSize / 1024 / 1024)
    systemInfo.memoryUsage = `${used}MB / ${total}MB`
  }
}

watch(activeEditorTab, () => {
  void nextTick(() => {
    if (consoleOutput.value) {
      consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight
    }
  })
})

onMounted(() => {
  refreshStorage()
  updateSystemInfo()
  window.addEventListener('online', updateSystemInfo)
  window.addEventListener('offline', updateSystemInfo)
  window.addEventListener('resize', updateSystemInfo)
  addLog('Sandbox ready', 'success')
})

onUnmounted(() => {
  window.removeEventListener('online', updateSystemInfo)
  window.removeEventListener('offline', updateSystemInfo)
  window.removeEventListener('resize', updateSystemInfo)
  mediaStream.value?.getTracks().forEach((t) => t.stop())
})
</script>

<style lang="scss" scoped>
.sb-view {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem 1.25rem 0.75rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
  color: #111827;
}

.sb-view__header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.sb-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.sb-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.sb-view__subtitle {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  max-width: 46rem;
}

.sb-view__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0 0 0.5rem;
  background: #e5e7eb;
}

.sb-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  overflow: hidden;
}

.sb-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.sb-tabs__list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0.65rem;
  background: #f9fafb;
}

.sb-tabs__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.sb-tabs__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.sb-panel-shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.sb-tabs__panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(37, 99, 235, 0.35);
  }
}

/* Playground split */
.sb-playground {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  gap: 0;
  overflow: hidden;
}

.sb-playground__editor {
  flex: 1 1 55%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
}

.sb-playground__console {
  flex: 1 1 45%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.65rem;
  box-sizing: border-box;
}

.sb-inner-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.sb-inner-tabs__list {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
  padding: 0.45rem 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
}

.sb-inner-tabs__trigger {
  padding: 0.35rem 0.65rem;
  border: none;
  border-radius: 0.25rem 0.25rem 0 0;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;
    background: #fff;
    box-shadow: 0 1px 0 #fff;
  }
}

.sb-editor-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.45rem 0.55rem 0.55rem;
  gap: 0.4rem;
}

.sb-code-input {
  flex: 1;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.65rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: ui-monospace, 'Cascadia Code', Menlo, monospace;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #111827;
  background: #fff;
  resize: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.sb-editor-actions {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.sb-console-head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.35rem;
}

.sb-console-head__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.sb-console-out {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.45rem 0.55rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #111827;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 0.75rem;
  line-height: 1.45;
}

.sb-log {
  margin-bottom: 0.35rem;
  padding: 0.2rem 0.35rem;
  border-radius: 0.2rem;
  border-left: 3px solid #6b7280;

  &[data-type='success'] {
    border-left-color: #10b981;
    background: rgba(16, 185, 129, 0.12);
  }

  &[data-type='error'] {
    border-left-color: #ef4444;
    background: rgba(239, 68, 68, 0.12);
  }

  &[data-type='info'] {
    border-left-color: #3b82f6;
    background: rgba(59, 130, 246, 0.12);
  }
}

.sb-log__time {
  color: #9ca3af;
  margin-right: 0.35rem;
}

.sb-log__msg {
  color: #e5e7eb;
  white-space: pre-wrap;
  word-break: break-word;
}

.sb-console-empty {
  color: #6b7280;
  font-style: italic;
  text-align: center;
  padding: 1.5rem 0.5rem;
}

/* Scrollable tab bodies */
.sb-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.55rem 0.65rem 0.65rem;
  box-sizing: border-box;
}

.sb-scroll--pad {
  padding-bottom: 1rem;
}

.sb-http-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.65rem;
}

.sb-block {
  margin-bottom: 0.75rem;

  &__title {
    margin: 0 0 0.35rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}

.sb-kv-row {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
  align-items: center;
}

.sb-input,
.sb-select,
.sb-textarea {
  padding: 0.45rem 0.55rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-family: inherit;
  color: #111827;
  background: #fff;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
}

.sb-input--grow {
  flex: 1 1 120px;
  min-width: 0;
}

.sb-input--block {
  width: 100%;
  margin-bottom: 0.35rem;
}

.sb-select {
  min-width: 5rem;
}

.sb-textarea--sm {
  width: 100%;
  min-height: 5rem;
  font-family: ui-monospace, Menlo, monospace;
  resize: vertical;
  max-height: 12rem;
}

.sb-response-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.35rem;
  flex-wrap: wrap;
}

.sb-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;

  &[data-kind='success'] {
    background: #d1fae5;
    color: #065f46;
  }

  &[data-kind='client-error'],
  &[data-kind='server-error'] {
    background: #fee2e2;
    color: #991b1b;
  }

  &[data-kind='info'] {
    background: #e0e7ff;
    color: #3730a3;
  }
}

.sb-muted {
  font-size: 0.75rem;
  color: #6b7280;
}

.sb-mt-xs {
  margin-top: 0.35rem;
}

.sb-pre {
  margin: 0;
  padding: 0.55rem 0.65rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  overflow: auto;
  max-height: min(40vh, 16rem);
  white-space: pre-wrap;
  word-break: break-word;
}

/* Storage */
.sb-storage {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.55rem 0.65rem;
  overflow: hidden;
}

.sb-storage__controls {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.sb-storage__list {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.sb-storage-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.35rem;
  background: #fafafa;
  font-size: 0.8125rem;
}

.sb-storage-item__key {
  font-weight: 600;
  color: #1d4ed8;
  flex: 0 0 7rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sb-storage-item__val {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, Menlo, monospace;
  color: #374151;
  word-break: break-all;
}

/* System grid */
.sb-info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sb-info-row {
  display: grid;
  grid-template-columns: minmax(6rem, 9rem) 1fr;
  gap: 0.5rem;
  align-items: start;
  padding: 0.45rem 0.55rem;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.8125rem;

  strong {
    color: #374151;
  }

  span {
    word-break: break-word;
    font-family: ui-monospace, Menlo, monospace;
    color: #111827;
  }
}

.sb-ok {
  color: #059669;
  font-weight: 600;
}

.sb-bad {
  color: #dc2626;
  font-weight: 600;
}

.sb-api-block {
  margin-bottom: 1rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fafafa;
}

.sb-btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.35rem;
}

.sb-api-result {
  margin-top: 0.4rem;
  padding: 0.4rem 0.5rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
  font-size: 0.8125rem;

  p {
    margin: 0.2rem 0;
  }
}

.sb-video {
  margin-top: 0.5rem;
  max-width: 100%;
  max-height: 12rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.sb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.65rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  color: #374151;
  transition: background 0.12s, border-color 0.12s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.sb-btn--sm {
  font-size: 0.75rem;
  padding: 0.3rem 0.5rem;
}

.sb-btn--xs {
  font-size: 0.6875rem;
  padding: 0.2rem 0.45rem;
}

.sb-btn--primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;

  &:hover:not(:disabled) {
    background: #1d4ed8;
    border-color: #1d4ed8;
  }
}

.sb-btn--danger {
  background: #ef4444;
  border-color: #ef4444;
  color: #fff;

  &:hover:not(:disabled) {
    background: #dc2626;
    border-color: #dc2626;
  }
}

.sb-btn--quiet {
  background: #f9fafb;
}

@media (max-width: 800px) {
  .sb-playground {
    flex-direction: column;
  }

  .sb-playground__editor {
    flex: 1 1 50%;
    min-height: 40%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .sb-playground__console {
    flex: 1 1 50%;
    min-height: 30%;
  }
}
</style>
