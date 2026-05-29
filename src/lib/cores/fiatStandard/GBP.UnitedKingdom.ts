import type { FiatCurrency } from './types'

export const unitedKingdom: FiatCurrency = {
  isoSymbol: 'GBP',
  currencySymbol: '£',
  currencyName: 'British Pound',
  countryName: 'United Kingdom',
  flag: '🇬🇧',
  centralBank: {
    name: 'Bank of England',
    abbreviation: 'BoE',
    website: 'https://www.bankofengland.co.uk',
  },
  stockExchange: {
    name: 'London Stock Exchange',
    abbreviation: 'LSE',
    website: 'https://www.londonstockexchange.com',
  },
  securitiesRegulator: {
    name: 'Financial Conduct Authority',
    abbreviation: 'FCA',
    website: 'https://www.fca.org.uk',
  },
}
