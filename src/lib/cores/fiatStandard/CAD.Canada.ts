import type { FiatCurrency } from './types'

export const canada: FiatCurrency = {
  isoSymbol: 'CAD',
  currencySymbol: 'C$',
  currencyName: 'Canadian Dollar',
  countryName: 'Canada',
  flag: '🇨🇦',
  centralBank: {
    name: 'Bank of Canada',
    abbreviation: 'BoC',
    website: 'https://www.bankofcanada.ca',
  },
  stockExchange: {
    name: 'Toronto Stock Exchange',
    abbreviation: 'TSX',
    website: 'https://www.tsx.com',
  },
  securitiesRegulator: {
    name: 'Canadian Securities Administrators',
    abbreviation: 'CSA',
    website: 'https://www.securities-administrators.ca',
  },
}
