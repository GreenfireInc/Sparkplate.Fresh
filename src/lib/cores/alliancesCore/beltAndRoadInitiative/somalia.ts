import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const somalia: BeltAndRoadInitiativeCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'] as [string, string, string, string, string],
  population: 19655000,
  mainLanguages: [ 'Arabic', 'Somali', 'Regional languages' ],
  currency: 'Somali shilling (SOS)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SO'],
  newsOutlets: BRI_NEWS_OUTLETS['SO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: BRI_RARE_EARTHS['SO'],
  stockExchange: 'No functioning national exchange',
  bondMarkets: BRI_BOND_MARKETS['SO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SO'],
}
