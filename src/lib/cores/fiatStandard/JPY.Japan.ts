import type { FiatCurrency } from './types'

export const japan: FiatCurrency = {
  isoSymbol: 'JPY',
  currencySymbol: '¥',
  currencyName: 'Japanese Yen',
  countryName: 'Japan',
  flag: '🇯🇵',
  centralBank: {
    name: 'Bank of Japan',
    abbreviation: 'BoJ',
    website: 'https://www.boj.or.jp',
  },
  stockExchange: {
    name: 'Tokyo Stock Exchange',
    abbreviation: 'TSE',
    website: 'https://www.jpx.co.jp',
  },
  securitiesRegulator: {
    name: 'Financial Services Agency',
    abbreviation: 'FSA',
    website: 'https://www.fsa.go.jp',
  },
}
