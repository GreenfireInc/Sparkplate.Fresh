import type { FiatCurrency } from './types'

export const hongKong: FiatCurrency = {
  isoSymbol: 'HKD',
  currencySymbol: 'HK$',
  currencyName: 'Hong Kong Dollar',
  countryName: 'Hong Kong',
  flag: '🇭🇰',
  centralBank: {
    name: 'Hong Kong Monetary Authority',
    abbreviation: 'HKMA',
    website: 'https://www.hkma.gov.hk',
  },
  stockExchange: {
    name: 'Hong Kong Exchanges and Clearing',
    abbreviation: 'HKEX',
    website: 'https://www.hkex.com.hk',
  },
  securitiesRegulator: {
    name: 'Securities and Futures Commission',
    abbreviation: 'SFC',
    website: 'https://www.sfc.hk',
  },
}
