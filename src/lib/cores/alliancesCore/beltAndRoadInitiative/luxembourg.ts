import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const luxembourg: BeltAndRoadInitiativeCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Luxembourg',
  coordinates: { latitude: 49.75, longitude: 6.16666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Luxembourg', 'Luxembourg — city 2 (verify)', 'Luxembourg — city 3 (verify)', 'Luxembourg — city 4 (verify)', 'Luxembourg — city 5 (verify)' ] as [string, string, string, string, string],
  population: 681973,
  mainLanguages: [ 'German', 'French', 'Luxembourgish' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LU'],
  newsOutlets: BRI_NEWS_OUTLETS['LU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LU'],
  rareEarths: BRI_RARE_EARTHS['LU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LU'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LU'],
}
