import type { FiatCurrency } from './types'

export const mexico: FiatCurrency = {
  isoSymbol: 'MXN',
  currencySymbol: '$',
  currencyName: 'Mexican Peso',
  countryName: 'Mexico',
  flag: '🇲🇽',
  centralBank: {
    name: 'Banco de México',
    abbreviation: 'Banxico',
    website: 'https://www.banxico.org.mx',
  },
  stockExchange: {
    name: 'Bolsa Mexicana de Valores',
    abbreviation: 'BMV',
    website: 'https://www.bmv.com.mx',
  },
  securitiesRegulator: {
    name: 'Comisión Nacional Bancaria y de Valores',
    abbreviation: 'CNBV',
    website: 'https://www.gob.mx/cnbv',
  },
}
