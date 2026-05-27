import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const cyprus: BeltAndRoadInitiativeCountry = {
  name: 'Cyprus',
  iso3166Alpha2: 'CY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nicosia',
  coordinates: { latitude: 35, longitude: 33 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Nicosia', 'Cyprus — city 2 (verify)', 'Cyprus — city 3 (verify)', 'Cyprus — city 4 (verify)', 'Cyprus — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1442614,
  mainLanguages: [ 'Greek', 'Turkish', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CY'],
  newsOutlets: BRI_NEWS_OUTLETS['CY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CY'],
  rareEarths: BRI_RARE_EARTHS['CY'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CY'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CY'],
}
