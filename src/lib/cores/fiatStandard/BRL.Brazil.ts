import type { FiatCurrency } from './types'

export const brazil: FiatCurrency = {
  isoSymbol: 'BRL',
  currencySymbol: 'R$',
  currencyName: 'Brazilian Real',
  countryName: 'Brazil',
  flag: '🇧🇷',
  centralBank: {
    name: 'Central Bank of Brazil',
    abbreviation: 'BCB',
    website: 'https://www.bcb.gov.br',
  },
  stockExchange: {
    name: 'B3',
    abbreviation: 'B3',
    website: 'https://www.b3.com.br',
  },
  securitiesRegulator: {
    name: 'Comissão de Valores Mobiliários',
    abbreviation: 'CVM',
    website: 'https://www.gov.br/cvm',
  },
}
