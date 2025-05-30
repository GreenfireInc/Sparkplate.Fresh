<template>
  <div class="sandbox-page">
    <div class="header-section">
      <h1>🧪 Sandbox</h1>
      <p>Experiment with APIs, test code snippets, and explore web technologies</p>
    </div>

    <div class="sandbox-grid">
      <!-- Code Editor Section -->
      <div class="sandbox-card">
        <h3>📝 Code Editor</h3>
        <div class="editor-container">
          <div class="editor-tabs">
            <button 
              v-for="tab in editorTabs" 
              :key="tab.id"
              :class="['tab', { active: activeEditorTab === tab.id }]"
              @click="activeEditorTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>
          <textarea 
            v-model="currentCode" 
            class="code-editor"
            placeholder="Enter your code here..."
            spellcheck="false"
          ></textarea>
          <div class="editor-actions">
            <button @click="runCode" class="run-btn">▶️ Run Code</button>
            <button @click="clearCode" class="clear-btn">🗑️ Clear</button>
            <button @click="formatCode" class="format-btn">✨ Format</button>
          </div>
        </div>
      </div>

      <!-- Output Console -->
      <div class="sandbox-card">
        <h3>📊 Output Console</h3>
        <div class="console-container">
          <div class="console-header">
            <span>Console Output</span>
            <button @click="clearConsole" class="clear-console-btn">Clear</button>
          </div>
          <div class="console-output" ref="consoleOutput">
            <div 
              v-for="(log, index) in consoleLogs" 
              :key="index"
              :class="['log-entry', log.type]"
            >
              <span class="log-timestamp">{{ log.timestamp }}</span>
              <span class="log-content">{{ log.message }}</span>
            </div>
            <div v-if="consoleLogs.length === 0" class="empty-console">
              Console output will appear here...
            </div>
          </div>
        </div>
      </div>

      <!-- API Testing -->
      <div class="sandbox-card">
        <h3>🌐 API Testing</h3>
        <div class="api-tester">
          <div class="api-controls">
            <select v-model="apiMethod" class="method-select">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input 
              v-model="apiUrl" 
              placeholder="Enter API URL..." 
              class="url-input"
            >
            <button @click="testApi" class="test-btn" :disabled="isApiLoading">
              {{ isApiLoading ? '⏳ Loading...' : '🚀 Send Request' }}
            </button>
          </div>
          
          <div class="api-headers">
            <h4>Headers</h4>
            <div class="header-row" v-for="(header, index) in apiHeaders" :key="index">
              <input v-model="header.key" placeholder="Header name" class="header-input">
              <input v-model="header.value" placeholder="Header value" class="header-input">
              <button @click="removeHeader(index)" class="remove-btn">✖️</button>
            </div>
            <button @click="addHeader" class="add-header-btn">+ Add Header</button>
          </div>

          <div class="api-body" v-if="apiMethod !== 'GET'">
            <h4>Request Body</h4>
            <textarea 
              v-model="apiBody" 
              placeholder="Enter JSON body..." 
              class="body-input"
            ></textarea>
          </div>

          <div class="api-response" v-if="apiResponse">
            <h4>Response</h4>
            <div class="response-info">
              <span :class="['status-code', getStatusClass(apiResponse.status)]">
                {{ apiResponse.status }} {{ apiResponse.statusText }}
              </span>
              <span class="response-time">{{ apiResponse.responseTime }}ms</span>
            </div>
            <pre class="response-body">{{ apiResponse.data }}</pre>
          </div>
        </div>
      </div>

      <!-- Local Storage Manager -->
      <div class="sandbox-card">
        <h3>💾 Local Storage Manager</h3>
        <div class="storage-manager">
          <div class="storage-controls">
            <input v-model="storageKey" placeholder="Key" class="storage-input">
            <input v-model="storageValue" placeholder="Value" class="storage-input">
            <button @click="setStorageItem" class="storage-btn">Set Item</button>
            <button @click="refreshStorage" class="storage-btn">Refresh</button>
            <button @click="clearAllStorage" class="storage-btn danger">Clear All</button>
          </div>
          
          <div class="storage-items">
            <div v-for="(value, key) in localStorageItems" :key="key" class="storage-item">
              <span class="storage-key">{{ key }}</span>
              <span class="storage-value">{{ truncateValue(value) }}</span>
              <button @click="removeStorageItem(key)" class="remove-storage-btn">🗑️</button>
            </div>
            <div v-if="Object.keys(localStorageItems).length === 0" class="empty-storage">
              No items in localStorage
            </div>
          </div>
        </div>
      </div>

      <!-- System Info -->
      <div class="sandbox-card">
        <h3>ℹ️ System Information</h3>
        <div class="system-info">
          <div class="info-grid">
            <div class="info-item">
              <strong>User Agent:</strong>
              <span>{{ systemInfo.userAgent }}</span>
            </div>
            <div class="info-item">
              <strong>Platform:</strong>
              <span>{{ systemInfo.platform }}</span>
            </div>
            <div class="info-item">
              <strong>Language:</strong>
              <span>{{ systemInfo.language }}</span>
            </div>
            <div class="info-item">
              <strong>Timezone:</strong>
              <span>{{ systemInfo.timezone }}</span>
            </div>
            <div class="info-item">
              <strong>Screen Resolution:</strong>
              <span>{{ systemInfo.screenResolution }}</span>
            </div>
            <div class="info-item">
              <strong>Viewport Size:</strong>
              <span>{{ systemInfo.viewportSize }}</span>
            </div>
            <div class="info-item">
              <strong>Online Status:</strong>
              <span :class="systemInfo.online ? 'online' : 'offline'">
                {{ systemInfo.online ? '🟢 Online' : '🔴 Offline' }}
              </span>
            </div>
            <div class="info-item">
              <strong>Memory Usage:</strong>
              <span>{{ systemInfo.memoryUsage }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Web APIs Testing -->
      <div class="sandbox-card">
        <h3>🔧 Web APIs</h3>
        <div class="web-apis">
          <div class="api-section">
            <h4>📍 Geolocation</h4>
            <button @click="getLocation" class="api-btn" :disabled="isGettingLocation">
              {{ isGettingLocation ? '⏳ Getting...' : '📍 Get Location' }}
            </button>
            <div v-if="locationData" class="api-result">
              <p><strong>Latitude:</strong> {{ locationData.latitude }}</p>
              <p><strong>Longitude:</strong> {{ locationData.longitude }}</p>
              <p><strong>Accuracy:</strong> {{ locationData.accuracy }}m</p>
            </div>
          </div>

          <div class="api-section">
            <h4>📋 Clipboard</h4>
            <input v-model="clipboardText" placeholder="Text to copy" class="clipboard-input">
            <button @click="copyToClipboard" class="api-btn">📋 Copy</button>
            <button @click="readFromClipboard" class="api-btn">📄 Read</button>
            <div v-if="clipboardResult" class="api-result">
              {{ clipboardResult }}
            </div>
          </div>

          <div class="api-section">
            <h4>🔔 Notifications</h4>
            <input v-model="notificationText" placeholder="Notification message" class="notification-input">
            <button @click="showNotification" class="api-btn">🔔 Show Notification</button>
            <div class="api-result">
              <p><strong>Permission:</strong> {{ notificationPermission }}</p>
            </div>
          </div>

          <div class="api-section">
            <h4>🎤 Media</h4>
            <button @click="accessCamera" class="api-btn" :disabled="isAccessingMedia">
              {{ isAccessingMedia ? '⏳ Accessing...' : '📷 Access Camera' }}
            </button>
            <button @click="accessMicrophone" class="api-btn" :disabled="isAccessingMedia">
              {{ isAccessingMedia ? '⏳ Accessing...' : '🎤 Access Microphone' }}
            </button>
            <video v-if="mediaStream" ref="videoElement" autoplay muted class="media-preview"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from 'vue'

// Code Editor
const editorTabs = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' }
]

const activeEditorTab = ref('javascript')
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
}`
})

const currentCode = computed({
  get: () => codeSnippets[activeEditorTab.value as keyof typeof codeSnippets],
  set: (value: string) => {
    codeSnippets[activeEditorTab.value as keyof typeof codeSnippets] = value
  }
})

// Console
const consoleLogs = ref<Array<{ type: string; message: string; timestamp: string }>>([])
const consoleOutput = ref<HTMLElement>()

const addLog = (message: string, type: string = 'info') => {
  const timestamp = new Date().toLocaleTimeString()
  consoleLogs.value.push({ type, message, timestamp })
  nextTick(() => {
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
    addLog(`Running ${activeEditorTab.value} code...`, 'info')
    
    if (activeEditorTab.value === 'javascript') {
      // Create a safe execution environment
      const originalConsoleLog = console.log
      const logs: string[] = []
      
      console.log = (...args: any[]) => {
        logs.push(args.map(arg => String(arg)).join(' '))
        originalConsoleLog(...args)
      }
      
      // Execute the code
      new Function(currentCode.value)()
      
      // Restore console.log
      console.log = originalConsoleLog
      
      // Display captured logs
      logs.forEach(log => addLog(log, 'success'))
      
    } else if (activeEditorTab.value === 'json') {
      const parsed = JSON.parse(currentCode.value)
      addLog(`JSON is valid: ${JSON.stringify(parsed, null, 2)}`, 'success')
    } else {
      addLog(`${activeEditorTab.value.toUpperCase()} code formatted successfully`, 'success')
    }
  } catch (error: any) {
    addLog(`Error: ${error.message}`, 'error')
  }
}

const clearCode = () => {
  codeSnippets[activeEditorTab.value as keyof typeof codeSnippets] = ''
}

const formatCode = () => {
  try {
    if (activeEditorTab.value === 'json') {
      const parsed = JSON.parse(currentCode.value)
      currentCode.value = JSON.stringify(parsed, null, 2)
      addLog('JSON formatted successfully', 'success')
    } else {
      addLog('Code formatting is available for JSON', 'info')
    }
  } catch (error: any) {
    addLog(`Format error: ${error.message}`, 'error')
  }
}

// API Testing
const apiMethod = ref('GET')
const apiUrl = ref('https://jsonplaceholder.typicode.com/posts/1')
const apiHeaders = ref([{ key: 'Content-Type', value: 'application/json' }])
const apiBody = ref('{}')
const apiResponse = ref<any>(null)
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
    apiHeaders.value.forEach(header => {
      if (header.key && header.value) {
        headers[header.key] = header.value
      }
    })
    
    const options: RequestInit = {
      method: apiMethod.value,
      headers
    }
    
    if (apiMethod.value !== 'GET' && apiBody.value) {
      options.body = apiBody.value
    }
    
    const response = await fetch(apiUrl.value, options)
    const responseTime = Date.now() - startTime
    
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
    
    apiResponse.value = {
      status: response.status,
      statusText: response.statusText,
      data: typeof data === 'object' ? JSON.stringify(data, null, 2) : data,
      responseTime
    }
    
    addLog(`API request completed: ${response.status} in ${responseTime}ms`, 'success')
    
  } catch (error: any) {
    addLog(`API request failed: ${error.message}`, 'error')
    apiResponse.value = {
      status: 0,
      statusText: 'Error',
      data: error.message,
      responseTime: Date.now() - startTime
    }
  } finally {
    isApiLoading.value = false
  }
}

// Local Storage
const storageKey = ref('')
const storageValue = ref('')
const localStorageItems = ref<Record<string, string>>({})

const refreshStorage = () => {
  const items: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      items[key] = localStorage.getItem(key) || ''
    }
  }
  localStorageItems.value = items
}

const setStorageItem = () => {
  if (storageKey.value) {
    localStorage.setItem(storageKey.value, storageValue.value)
    refreshStorage()
    addLog(`Storage item set: ${storageKey.value}`, 'success')
    storageKey.value = ''
    storageValue.value = ''
  }
}

const removeStorageItem = (key: string) => {
  localStorage.removeItem(key)
  refreshStorage()
  addLog(`Storage item removed: ${key}`, 'info')
}

const clearAllStorage = () => {
  localStorage.clear()
  refreshStorage()
  addLog('All storage items cleared', 'info')
}

const truncateValue = (value: string) => {
  return value.length > 50 ? value.substring(0, 50) + '...' : value
}

// System Info
const systemInfo = reactive({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screenResolution: `${screen.width}x${screen.height}`,
  viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  online: navigator.onLine,
  memoryUsage: 'N/A'
})

// Web APIs
const locationData = ref<any>(null)
const isGettingLocation = ref(false)
const clipboardText = ref('Hello from Sandbox!')
const clipboardResult = ref('')
const notificationText = ref('Test notification from Sandbox')
const notificationPermission = ref(Notification.permission)
const mediaStream = ref<MediaStream | null>(null)
const isAccessingMedia = ref(false)
const videoElement = ref<HTMLVideoElement>()

const getLocation = () => {
  if (!navigator.geolocation) {
    addLog('Geolocation is not supported', 'error')
    return
  }
  
  isGettingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationData.value = {
        latitude: position.coords.latitude.toFixed(6),
        longitude: position.coords.longitude.toFixed(6),
        accuracy: position.coords.accuracy.toFixed(0)
      }
      addLog('Location retrieved successfully', 'success')
      isGettingLocation.value = false
    },
    (error) => {
      addLog(`Location error: ${error.message}`, 'error')
      isGettingLocation.value = false
    }
  )
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(clipboardText.value)
    clipboardResult.value = 'Text copied to clipboard!'
    addLog('Text copied to clipboard', 'success')
  } catch (error: any) {
    clipboardResult.value = `Copy failed: ${error.message}`
    addLog(`Copy failed: ${error.message}`, 'error')
  }
}

const readFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    clipboardResult.value = `Clipboard contains: "${text}"`
    addLog('Clipboard read successfully', 'success')
  } catch (error: any) {
    clipboardResult.value = `Read failed: ${error.message}`
    addLog(`Clipboard read failed: ${error.message}`, 'error')
  }
}

const showNotification = async () => {
  if (Notification.permission === 'granted') {
    new Notification('Sandbox Notification', {
      body: notificationText.value,
      icon: '/favicon.ico'
    })
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
    addLog('Notifications are blocked', 'error')
  }
}

const accessCamera = async () => {
  isAccessingMedia.value = true
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    mediaStream.value = stream
    if (videoElement.value) {
      videoElement.value.srcObject = stream
    }
    addLog('Camera access granted', 'success')
  } catch (error: any) {
    addLog(`Camera access failed: ${error.message}`, 'error')
  } finally {
    isAccessingMedia.value = false
  }
}

const accessMicrophone = async () => {
  isAccessingMedia.value = true
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStream.value = stream
    addLog('Microphone access granted', 'success')
  } catch (error: any) {
    addLog(`Microphone access failed: ${error.message}`, 'error')
  } finally {
    isAccessingMedia.value = false
  }
}

// Update system info
const updateSystemInfo = () => {
  systemInfo.viewportSize = `${window.innerWidth}x${window.innerHeight}`
  systemInfo.online = navigator.onLine
  
  // @ts-ignore - performance.memory might not be available in all browsers
  if (performance.memory) {
    // @ts-ignore
    const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
    // @ts-ignore
    const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
    systemInfo.memoryUsage = `${used}MB / ${total}MB`
  }
}

onMounted(() => {
  refreshStorage()
  updateSystemInfo()
  
  // Update online status
  window.addEventListener('online', updateSystemInfo)
  window.addEventListener('offline', updateSystemInfo)
  window.addEventListener('resize', updateSystemInfo)
  
  addLog('Sandbox initialized successfully', 'success')
})
</script>

<style scoped lang="scss">
.sandbox-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ffd700, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.sandbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.sandbox-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    color: #ffd700;
  }
}

// Code Editor
.editor-container {
  .editor-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .tab {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: rgba(255, 215, 0, 0.3);
        color: #ffd700;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  .code-editor {
    width: 100%;
    height: 200px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 1rem;
    color: white;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    resize: vertical;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  .editor-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      
      &.run-btn {
        background: #4CAF50;
        color: white;
      }
      
      &.clear-btn {
        background: #f44336;
        color: white;
      }
      
      &.format-btn {
        background: #2196F3;
        color: white;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

// Console
.console-container {
  .console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    
    .clear-console-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      background: #f44336;
      color: white;
      cursor: pointer;
      font-size: 0.8rem;
    }
  }
  
  .console-output {
    height: 200px;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    
    .log-entry {
      margin-bottom: 0.5rem;
      padding: 0.25rem;
      border-radius: 4px;
      
      &.success {
        background: rgba(76, 175, 80, 0.2);
        border-left: 3px solid #4CAF50;
      }
      
      &.error {
        background: rgba(244, 67, 54, 0.2);
        border-left: 3px solid #f44336;
      }
      
      &.info {
        background: rgba(33, 150, 243, 0.2);
        border-left: 3px solid #2196F3;
      }
      
      .log-timestamp {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.8rem;
        margin-right: 0.5rem;
      }
    }
    
    .empty-console {
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      text-align: center;
      padding: 2rem;
    }
  }
}

// API Testing
.api-tester {
  .api-controls {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .method-select {
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      width: 100px;
    }
    
    .url-input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .test-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #4CAF50;
      color: white;
      cursor: pointer;
      
      &:disabled {
        background: rgba(76, 175, 80, 0.5);
        cursor: not-allowed;
      }
    }
  }
  
  .api-headers {
    margin-bottom: 1rem;
    
    h4 {
      margin-bottom: 0.5rem;
      color: #ffd700;
    }
    
    .header-row {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      
      .header-input {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
      
      .remove-btn {
        padding: 0.5rem;
        border: none;
        border-radius: 6px;
        background: #f44336;
        color: white;
        cursor: pointer;
        width: 40px;
      }
    }
    
    .add-header-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #2196F3;
      color: white;
      cursor: pointer;
    }
  }
  
  .api-body {
    margin-bottom: 1rem;
    
    h4 {
      margin-bottom: 0.5rem;
      color: #ffd700;
    }
    
    .body-input {
      width: 100%;
      height: 100px;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-family: 'Courier New', monospace;
      resize: vertical;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  
  .api-response {
    h4 {
      margin-bottom: 0.5rem;
      color: #ffd700;
    }
    
    .response-info {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      
      .status-code {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: bold;
        
        &.success {
          background: rgba(76, 175, 80, 0.3);
          color: #4CAF50;
        }
        
        &.client-error,
        &.server-error {
          background: rgba(244, 67, 54, 0.3);
          color: #f44336;
        }
        
        &.info {
          background: rgba(33, 150, 243, 0.3);
          color: #2196F3;
        }
      }
      
      .response-time {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    
    .response-body {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 6px;
      max-height: 200px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      white-space: pre-wrap;
    }
  }
}

// Storage Manager
.storage-manager {
  .storage-controls {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .storage-input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .storage-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      
      &:not(.danger) {
        background: #2196F3;
      }
      
      &.danger {
        background: #f44336;
      }
    }
  }
  
  .storage-items {
    .storage-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      margin-bottom: 0.5rem;
      
      .storage-key {
        font-weight: bold;
        color: #ffd700;
        min-width: 100px;
      }
      
      .storage-value {
        flex: 1;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
      }
      
      .remove-storage-btn {
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 4px;
        background: #f44336;
        color: white;
        cursor: pointer;
      }
    }
    
    .empty-storage {
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      padding: 2rem;
    }
  }
}

// System Info
.system-info {
  .info-grid {
    display: grid;
    gap: 1rem;
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      
      strong {
        color: #ffd700;
      }
      
      span {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        
        &.online {
          color: #4CAF50;
        }
        
        &.offline {
          color: #f44336;
        }
      }
    }
  }
}

// Web APIs
.web-apis {
  .api-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    
    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #ffd700;
    }
    
    .api-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #2196F3;
      color: white;
      cursor: pointer;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      
      &:disabled {
        background: rgba(33, 150, 243, 0.5);
        cursor: not-allowed;
      }
    }
    
    .clipboard-input,
    .notification-input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      margin-bottom: 0.5rem;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .api-result {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      
      p {
        margin: 0.25rem 0;
      }
    }
    
    .media-preview {
      width: 100%;
      max-width: 300px;
      height: auto;
      border-radius: 6px;
      margin-top: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .sandbox-grid {
    grid-template-columns: 1fr;
  }
  
  .api-controls,
  .storage-controls {
    flex-direction: column;
  }
  
  .header-row {
    flex-direction: column;
  }
}
</style> 