import { ref, nextTick, type ComputedRef } from 'vue'
import { AiLLMProviders } from '@/lib/cores/aiLLMCore'
import type { LlmProviderMeta } from '@/lib/cores/aiLLMCore'

// ── Types ───────────────────────────────────────────────────────────────────

export type LogLevel = 'info' | 'request' | 'success' | 'error' | 'warn'

export interface LogEntry {
  id: number
  ts: string
  level: LogLevel
  msg: string
}

export interface PingConfig {
  url: string
  headers: Record<string, string>
  label: string
  endpoint: string
}

interface LlmEntityContext {
  id: string
  name: string
}

interface KeySlot {
  readonly storageKey: string
  readonly label: string
}

interface FormDataContext {
  values: Record<string, string>
  enabled: Record<string, boolean>
}

// ── Ping config — derived from aiLLMCore metadata ───────────────────────────

// Flat id → meta lookup built from the single source of truth
const LLM_META_MAP = Object.values(AiLLMProviders).reduce<Record<string, LlmProviderMeta>>(
  (acc, m) => { acc[m.id] = m; return acc },
  {},
)

// Auth header overrides for providers that deviate from a plain Bearer token.
// Gemini uses a query-param key (no Authorization header); Claude uses x-api-key.
const AUTH_HEADER_OVERRIDES: Record<string, (key: string) => Record<string, string>> = {
  claude: (key) => ({ 'x-api-key': key, 'anthropic-version': '2023-06-01' }),
  gemini: ()    => ({}),
}

function findModelsEndpoint(meta: LlmProviderMeta): { path: string; name: string } | null {
  // Prefer a GET endpoint whose name or path contains "model"
  const ep = meta.apiEndpoints.find(
    (e) => e.method === 'GET' && /model/i.test(e.name + e.path),
  )
  // Fall back to any GET endpoint (e.g. Manus has no /models route)
  return ep ?? meta.apiEndpoints.find((e) => e.method === 'GET') ?? null
}

export function buildPingConfig(id: string, apiKey: string): PingConfig | null {
  const meta = LLM_META_MAP[id]
  if (!meta) return null

  const ep = findModelsEndpoint(meta)
  if (!ep) return null

  // Gemini requires the key as a query param instead of an Authorization header
  const url = id === 'gemini'
    ? `${meta.apiBaseUrl}${ep.path}?key=${apiKey}`
    : `${meta.apiBaseUrl}${ep.path}`

  const headers = AUTH_HEADER_OVERRIDES[id]
    ? AUTH_HEADER_OVERRIDES[id](apiKey)
    : { Authorization: `Bearer ${apiKey}` }

  return { url, headers, label: meta.name, endpoint: `GET ${ep.path}` }
}

// ── Composable ───────────────────────────────────────────────────────────────

export function useLlmConsole(
  entity: ComputedRef<LlmEntityContext | null>,
  apiKeySlots: readonly KeySlot[],
  formData: FormDataContext,
) {
  const consoleOpen     = ref(false)
  const pinging         = ref(false)
  const consoleLogs     = ref<LogEntry[]>([])
  const consoleScrollEl = ref<HTMLElement | null>(null)
  let _logId = 0

  function timestamp(): string {
    return new Date().toLocaleTimeString('en-US', { hour12: false })
  }

  function addLog(level: LogLevel, msg: string): void {
    consoleLogs.value.push({ id: _logId++, ts: timestamp(), level, msg })
    nextTick(() => {
      if (consoleScrollEl.value)
        consoleScrollEl.value.scrollTop = consoleScrollEl.value.scrollHeight
    })
  }

  function maskKey(key: string): string {
    return key.length <= 8 ? '••••••••' : '••••' + key.slice(-4)
  }

  async function testPing(): Promise<void> {
    const e = entity.value
    if (!e || pinging.value) return

    const activeSlot = apiKeySlots.find(
      (s) => formData.enabled[s.storageKey] && formData.values[s.storageKey],
    )

    if (!activeSlot) {
      consoleOpen.value = true
      consoleLogs.value = []
      addLog('warn', 'No enabled API key found. Enable and fill at least apiKey.1.')
      return
    }

    const apiKey = formData.values[activeSlot.storageKey]
    const config = buildPingConfig(e.id, apiKey)

    consoleOpen.value = true
    consoleLogs.value = []
    pinging.value = true

    addLog('info',    `Provider : ${e.name}`)
    addLog('info',    `Key slot : ${activeSlot.label}  (${maskKey(apiKey)})`)
    addLog('info',    `Endpoint : ${config?.endpoint ?? 'unknown'}`)
    addLog('request', `→ ${config?.url ?? '—'}`)

    if (!config) {
      addLog('error', 'No ping configuration found for this provider.')
      pinging.value = false
      return
    }

    const start = Date.now()
    try {
      const res = await fetch(config.url, { method: 'GET', headers: config.headers })
      const elapsed = Date.now() - start
      addLog('info', `← HTTP ${res.status} ${res.statusText}  (${elapsed} ms)`)

      if (res.ok) {
        let body: unknown
        try { body = await res.json() } catch { body = null }

        const dataArr   = (body as { data?: unknown[] })?.data
        const modelsArr = (body as { models?: unknown[] })?.models
        const count = Array.isArray(dataArr)
          ? dataArr.length
          : Array.isArray(modelsArr)
            ? modelsArr.length
            : null

        addLog(
          'success',
          count !== null
            ? `✓ Auth valid — ${count} model${count !== 1 ? 's' : ''} available`
            : `✓ Auth valid — key accepted`,
        )
      } else {
        let errMsg = ''
        try {
          const errBody = (await res.json()) as { error?: { message?: string }; message?: string }
          errMsg = errBody?.error?.message ?? errBody?.message ?? ''
        } catch { /* noop */ }
        addLog('error', `✗ ${res.status} ${res.statusText}${errMsg ? ` — ${errMsg}` : ''}`)
      }
    } catch (err: unknown) {
      const elapsed = Date.now() - start
      const msg = err instanceof Error ? err.message : String(err)
      addLog('error', `✗ Network error (${elapsed} ms) — ${msg}`)
    } finally {
      pinging.value = false
    }
  }

  return { consoleOpen, pinging, consoleLogs, consoleScrollEl, timestamp, testPing }
}
