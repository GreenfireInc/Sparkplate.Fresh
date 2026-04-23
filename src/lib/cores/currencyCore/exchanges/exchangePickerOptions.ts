import { CryptoExchanges } from './index'

export interface ExchangePickerOption {
  /** Key on `CryptoExchanges` (e.g. `Kraken`) */
  key: string
  /** Display name from `info.name` */
  label: string
  /** Official site from `info.website` */
  website: string
  /** Basename under `/assets/icons/exchanges/{iconFile}.svg`, or `null` if no asset */
  iconFile: string | null
}

/**
 * Overrides for `CryptoExchanges` keys whose icon basename in
 * `public/assets/icons/exchanges` differs from `key.toLowerCase()`.
 * Keys not listed here fall back to `key.toLowerCase()`.
 */
const EXCHANGE_ICON_FILE: Record<string, string | null> = {}

type ExchangeModule = {
  info?: { name?: string; website?: string; country?: string }
  socialMedia?: Record<string, string>
}

/** Social links from the exchange module (e.g. `BinanceExchangeClass.socialMedia`) keyed by platform. */
export function getExchangeSocialMediaForDisplayName(displayName: string): Record<string, string> | null {
  const v = displayName?.trim()
  if (!v) return null
  const keys = Object.keys(CryptoExchanges) as (keyof typeof CryptoExchanges)[]
  for (const key of keys) {
    const mod = CryptoExchanges[key] as ExchangeModule
    if (mod.info?.name !== v) continue
    const sm = mod.socialMedia
    if (!sm || typeof sm !== 'object') return null
    return { ...sm }
  }
  return null
}

/** Jurisdiction / HQ from `info.country` when the display name matches a known exchange (e.g. Bitfinex → British Virgin Islands). */
export function getExchangeCountryForDisplayName(displayName: string): string | null {
  const v = displayName?.trim()
  if (!v) return null
  const keys = Object.keys(CryptoExchanges) as (keyof typeof CryptoExchanges)[]
  for (const key of keys) {
    const mod = CryptoExchanges[key] as ExchangeModule
    if (mod.info?.name !== v) continue
    const country = mod.info?.country?.trim()
    return country && country.length > 0 ? country : null
  }
  return null
}

/** Lowercase country / jurisdiction label → ISO 3166-1 alpha-2. Empty string = no flag (e.g. Global). */
const EXCHANGE_COUNTRY_TO_ALPHA2: Record<string, string> = {
  global: '',
  japan: 'JP',
  luxembourg: 'LU',
  singapore: 'SG',
  seychelles: 'SC',
  'south korea': 'KR',
  'cayman islands': 'KY',
  'british virgin islands': 'VG',
  'united states': 'US',
}

function regionalIndicatorEmoji(alpha2: string): string {
  const upper = alpha2.toUpperCase()
  if (upper.length !== 2) return ''
  const a = upper.codePointAt(0)! - 0x41
  const b = upper.codePointAt(1)! - 0x41
  if (a < 0 || a > 25 || b < 0 || b > 25) return ''
  const base = 0x1f1e6
  return String.fromCodePoint(base + a, base + b)
}

/** Unicode flag emoji for known exchange `info.country` values; otherwise empty. */
export function flagEmojiForCountryName(country: string | null | undefined): string {
  const key = country?.trim().toLowerCase() ?? ''
  if (!key) return ''
  const code = EXCHANGE_COUNTRY_TO_ALPHA2[key]
  if (code === undefined || !code) return ''
  return regionalIndicatorEmoji(code)
}

export function getExchangePickerOptions(): ExchangePickerOption[] {
  const keys = Object.keys(CryptoExchanges) as (keyof typeof CryptoExchanges)[]
  const out: ExchangePickerOption[] = []

  for (const key of keys) {
    const mod = CryptoExchanges[key] as ExchangeModule
    const name = mod.info?.name
    if (!name) continue

    const mapped = EXCHANGE_ICON_FILE[String(key)]
    const iconFile = mapped !== undefined ? mapped : String(key).toLowerCase()

    out.push({
      key: String(key),
      label: name,
      website: mod.info?.website ?? '',
      iconFile,
    })
  }

  return out.sort((a, b) => a.label.localeCompare(b.label))
}

export function getExchangeIconSrc(iconFile: string | null): string | null {
  if (!iconFile) return null
  return `/assets/icons/exchanges/${iconFile}.svg`
}
