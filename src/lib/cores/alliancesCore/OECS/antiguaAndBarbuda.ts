import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const antiguaAndBarbuda: OecsCountry = {
  name: 'Antigua and Barbuda',
  iso3166Alpha2: 'AG',
  capital: 'St. John\'s',
  coordinates: { latitude: 17.1274, longitude: -61.8468 },
  independence:
    '1981-11-01 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['St. John\'s', 'All Saints', 'Liberta', 'Potters Village', 'Bolands'],
  population: 100000,
  mainLanguages: ['English', 'Antiguan Creole', 'Spanish (minor)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Antigua',
  foundingLeader: 'Vere Bird (first Prime Minister)',
  currentLeader: 'Prime Minister Gaston Browne — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'ECCB-region Binance P2P overlays — informational'],
  stablecoin: 'XCD USD peg via ECCB; informal USDT/USDC — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['AG'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
