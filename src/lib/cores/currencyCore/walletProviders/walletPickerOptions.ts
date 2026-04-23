import type { WalletProviderData } from './walletProviderData'
import { allWalletProviders } from './index'

function findWalletProviderByDisplayName(displayName: string): WalletProviderData | null {
  const name = displayName?.trim() ?? ''
  if (!name) return null
  const head = name.split(' · ')[0]?.trim() ?? name
  const w = allWalletProviders.find(
    (p) =>
      head === p.basicInfo.name ||
      name.startsWith(`${p.basicInfo.name} ·`) ||
      name.startsWith(p.basicInfo.name),
  )
  return w ?? null
}

/** Social links from the wallet catalog (e.g. `exodusWalletData.socialMedia`) when the display name matches a known provider. */
export function getWalletSocialMediaForDisplayName(displayName: string): Record<string, string> | null {
  const p = findWalletProviderByDisplayName(displayName)
  const sm = p?.socialMedia
  if (!sm || typeof sm !== 'object') return null
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(sm)) {
    if (typeof v === 'string' && v.trim().length > 0) out[k] = v.trim()
  }
  return Object.keys(out).length ? out : null
}

export interface WalletPickerOption {
  /** Canonical slug from `basicInfo.slug` (e.g. `metamask`) */
  key: string
  /** Display name from `basicInfo.name` */
  label: string
  /** Official site from `basicInfo.website` */
  website: string
  /** Basename under `/assets/icons/wallets/{iconFile}.svg`, or `null` if no asset */
  iconFile: string | null
}

/**
 * Overrides for wallet slugs whose icon basename in
 * `public/assets/icons/wallets` differs from `slug.toLowerCase()`.
 * Slugs not listed here fall back to the slug itself.
 */
const WALLET_ICON_FILE: Record<string, string | null> = {}

export function getWalletPickerOptions(): WalletPickerOption[] {
  const out: WalletPickerOption[] = allWalletProviders.map((w) => {
    const slug = w.basicInfo.slug
    const mapped = WALLET_ICON_FILE[slug]
    const iconFile = mapped !== undefined ? mapped : slug.toLowerCase()
    return {
      key: slug,
      label: w.basicInfo.name,
      website: w.basicInfo.website,
      iconFile,
    }
  })

  return out.sort((a, b) => a.label.localeCompare(b.label))
}

export function getWalletIconSrc(iconFile: string | null): string | null {
  if (!iconFile) return null
  return `/assets/icons/wallets/${iconFile}.svg`
}
