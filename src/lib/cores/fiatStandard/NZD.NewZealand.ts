import type { FiatCurrency } from './types'

export const newZealand: FiatCurrency = {
  isoSymbol: 'NZD',
  currencySymbol: 'NZ$',
  currencyName: 'New Zealand Dollar',
  countryName: 'New Zealand',
  flag: '🇳🇿',
  centralBank: {
    name: 'Reserve Bank of New Zealand',
    abbreviation: 'RBNZ',
    website: 'https://www.rbnz.govt.nz',
  },
  stockExchange: {
    name: 'New Zealand Exchange',
    abbreviation: 'NZX',
    website: 'https://www.nzx.com',
  },
  securitiesRegulator: {
    name: 'Financial Markets Authority',
    abbreviation: 'FMA',
    website: 'https://www.fma.govt.nz',
  },
}
