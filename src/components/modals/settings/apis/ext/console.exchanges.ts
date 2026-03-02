import { ref, nextTick, type ComputedRef } from 'vue'

// ── Types ───────────────────────────────────────────────────────────────────

export type LogLevel = 'info' | 'request' | 'success' | 'error' | 'warn'

export interface LogEntry {
  id: number
  ts: string
  level: LogLevel
  msg: string
}

export interface ExchangePingConfig {
  url: string
  method: 'GET' | 'POST'
  headers: Record<string, string>
  exchange: string
  endpoint: string
  requiresHmac: boolean
}

interface ExchangeEntityContext {
  id: string
  name: string
}

interface FormDataContext {
  apiKey: string
  apiSecret: string
}

// ── Per-exchange ping configurations ────────────────────────────────────────
//
// Each entry defines:
//   baseUrl     – REST base URL for the exchange
//   authPath    – authenticated endpoint to hit (GET where possible)
//   authHeader  – function returning the auth headers for a given apiKey
//   requiresHmac – true if a valid response requires an HMAC-signed payload;
//                  a 4xx "invalid signature" response still confirms the key
//                  was received, whereas "invalid key" means the key itself
//                  is wrong.
//   publicPath  – a no-auth GET endpoint used for connectivity check

interface ExchangeMeta {
  name: string
  baseUrl: string
  authPath: string
  authMethod: 'GET' | 'POST'
  authHeader: (key: string) => Record<string, string>
  requiresHmac: boolean
  publicPath: string
}

const EXCHANGE_META: Record<string, ExchangeMeta> = {
  binance: {
    name: 'Binance',
    baseUrl: 'https://api.binance.com',
    authPath: '/api/v3/account',
    authMethod: 'GET',
    authHeader: (k) => ({ 'X-MBX-APIKEY': k }),
    requiresHmac: true,
    publicPath: '/api/v3/ping',
  },
  bitfinex: {
    name: 'Bitfinex',
    baseUrl: 'https://api-pub.bitfinex.com',
    authPath: '/v2/auth/r/wallets',
    authMethod: 'POST',
    authHeader: (k) => ({ 'bfx-apikey': k }),
    requiresHmac: true,
    publicPath: '/v2/platform/status',
  },
  bitflyer: {
    name: 'bitFlyer',
    baseUrl: 'https://api.bitflyer.com',
    authPath: '/v1/me/getbalance',
    authMethod: 'GET',
    authHeader: (k) => ({ 'ACCESS-KEY': k }),
    requiresHmac: true,
    publicPath: '/v1/getmarkets',
  },
  bitget: {
    name: 'Bitget',
    baseUrl: 'https://api.bitget.com',
    authPath: '/api/v2/account/info',
    authMethod: 'GET',
    authHeader: (k) => ({ 'ACCESS-KEY': k }),
    requiresHmac: true,
    publicPath: '/api/v2/public/time',
  },
  bitstamp: {
    name: 'Bitstamp',
    baseUrl: 'https://www.bitstamp.net',
    authPath: '/api/v2/balance/',
    authMethod: 'POST',
    authHeader: (k) => ({ 'X-Auth': `BITSTAMP ${k}` }),
    requiresHmac: true,
    publicPath: '/api/v2/ticker/btcusd/',
  },
  bybit: {
    name: 'Bybit',
    baseUrl: 'https://api.bybit.com',
    authPath: '/v5/account/wallet-balance?accountType=UNIFIED',
    authMethod: 'GET',
    authHeader: (k) => ({ 'X-BAPI-API-KEY': k }),
    requiresHmac: true,
    publicPath: '/v5/market/time',
  },
  coinbase: {
    name: 'Coinbase',
    baseUrl: 'https://api.coinbase.com',
    authPath: '/api/v3/brokerage/accounts',
    authMethod: 'GET',
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
    requiresHmac: false,
    publicPath: '/api/v3/brokerage/market/products?limit=1',
  },
  gateio: {
    name: 'Gate.io',
    baseUrl: 'https://api.gateio.ws',
    authPath: '/api/v4/spot/accounts',
    authMethod: 'GET',
    authHeader: (k) => ({ KEY: k }),
    requiresHmac: true,
    publicPath: '/api/v4/spot/currencies?limit=1',
  },
  gemini: {
    name: 'Gemini',
    baseUrl: 'https://api.gemini.com',
    authPath: '/v1/balances',
    authMethod: 'POST',
    authHeader: (k) => ({ 'X-GEMINI-APIKEY': k }),
    requiresHmac: true,
    publicPath: '/v1/symbols',
  },
  huobi: {
    name: 'HTX (Huobi)',
    baseUrl: 'https://api.huobi.pro',
    authPath: '/v1/account/accounts',
    authMethod: 'GET',
    authHeader: (k) => ({ AccessKeyId: k }),
    requiresHmac: true,
    publicPath: '/v1/common/timestamp',
  },
  kraken: {
    name: 'Kraken',
    baseUrl: 'https://api.kraken.com',
    authPath: '/0/private/Balance',
    authMethod: 'POST',
    authHeader: (k) => ({ 'API-Key': k }),
    requiresHmac: true,
    publicPath: '/0/public/Time',
  },
  kucoin: {
    name: 'KuCoin',
    baseUrl: 'https://api.kucoin.com',
    authPath: '/api/v1/accounts',
    authMethod: 'GET',
    authHeader: (k) => ({ 'KC-API-KEY': k }),
    requiresHmac: true,
    publicPath: '/api/v1/timestamp',
  },
  mexc: {
    name: 'MEXC',
    baseUrl: 'https://api.mexc.com',
    authPath: '/api/v3/account',
    authMethod: 'GET',
    authHeader: (k) => ({ 'X-MEXC-APIKEY': k }),
    requiresHmac: true,
    publicPath: '/api/v3/ping',
  },
  okx: {
    name: 'OKX',
    baseUrl: 'https://www.okx.com',
    authPath: '/api/v5/account/balance',
    authMethod: 'GET',
    authHeader: (k) => ({ 'OK-ACCESS-KEY': k }),
    requiresHmac: true,
    publicPath: '/api/v5/public/time',
  },
  upbit: {
    name: 'Upbit',
    baseUrl: 'https://api.upbit.com',
    authPath: '/v1/accounts',
    authMethod: 'GET',
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
    requiresHmac: false,
    publicPath: '/v1/market/all?isDetails=false',
  },
}

export function buildPingConfig(id: string, apiKey: string): ExchangePingConfig | null {
  const meta = EXCHANGE_META[id]
  if (!meta) return null

  return {
    url: `${meta.baseUrl}${meta.authPath}`,
    method: meta.authMethod,
    headers: meta.authHeader(apiKey),
    exchange: meta.name,
    endpoint: `${meta.authMethod} ${meta.authPath}`,
    requiresHmac: meta.requiresHmac,
  }
}

export function buildPublicPingConfig(id: string): { url: string; endpoint: string } | null {
  const meta = EXCHANGE_META[id]
  if (!meta) return null
  return {
    url: `${meta.baseUrl}${meta.publicPath}`,
    endpoint: `GET ${meta.publicPath}`,
  }
}

// ── Composable ───────────────────────────────────────────────────────────────

export function useExchangeConsole(
  entity: ComputedRef<ExchangeEntityContext | null>,
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

    const apiKey = formData.apiKey

    if (!apiKey) {
      consoleOpen.value = true
      consoleLogs.value = []
      addLog('warn', 'No API key found. Enter an API key before testing.')
      return
    }

    const config      = buildPingConfig(e.id, apiKey)
    const publicProbe = buildPublicPingConfig(e.id)

    consoleOpen.value = true
    consoleLogs.value = []
    pinging.value     = true

    addLog('info', `Exchange : ${e.name}`)
    addLog('info', `API Key  : ${maskKey(apiKey)}`)
    if (formData.apiSecret) addLog('info', `Secret   : ${maskKey(formData.apiSecret)}`)

    // ── Phase 1: connectivity via public endpoint ──────────────────────────
    if (publicProbe) {
      addLog('info',    `Phase 1  : connectivity check`)
      addLog('request', `→ GET ${publicProbe.url}`)
      const t0 = Date.now()
      try {
        const res = await fetch(publicProbe.url, { method: 'GET' })
        addLog('info', `← HTTP ${res.status} ${res.statusText}  (${Date.now() - t0} ms)`)
        if (!res.ok) {
          addLog('warn', `Connectivity check returned non-OK status — proceeding to auth test anyway.`)
        } else {
          addLog('success', `✓ Exchange reachable`)
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        addLog('error', `✗ Network error (${Date.now() - t0} ms) — ${msg}`)
        pinging.value = false
        return
      }
    }

    if (!config) {
      addLog('error', 'No ping configuration found for this exchange.')
      pinging.value = false
      return
    }

    // ── Phase 2: auth key probe ────────────────────────────────────────────
    addLog('info',    `Phase 2  : auth key probe`)
    if (config.requiresHmac) {
      addLog('warn', `Note: ${e.name} requires HMAC signing. A 4xx "invalid signature" response confirms the key was received; "invalid key" means the key itself is wrong.`)
    }
    addLog('info',    `Endpoint : ${config.endpoint}`)
    addLog('request', `→ ${config.url}`)

    const t1 = Date.now()
    try {
      const res = await fetch(config.url, { method: config.method, headers: config.headers })
      const elapsed = Date.now() - t1
      addLog('info', `← HTTP ${res.status} ${res.statusText}  (${elapsed} ms)`)

      let errMsg = ''
      try {
        const body = await res.json() as unknown
        const b = body as { msg?: string; message?: string; error?: string | string[]; errors?: string[] }
        errMsg = b?.msg ?? b?.message ?? (Array.isArray(b?.error) ? b.error[0] : b?.error) ?? ''
      } catch { /* non-JSON body */ }

      if (res.ok) {
        addLog('success', `✓ Auth valid — key accepted by ${e.name}`)
      } else if (res.status === 401 || res.status === 403) {
        addLog('error', `✗ ${res.status} Unauthorized${errMsg ? ` — ${errMsg}` : ''}`)
      } else if (res.status === 400) {
        if (config.requiresHmac) {
          addLog('warn', `⚠ 400 Bad Request${errMsg ? ` — ${errMsg}` : ''} (likely missing HMAC signature — key header was accepted)`)
        } else {
          addLog('error', `✗ 400 Bad Request${errMsg ? ` — ${errMsg}` : ''}`)
        }
      } else {
        addLog('error', `✗ ${res.status} ${res.statusText}${errMsg ? ` — ${errMsg}` : ''}`)
      }
    } catch (err: unknown) {
      const elapsed = Date.now() - t1
      const msg = err instanceof Error ? err.message : String(err)
      addLog('error', `✗ Network error (${elapsed} ms) — ${msg}`)
    } finally {
      pinging.value = false
    }
  }

  return { consoleOpen, pinging, consoleLogs, consoleScrollEl, timestamp, testPing }
}
