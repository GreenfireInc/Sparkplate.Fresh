import { allWalletProviders } from './index'

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
