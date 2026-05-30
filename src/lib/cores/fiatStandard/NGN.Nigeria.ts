import type { FiatCurrency } from './types'

export const nigeria: FiatCurrency = {
  isoSymbol: 'NGN',
  currencySymbol: '₦',
  currencyName: 'Nigerian Naira',
  countryName: 'Nigeria',
  flag: '🇳🇬',
  centralBank: {
    name: 'Central Bank of Nigeria',
    abbreviation: 'CBN',
    website: 'https://www.cbn.gov.ng',
  },
  stockExchange: {
    name: 'Nigerian Exchange Group',
    abbreviation: 'NGX',
    website: 'https://ngxgroup.com',
  },
  securitiesRegulator: {
    name: 'Securities and Exchange Commission',
    abbreviation: 'SEC',
    website: 'https://www.sec.gov.ng',
  },
}
