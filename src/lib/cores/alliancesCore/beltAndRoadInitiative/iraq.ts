import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const iraq: BeltAndRoadInitiativeCountry = {
  name: 'Iraq',
  iso3166Alpha2: 'IQ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Baghdad',
  coordinates: { latitude: 33.3152, longitude: 44.3661 },
  independence: '1932-10-03 (Kingdom); 2005 constitution (federal republic)',
  topMajorCities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf'] as [string, string, string, string, string],
  population: 46118793,
  mainLanguages: [ 'Arabic', 'Aramaic', 'Sorani' ],
  currency: 'Iraqi dinar (IQD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Faisal I (King)',
  currentLeader: 'Abdul Latif Rashid (President); Mohammed Shia\\',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC', 'Limited licensed venues'],
  stablecoin: 'USDT informal; banking sector rebuilding',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['IQ'],
  newsOutlets: BRI_NEWS_OUTLETS['IQ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['IQ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['IQ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['IQ'],
  rareEarths: BRI_RARE_EARTHS['IQ'],
  stockExchange: 'Iraq Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['IQ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['IQ'],
}
