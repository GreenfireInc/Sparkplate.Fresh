import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const panama: BeltAndRoadInitiativeCountry = {
  name: 'Panama',
  iso3166Alpha2: 'PA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Panama City',
  coordinates: { latitude: 9, longitude: -80 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Panama City', 'Panama — city 2 (verify)', 'Panama — city 3 (verify)', 'Panama — city 4 (verify)', 'Panama — city 5 (verify)' ] as [string, string, string, string, string],
  population: 4064780,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Panamanian balboa (PAB)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PA'],
  newsOutlets: BRI_NEWS_OUTLETS['PA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PA'],
  rareEarths: BRI_RARE_EARTHS['PA'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['PA'],
}
