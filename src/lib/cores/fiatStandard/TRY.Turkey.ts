import type { FiatCurrency } from './types'

export const turkey: FiatCurrency = {
  isoSymbol: 'TRY',
  currencySymbol: '₺',
  currencyName: 'Turkish Lira',
  countryName: 'Turkey',
  flag: '🇹🇷',
  centralBank: {
    name: 'Central Bank of the Republic of Türkiye',
    abbreviation: 'TCMB',
    website: 'https://www.tcmb.gov.tr',
  },
  stockExchange: {
    name: 'Borsa Istanbul',
    abbreviation: 'BIST',
    website: 'https://www.borsaistanbul.com',
  },
  securitiesRegulator: {
    name: 'Capital Markets Board of Turkey',
    abbreviation: 'SPK',
    website: 'https://www.spk.gov.tr',
  },
}
