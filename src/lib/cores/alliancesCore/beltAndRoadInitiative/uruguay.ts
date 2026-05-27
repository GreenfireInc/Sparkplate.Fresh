import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const uruguay: BeltAndRoadInitiativeCountry = {
  name: 'Uruguay',
  iso3166Alpha2: 'UY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Montevideo',
  coordinates: { latitude: -33, longitude: -56 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Montevideo', 'Uruguay — city 2 (verify)', 'Uruguay — city 3 (verify)', 'Uruguay — city 4 (verify)', 'Uruguay — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3499451,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Uruguayan peso (UYU)',
  timezone: 'UTC-03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['UY'],
  newsOutlets: BRI_NEWS_OUTLETS['UY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['UY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['UY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['UY'],
  rareEarths: BRI_RARE_EARTHS['UY'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['UY'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['UY'],
}
