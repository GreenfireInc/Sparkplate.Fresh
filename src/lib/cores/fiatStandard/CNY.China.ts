import type { FiatCurrency } from './types'

export const china: FiatCurrency = {
  isoSymbol: 'CNY',
  currencySymbol: '¥',
  currencyName: 'Chinese Yuan',
  countryName: 'China',
  flag: '🇨🇳',
  centralBank: {
    name: "People's Bank of China",
    abbreviation: 'PBOC',
    website: 'https://www.pbc.gov.cn',
  },
  stockExchange: {
    name: 'Shanghai Stock Exchange',
    abbreviation: 'SSE',
    website: 'https://www.sse.com.cn',
  },
  securitiesRegulator: {
    name: 'China Securities Regulatory Commission',
    abbreviation: 'CSRC',
    website: 'http://www.csrc.gov.cn',
  },
}
