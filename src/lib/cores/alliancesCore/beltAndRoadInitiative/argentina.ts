import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const argentina: BeltAndRoadInitiativeCountry = {
  name: 'Argentina',
  iso3166Alpha2: 'AR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Buenos Aires',
  coordinates: { latitude: -34, longitude: -64 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Buenos Aires', 'Argentina — city 2 (verify)', 'Argentina — city 3 (verify)', 'Argentina — city 4 (verify)', 'Argentina — city 5 (verify)' ] as [string, string, string, string, string],
  population: 46735004,
  mainLanguages: [ 'Guaraní', 'Spanish', 'Regional languages' ],
  currency: 'Argentine peso (ARS)',
  timezone: 'UTC-03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AR'],
  newsOutlets: BRI_NEWS_OUTLETS['AR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AR'],
  stockExchange: 'National or regional exchange (verify)',
}
