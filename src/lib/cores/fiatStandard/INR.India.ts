import type { FiatCurrency } from './types'

export const india: FiatCurrency = {
  isoSymbol: 'INR',
  currencySymbol: '₹',
  currencyName: 'Indian Rupee',
  countryName: 'India',
  flag: '🇮🇳',
  centralBank: {
    name: 'Reserve Bank of India',
    abbreviation: 'RBI',
    website: 'https://www.rbi.org.in',
  },
  stockExchange: {
    name: 'National Stock Exchange of India',
    abbreviation: 'NSE',
    website: 'https://www.nseindia.com',
  },
  securitiesRegulator: {
    name: 'Securities and Exchange Board of India',
    abbreviation: 'SEBI',
    website: 'https://www.sebi.gov.in',
  },
}
