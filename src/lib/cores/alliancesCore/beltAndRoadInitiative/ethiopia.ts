import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const ethiopia: BeltAndRoadInitiativeCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence: 'Never fully colonized; modern state continuity (AU HQ host)',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Hawassa', 'Bahir Dar'] as [string, string, string, string, string],
  population: 111652998,
  mainLanguages: [ 'Amharic', 'English', 'Regional languages' ],
  currency: 'Ethiopian birr (ETB)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Haile Selassie (Emperor; modernizing era reference)',
  currentLeader: 'Abiy Ahmed (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; National Bank cautious on crypto',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ET'],
  newsOutlets: BRI_NEWS_OUTLETS['ET'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ET'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ET'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ET'],
  rareEarths: BRI_RARE_EARTHS['ET'],
  stockExchange: 'Ethiopian Securities Exchange (launch context varies)',
  bondMarkets: BRI_BOND_MARKETS['ET'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ET'],
}
