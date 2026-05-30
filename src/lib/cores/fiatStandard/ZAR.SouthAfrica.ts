import type { FiatCurrency } from './types'

export const southAfrica: FiatCurrency = {
  isoSymbol: 'ZAR',
  currencySymbol: 'R',
  currencyName: 'South African Rand',
  countryName: 'South Africa',
  flag: '🇿🇦',
  centralBank: {
    name: 'South African Reserve Bank',
    abbreviation: 'SARB',
    website: 'https://www.resbank.co.za',
  },
  stockExchange: {
    name: 'Johannesburg Stock Exchange',
    abbreviation: 'JSE',
    website: 'https://www.jse.co.za',
  },
  securitiesRegulator: {
    name: 'Financial Sector Conduct Authority',
    abbreviation: 'FSCA',
    website: 'https://www.fsca.co.za',
  },
}
