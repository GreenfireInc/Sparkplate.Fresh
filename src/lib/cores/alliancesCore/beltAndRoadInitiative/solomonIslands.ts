import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const solomonIslands: BeltAndRoadInitiativeCountry = {
  name: 'Solomon Islands',
  iso3166Alpha2: 'SB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Honiara',
  coordinates: { latitude: -8, longitude: 159 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Honiara', 'Solomon Islands — city 2 (verify)', 'Solomon Islands — city 3 (verify)', 'Solomon Islands — city 4 (verify)', 'Solomon Islands — city 5 (verify)' ] as [string, string, string, string, string],
  population: 750325,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Solomon Islands dollar (SBD)',
  timezone: 'UTC+11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SB'],
  newsOutlets: BRI_NEWS_OUTLETS['SB'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SB'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SB'],
  stockExchange: 'National or regional exchange (verify)',
}
