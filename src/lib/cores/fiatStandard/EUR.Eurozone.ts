import type { FiatCurrency } from './types'

export const eurozone: FiatCurrency = {
  isoSymbol: 'EUR',
  currencySymbol: '€',
  currencyName: 'Euro',
  countryName: 'Eurozone',
  flag: '🇪🇺',
  centralBank: {
    name: 'European Central Bank',
    abbreviation: 'ECB',
    website: 'https://www.ecb.europa.eu',
  },
  stockExchange: {
    name: 'Euronext',
    abbreviation: 'ENX',
    website: 'https://www.euronext.com',
  },
  securitiesRegulator: {
    name: 'European Securities and Markets Authority',
    abbreviation: 'ESMA',
    website: 'https://www.esma.europa.eu',
  },
}
