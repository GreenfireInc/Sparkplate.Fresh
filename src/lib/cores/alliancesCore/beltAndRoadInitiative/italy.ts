import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const italy: BeltAndRoadInitiativeCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Rome',
  coordinates: { latitude: 42.83333333, longitude: 12.83333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Rome', 'Italy — city 2 (verify)', 'Italy — city 3 (verify)', 'Italy — city 4 (verify)', 'Italy — city 5 (verify)' ] as [string, string, string, string, string],
  population: 58927633,
  mainLanguages: [ 'Italian', 'Catalan', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['IT'],
  newsOutlets: BRI_NEWS_OUTLETS['IT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['IT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['IT'],
  rareEarths: BRI_RARE_EARTHS['IT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['IT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['IT'],
}
