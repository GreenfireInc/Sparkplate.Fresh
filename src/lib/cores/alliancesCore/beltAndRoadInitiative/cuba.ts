import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const cuba: BeltAndRoadInitiativeCountry = {
  name: 'Cuba',
  iso3166Alpha2: 'CU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Havana',
  coordinates: { latitude: 21.5, longitude: -80 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Havana', 'Cuba — city 2 (verify)', 'Cuba — city 3 (verify)', 'Cuba — city 4 (verify)', 'Cuba — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9748007,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Cuban convertible peso (CUC)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CU'],
  newsOutlets: BRI_NEWS_OUTLETS['CU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CU'],
  rareEarths: BRI_RARE_EARTHS['CU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CU'],
}
