import type { FiatCurrency } from './types'

export const australia: FiatCurrency = {
  isoSymbol: 'AUD',
  currencySymbol: 'A$',
  currencyName: 'Australian Dollar',
  countryName: 'Australia',
  flag: '🇦🇺',
  centralBank: {
    name: 'Reserve Bank of Australia',
    abbreviation: 'RBA',
    website: 'https://www.rba.gov.au',
  },
  stockExchange: {
    name: 'Australian Securities Exchange',
    abbreviation: 'ASX',
    website: 'https://www.asx.com.au',
  },
  securitiesRegulator: {
    name: 'Australian Securities and Investments Commission',
    abbreviation: 'ASIC',
    website: 'https://www.asic.gov.au',
  },
}
