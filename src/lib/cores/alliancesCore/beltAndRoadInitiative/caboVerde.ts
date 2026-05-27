import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const caboVerde: BeltAndRoadInitiativeCountry = {
  name: 'Cabo Verde',
  iso3166Alpha2: 'CV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Praia',
  coordinates: { latitude: 14.9311, longitude: -23.5087 },
  independence: '1975-07-05',
  topMajorCities: ['Praia', 'Mindelo', 'Santa Maria', 'Assomada', 'Pedra Badejo'] as [string, string, string, string, string],
  population: 491233,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'Cape Verdean escudo (CVE)',
  timezone: 'UTC-01:00',
  foundingLeader: 'Aristides Pereira',
  currentLeader: 'José Maria Neves (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European-facing brokers'],
  stablecoin: 'EUR-linked usage; USDT via international apps',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CV'],
  newsOutlets: BRI_NEWS_OUTLETS['CV'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CV'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CV'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CV'],
  rareEarths: BRI_RARE_EARTHS['CV'],
  stockExchange: 'Bolsa de Valores de Cabo Verde (limited listings)',
  bondMarkets: BRI_BOND_MARKETS['CV'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CV'],
}
