import type { FiatCurrency } from './types'

export const southKorea: FiatCurrency = {
  isoSymbol: 'KRW',
  currencySymbol: '₩',
  currencyName: 'South Korean Won',
  countryName: 'South Korea',
  flag: '🇰🇷',
  centralBank: {
    name: 'Bank of Korea',
    abbreviation: 'BoK',
    website: 'https://www.bok.or.kr',
  },
  stockExchange: {
    name: 'Korea Exchange',
    abbreviation: 'KRX',
    website: 'https://global.krx.co.kr',
  },
  securitiesRegulator: {
    name: 'Financial Services Commission',
    abbreviation: 'FSC',
    website: 'https://www.fsc.go.kr',
  },
}
