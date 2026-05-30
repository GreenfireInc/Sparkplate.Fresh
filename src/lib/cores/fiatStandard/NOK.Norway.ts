import type { FiatCurrency } from './types'

export const norway: FiatCurrency = {
  isoSymbol: 'NOK',
  currencySymbol: 'kr',
  currencyName: 'Norwegian Krone',
  countryName: 'Norway',
  flag: '🇳🇴',
  centralBank: {
    name: 'Norges Bank',
    abbreviation: 'NB',
    website: 'https://www.norges-bank.no',
  },
  stockExchange: {
    name: 'Oslo Børs',
    abbreviation: 'OSE',
    website: 'https://www.oslobors.no',
  },
  securitiesRegulator: {
    name: 'Finanstilsynet',
    abbreviation: 'FSA',
    website: 'https://www.finanstilsynet.no',
  },
}
