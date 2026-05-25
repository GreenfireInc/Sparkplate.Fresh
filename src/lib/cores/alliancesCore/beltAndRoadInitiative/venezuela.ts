import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const venezuela: BeltAndRoadInitiativeCountry = {
  name: 'Venezuela',
  iso3166Alpha2: 'VE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Caracas',
  coordinates: { latitude: 8, longitude: -66 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Caracas', 'Venezuela — city 2 (verify)', 'Venezuela — city 3 (verify)', 'Venezuela — city 4 (verify)', 'Venezuela — city 5 (verify)' ] as [string, string, string, string, string],
  population: 28517000,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Venezuelan bolívar soberano (VES)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['VE'],
  newsOutlets: BRI_NEWS_OUTLETS['VE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['VE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['VE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['VE'],
  rareEarths: BRI_RARE_EARTHS['VE'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['VE'],
}
