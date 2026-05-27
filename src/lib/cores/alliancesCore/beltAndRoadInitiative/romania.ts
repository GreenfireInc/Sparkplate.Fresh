import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const romania: BeltAndRoadInitiativeCountry = {
  name: 'Romania',
  iso3166Alpha2: 'RO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bucharest',
  coordinates: { latitude: 46, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bucharest', 'Romania — city 2 (verify)', 'Romania — city 3 (verify)', 'Romania — city 4 (verify)', 'Romania — city 5 (verify)' ] as [string, string, string, string, string],
  population: 19036031,
  mainLanguages: [ 'Romanian', 'English', 'Regional languages' ],
  currency: 'Romanian leu (RON)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['RO'],
  newsOutlets: BRI_NEWS_OUTLETS['RO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['RO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['RO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['RO'],
  rareEarths: BRI_RARE_EARTHS['RO'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['RO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['RO'],
}
