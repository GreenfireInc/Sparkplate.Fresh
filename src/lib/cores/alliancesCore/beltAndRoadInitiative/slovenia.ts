import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const slovenia: BeltAndRoadInitiativeCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.11666666, longitude: 14.81666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ljubljana', 'Slovenia — city 2 (verify)', 'Slovenia — city 3 (verify)', 'Slovenia — city 4 (verify)', 'Slovenia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2130638,
  mainLanguages: [ 'Slovene', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SI'],
  newsOutlets: BRI_NEWS_OUTLETS['SI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SI'],
  stockExchange: 'National or regional exchange (verify)',
}
