import type { FiatCurrency } from './types'

export const sweden: FiatCurrency = {
  isoSymbol: 'SEK',
  currencySymbol: 'kr',
  currencyName: 'Swedish Krona',
  countryName: 'Sweden',
  flag: '🇸🇪',
  centralBank: {
    name: 'Sveriges Riksbank',
    abbreviation: 'Riksbank',
    website: 'https://www.riksbank.se',
  },
  stockExchange: {
    name: 'Nasdaq Stockholm',
    abbreviation: 'OMX',
    website: 'https://www.nasdaq.com/solutions/nasdaq-stockholm',
  },
  securitiesRegulator: {
    name: 'Finansinspektionen',
    abbreviation: 'FI',
    website: 'https://www.fi.se',
  },
}
