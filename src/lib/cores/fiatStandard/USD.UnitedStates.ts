import type { FiatCurrency } from './types'

export const unitedStates: FiatCurrency = {
  isoSymbol: 'USD',
  currencySymbol: '$',
  currencyName: 'US Dollar',
  countryName: 'United States',
  flag: '🇺🇸',
  centralBank: {
    name: 'Federal Reserve System',
    abbreviation: 'Fed',
    website: 'https://www.federalreserve.gov',
  },
  stockExchange: {
    name: 'New York Stock Exchange',
    abbreviation: 'NYSE',
    website: 'https://www.nyse.com',
  },
  securitiesRegulator: {
    name: 'U.S. Securities and Exchange Commission',
    abbreviation: 'SEC',
    website: 'https://www.sec.gov',
  },
}
