import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const guineaBissau: BeltAndRoadInitiativeCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bissau',
  coordinates: { latitude: 11.8636, longitude: -15.5977 },
  independence: '1973-09-24',
  topMajorCities: ['Bissau', 'Bafatá', 'Gabú', 'Cacheu', 'Bolama'] as [string, string, string, string, string],
  population: 1781308,
  mainLanguages: [ 'Portuguese', 'Upper Guinea Creole', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Luís Cabral',
  currentLeader: 'Umaro Sissoco Embaló (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional P2P'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GW'],
  newsOutlets: BRI_NEWS_OUTLETS['GW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GW'],
  rareEarths: BRI_RARE_EARTHS['GW'],
  stockExchange: 'No significant national exchange; BRVM regional access',
  bondMarkets: BRI_BOND_MARKETS['GW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GW'],
}
