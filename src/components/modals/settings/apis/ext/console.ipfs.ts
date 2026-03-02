import { ref, nextTick, type ComputedRef } from 'vue'
import { IpfsProviders } from '@/lib/cores/ipfsCore'
import type { IpfsProviderMeta } from '@/lib/cores/ipfsCore'

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
  method: 'GET' | 'POST'
  headers: Record<string, string>
  label: string
  endpoint: string
}

interface IpfsEntityContext {
  id: string
  name: string
  needsSecret: boolean
}

interface FormDataContext {
  apiKey: string
  apiSecret: string
}

// ── Provider lookup ──────────────────────────────────────────────────────────

const IPFS_META_MAP = Object.values(IpfsProviders).reduce<Record<string, IpfsProviderMeta>>(
  (acc, m) => { acc[m.id] = m; return acc },
  {},
)

// ── Auth header overrides ────────────────────────────────────────────────────
// Providers that deviate from a plain `Authorization: Bearer {key}` header.
// Infura and Filebase use HTTP Basic with key:secret.
// Crust encodes key:secret as Base64 inside a Bearer token.

const AUTH_HEADER_OVERRIDES: Record<string, (key: string, secret: string) => Record<string, string>> = {
  infura:   (k, s) => ({ Authorization: `Basic ${btoa(`${k}:${s}`)}` }),
  filebase: (k, s) => ({ Authorization: `Basic ${btoa(`${k}:${s}`)}` }),
  crust:    (k, s) => s
    ? { Authorization: `Bearer ${btoa(`${k}:${s}`)}` }
    : { Authorization: `Bearer ${k}` },
}

// ── Endpoint overrides ───────────────────────────────────────────────────────
// Providers with a dedicated auth-test endpoint, or whose public-facing auth
// endpoint lives at a different base URL than apiBaseUrl in the metadata.

const AUTH_ENDPOINT_OVERRIDES: Record<string, { url: string; method: 'GET' | 'POST'; label: string }> = {
  // Pinata exposes a dedicated authentication-test endpoint.
  pinata: {
    url:    'https://api.pinata.cloud/data/testAuthentication',
    method: 'GET',
    label:  'GET /data/testAuthentication',
  },
  // Lighthouse's account/file endpoints live on a separate subdomain.
  lighthouse: {
    url:    'https://api.lighthouse.storage/api/v0/files?pageNo=1',
    method: 'GET',
    label:  'GET /api/v0/files',
  },
  // NFT.Storage's user-uploads list is the simplest authenticated GET.
  nftstorage: {
    url:    'https://api.nft.storage/user/uploads?size=1',
    method: 'GET',
    label:  'GET /user/uploads',
  },
  // Storacha (web3.storage) user-info endpoint.
  storacha: {
    url:    'https://up.web3.storage/user',
    method: 'GET',
    label:  'GET /user',
  },
}

// ── Endpoint discovery ───────────────────────────────────────────────────────
// Prefer a GET endpoint whose name/path hints at authentication, user, or
// status information.  Falls back to the first GET endpoint, then any endpoint.

function findAuthEndpoint(
  meta: IpfsProviderMeta,
): { path: string; method: 'GET' | 'POST' } | null {
  const candidates = meta.apiEndpoints
  const preferred = candidates.find(
    (e) =>
      (e.method === 'GET' || !e.method) &&
      /auth|user|status|list|info/i.test(e.name + e.path),
  )
  const anyGet = candidates.find((e) => e.method === 'GET' || !e.method)
  const fallback = candidates[0] ?? null
  const ep = preferred ?? anyGet ?? fallback
  if (!ep) return null
  return { path: ep.path, method: (ep.method as 'GET' | 'POST') ?? 'GET' }
}

export function buildPingConfig(
  id: string,
  apiKey: string,
  apiSecret: string,
): PingConfig | null {
  const meta = IPFS_META_MAP[id]
  if (!meta) return null

  // Resolve URL + method
  const override = AUTH_ENDPOINT_OVERRIDES[id]
  let url: string
  let method: 'GET' | 'POST'
  let endpointLabel: string

  if (override) {
    url           = override.url
    method        = override.method
    endpointLabel = override.label
  } else {
    const ep = findAuthEndpoint(meta)
    if (!ep) return null
    url           = `${meta.apiBaseUrl}${ep.path}`
    method        = ep.method
    endpointLabel = `${ep.method} ${ep.path}`
  }

  // Resolve auth headers
  const headers = AUTH_HEADER_OVERRIDES[id]
    ? AUTH_HEADER_OVERRIDES[id](apiKey, apiSecret)
    : { Authorization: `Bearer ${apiKey}` }

  return { url, method, headers, label: meta.name, endpoint: endpointLabel }
}

// ── Composable ───────────────────────────────────────────────────────────────

export function useIpfsConsole(
  entity: ComputedRef<IpfsEntityContext | null>,
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

    const apiKey    = formData.apiKey
    const apiSecret = formData.apiSecret

    if (!apiKey) {
      consoleOpen.value = true
      consoleLogs.value = []
      addLog('warn', `No API key found. Enter ${e.needsSecret ? 'a key and secret' : 'a key'} before testing.`)
      return
    }

    if (e.needsSecret && !apiSecret) {
      consoleOpen.value = true
      consoleLogs.value = []
      addLog('warn', `${e.name} requires both an API key and secret. Please fill in both fields.`)
      return
    }

    const config = buildPingConfig(e.id, apiKey, apiSecret)

    consoleOpen.value = true
    consoleLogs.value = []
    pinging.value     = true

    addLog('info',    `Provider : ${e.name}`)
    addLog('info',    `API Key  : ${maskKey(apiKey)}`)
    if (apiSecret) addLog('info', `Secret   : ${maskKey(apiSecret)}`)
    addLog('info',    `Endpoint : ${config?.endpoint ?? 'unknown'}`)
    addLog('request', `→ ${config?.url ?? '—'}`)

    if (!config) {
      addLog('error', 'No ping configuration found for this provider.')
      pinging.value = false
      return
    }

    const start = Date.now()
    try {
      const res = await fetch(config.url, { method: config.method, headers: config.headers })
      const elapsed = Date.now() - start
      addLog('info', `← HTTP ${res.status} ${res.statusText}  (${elapsed} ms)`)

      if (res.ok) {
        let body: unknown
        try { body = await res.json() } catch { body = null }

        // Pinata testAuthentication returns { message: 'Congratulations! You are communicating with the Pinata API!' }
        const msg = (body as { message?: string })?.message
        addLog(
          'success',
          msg ? `✓ Auth valid — ${msg}` : `✓ Auth valid — key accepted by ${e.name}`,
        )
      } else {
        let errMsg = ''
        try {
          const errBody = await res.json() as { error?: string | { details?: string }; message?: string }
          const errField = errBody?.error
          errMsg = typeof errField === 'string'
            ? errField
            : (errField as { details?: string })?.details ?? errBody?.message ?? ''
        } catch { /* non-JSON body */ }
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
