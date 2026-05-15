import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const cyprus: CommonwealthCountry = {
  name: 'Cyprus',
  iso3166Alpha2: 'CY',
  commonwealthStatus: 'member',
  capital: 'Nicosia',
  coordinates: { latitude: 35.1856, longitude: 33.3823 },
  independence: '1960-08-16',
  topMajorCities: ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta'],
  population: 1250000,
  mainLanguages: ['Greek', 'Turkish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Asia/Nicosia',
  foundingLeader: 'Archbishop Makarios III (first President)',
  currentLeader: 'Nikos Christodoulides (President) — verify',
  cryptocurrencyExchanges: ['EU-licensed venues', 'Binance', 'Kraken'],
  stablecoin: 'EUR stablecoins (EU MiCA context); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CY'],
  stockExchange: 'Cyprus Stock Exchange (CSE)',
}
