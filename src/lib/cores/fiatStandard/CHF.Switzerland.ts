import type { FiatCurrency } from './types'

export const switzerland: FiatCurrency = {
  isoSymbol: 'CHF',
  currencySymbol: 'CHF',
  currencyName: 'Swiss Franc',
  countryName: 'Switzerland',
  flag: '🇨🇭',
  centralBank: {
    name: 'Swiss National Bank',
    abbreviation: 'SNB',
    website: 'https://www.snb.ch',
  },
  stockExchange: {
    name: 'SIX Swiss Exchange',
    abbreviation: 'SIX',
    website: 'https://www.six-group.com/exchanges',
  },
  securitiesRegulator: {
    name: 'Swiss Financial Market Supervisory Authority',
    abbreviation: 'FINMA',
    website: 'https://www.finma.ch',
  },
}
