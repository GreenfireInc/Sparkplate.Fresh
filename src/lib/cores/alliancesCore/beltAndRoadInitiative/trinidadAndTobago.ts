import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const trinidadAndTobago: BeltAndRoadInitiativeCountry = {
  name: 'Trinidad and Tobago',
  iso3166Alpha2: 'TT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Port of Spain',
  coordinates: { latitude: 10.6918, longitude: -61.2225 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Port of Spain', 'Trinidad and Tobago — city 2 (verify)', 'Trinidad and Tobago — city 3 (verify)', 'Trinidad and Tobago — city 4 (verify)', 'Trinidad and Tobago — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1367764,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Trinidad and Tobago dollar (TTD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TT'],
  newsOutlets: BRI_NEWS_OUTLETS['TT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TT'],
  rareEarths: BRI_RARE_EARTHS['TT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TT'],
}
