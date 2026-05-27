import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const costaRica: BeltAndRoadInitiativeCountry = {
  name: 'Costa Rica',
  iso3166Alpha2: 'CR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'San José',
  coordinates: { latitude: 10, longitude: -84 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'San José', 'Costa Rica — city 2 (verify)', 'Costa Rica — city 3 (verify)', 'Costa Rica — city 4 (verify)', 'Costa Rica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5309625,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Costa Rican colón (CRC)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CR'],
  newsOutlets: BRI_NEWS_OUTLETS['CR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CR'],
  rareEarths: BRI_RARE_EARTHS['CR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CR'],
}
