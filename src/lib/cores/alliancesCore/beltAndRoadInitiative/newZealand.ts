import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const newZealand: BeltAndRoadInitiativeCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Wellington',
  coordinates: { latitude: -41, longitude: 174 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Wellington', 'New Zealand — city 2 (verify)', 'New Zealand — city 3 (verify)', 'New Zealand — city 4 (verify)', 'New Zealand — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5324700,
  mainLanguages: [ 'English', 'Māori', 'New Zealand Sign Language' ],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'UTC-11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NZ'],
  newsOutlets: BRI_NEWS_OUTLETS['NZ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: BRI_RARE_EARTHS['NZ'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['NZ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['NZ'],
}
