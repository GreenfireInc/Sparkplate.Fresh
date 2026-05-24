import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const nepal: BeltAndRoadInitiativeCountry = {
  name: 'Nepal',
  iso3166Alpha2: 'NP',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kathmandu',
  coordinates: { latitude: 28, longitude: 84 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kathmandu', 'Nepal — city 2 (verify)', 'Nepal — city 3 (verify)', 'Nepal — city 4 (verify)', 'Nepal — city 5 (verify)' ] as [string, string, string, string, string],
  population: 29911840,
  mainLanguages: [ 'Nepali', 'English', 'Regional languages' ],
  currency: 'Nepalese rupee (NPR)',
  timezone: 'UTC+05:45',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NP'],
  newsOutlets: BRI_NEWS_OUTLETS['NP'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NP'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NP'],
  stockExchange: 'National or regional exchange (verify)',
}
