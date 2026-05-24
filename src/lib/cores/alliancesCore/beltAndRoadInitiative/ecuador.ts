import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const ecuador: BeltAndRoadInitiativeCountry = {
  name: 'Ecuador',
  iso3166Alpha2: 'EC',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Quito',
  coordinates: { latitude: -2, longitude: -77.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Quito', 'Ecuador — city 2 (verify)', 'Ecuador — city 3 (verify)', 'Ecuador — city 4 (verify)', 'Ecuador — city 5 (verify)' ] as [string, string, string, string, string],
  population: 18103660,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['EC'],
  newsOutlets: BRI_NEWS_OUTLETS['EC'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['EC'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['EC'],
  stockExchange: 'National or regional exchange (verify)',
}
