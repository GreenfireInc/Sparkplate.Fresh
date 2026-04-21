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

type ExchangeModule = { info?: { name?: string; website?: string } }

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
