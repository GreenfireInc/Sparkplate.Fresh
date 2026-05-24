import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const austria: BeltAndRoadInitiativeCountry = {
  name: 'Austria',
  iso3166Alpha2: 'AT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vienna',
  coordinates: { latitude: 47.33333333, longitude: 13.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vienna', 'Austria — city 2 (verify)', 'Austria — city 3 (verify)', 'Austria — city 4 (verify)', 'Austria — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9200931,
  mainLanguages: [ 'German', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AT'],
  newsOutlets: BRI_NEWS_OUTLETS['AT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AT'],
  stockExchange: 'National or regional exchange (verify)',
}
