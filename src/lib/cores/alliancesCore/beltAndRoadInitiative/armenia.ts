import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const armenia: BeltAndRoadInitiativeCountry = {
  name: 'Armenia',
  iso3166Alpha2: 'AM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yerevan',
  coordinates: { latitude: 40, longitude: 45 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Yerevan', 'Armenia — city 2 (verify)', 'Armenia — city 3 (verify)', 'Armenia — city 4 (verify)', 'Armenia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3076200,
  mainLanguages: [ 'Armenian', 'English', 'Regional languages' ],
  currency: 'Armenian dram (AMD)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AM'],
  newsOutlets: BRI_NEWS_OUTLETS['AM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AM'],
  stockExchange: 'National or regional exchange (verify)',
}
