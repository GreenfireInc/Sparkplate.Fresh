import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const nicaragua: BeltAndRoadInitiativeCountry = {
  name: 'Nicaragua',
  iso3166Alpha2: 'NI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Managua',
  coordinates: { latitude: 13, longitude: -85 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Managua', 'Nicaragua — city 2 (verify)', 'Nicaragua — city 3 (verify)', 'Nicaragua — city 4 (verify)', 'Nicaragua — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6803886,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Nicaraguan córdoba (NIO)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NI'],
  newsOutlets: BRI_NEWS_OUTLETS['NI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NI'],
  rareEarths: BRI_RARE_EARTHS['NI'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['NI'],
}
