import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const ukraine: BeltAndRoadInitiativeCountry = {
  name: 'Ukraine',
  iso3166Alpha2: 'UA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kyiv',
  coordinates: { latitude: 49, longitude: 32 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kyiv', 'Ukraine — city 2 (verify)', 'Ukraine — city 3 (verify)', 'Ukraine — city 4 (verify)', 'Ukraine — city 5 (verify)' ] as [string, string, string, string, string],
  population: 32862000,
  mainLanguages: [ 'Ukrainian', 'English', 'Regional languages' ],
  currency: 'Ukrainian hryvnia (UAH)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['UA'],
  newsOutlets: BRI_NEWS_OUTLETS['UA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['UA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['UA'],
  stockExchange: 'National or regional exchange (verify)',
}
