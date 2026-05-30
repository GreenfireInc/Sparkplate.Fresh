import type { FiatCurrency } from './types'

export const singapore: FiatCurrency = {
  isoSymbol: 'SGD',
  currencySymbol: 'S$',
  currencyName: 'Singapore Dollar',
  countryName: 'Singapore',
  flag: '🇸🇬',
  centralBank: {
    name: 'Monetary Authority of Singapore',
    abbreviation: 'MAS',
    website: 'https://www.mas.gov.sg',
  },
  stockExchange: {
    name: 'Singapore Exchange',
    abbreviation: 'SGX',
    website: 'https://www.sgx.com',
  },
  securitiesRegulator: {
    name: 'Monetary Authority of Singapore',
    abbreviation: 'MAS',
    website: 'https://www.mas.gov.sg/regulation',
  },
}
