import type { FiatCurrency } from './types'

export const russia: FiatCurrency = {
  isoSymbol: 'RUB',
  currencySymbol: '₽',
  currencyName: 'Russian Ruble',
  countryName: 'Russia',
  flag: '🇷🇺',
  centralBank: {
    name: 'Central Bank of the Russian Federation',
    abbreviation: 'CBR',
    website: 'https://www.cbr.ru',
  },
  stockExchange: {
    name: 'Moscow Exchange',
    abbreviation: 'MOEX',
    website: 'https://www.moex.com',
  },
  securitiesRegulator: {
    name: 'Bank of Russia',
    abbreviation: 'CBR',
    website: 'https://www.cbr.ru/eng/securities_market/',
  },
}
