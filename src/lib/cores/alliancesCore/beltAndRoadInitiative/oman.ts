import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const oman: BeltAndRoadInitiativeCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Muscat',
  coordinates: { latitude: 23.588, longitude: 58.3829 },
  independence: '1650 (expelled Portuguese); 1970 modern Sultanate transition',
  topMajorCities: ['Muscat', 'Seeb', 'Salalah', 'Bawshar', 'Sohar'] as [string, string, string, string, string],
  population: 5343630,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Omani rial (OMR)',
  timezone: 'UTC+04:00',
  foundingLeader: 'Qaboos bin Said (long-serving modern Sultan)',
  currentLeader: 'Haitham bin Tariq (Sultan)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers'],
  stablecoin: 'USDT informal; pegged rial economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['OM'],
  newsOutlets: BRI_NEWS_OUTLETS['OM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['OM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['OM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['OM'],
  rareEarths: BRI_RARE_EARTHS['OM'],
  stockExchange: 'Muscat Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['OM'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['OM'],
}
