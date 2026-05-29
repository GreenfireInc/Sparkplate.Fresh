import type { FiatCurrency } from './types'

export const kenya: FiatCurrency = {
  isoSymbol: 'KES',
  currencySymbol: 'KSh',
  currencyName: 'Kenyan Shilling',
  countryName: 'Kenya',
  flag: '🇰🇪',
  centralBank: {
    name: 'Central Bank of Kenya',
    abbreviation: 'CBK',
    website: 'https://www.centralbank.go.ke',
  },
  stockExchange: {
    name: 'Nairobi Securities Exchange',
    abbreviation: 'NSE',
    website: 'https://www.nse.co.ke',
  },
  securitiesRegulator: {
    name: 'Capital Markets Authority',
    abbreviation: 'CMA',
    website: 'https://www.cma.or.ke',
  },
}
