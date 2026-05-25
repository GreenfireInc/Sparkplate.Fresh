import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const singapore: BeltAndRoadInitiativeCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Singapore',
  coordinates: { latitude: 1.36666666, longitude: 103.8 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Singapore', 'Singapore — city 2 (verify)', 'Singapore — city 3 (verify)', 'Singapore — city 4 (verify)', 'Singapore — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6110200,
  mainLanguages: [ 'English', 'Chinese', 'Malay' ],
  currency: 'Singapore dollar (SGD)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SG'],
  newsOutlets: BRI_NEWS_OUTLETS['SG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: BRI_RARE_EARTHS['SG'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SG'],
}
