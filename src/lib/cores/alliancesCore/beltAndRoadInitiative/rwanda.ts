import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const rwanda: BeltAndRoadInitiativeCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Butare (Huye)', 'Gitarama (Muhanga)', 'Musanze', 'Cyangugu'] as [string, string, string, string, string],
  population: 14104969,
  mainLanguages: [ 'English', 'French', 'Kinyarwanda' ],
  currency: 'Rwandan franc (RWF)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Grégoire Kayibanda',
  currentLeader: 'Paul Kagame (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Blockchain hub initiatives'],
  stablecoin: 'USDT / USDC; central bank exploring CBDC',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['RW'],
  newsOutlets: BRI_NEWS_OUTLETS['RW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: BRI_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['RW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['RW'],
}
