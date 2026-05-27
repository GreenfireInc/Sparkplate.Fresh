import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
/** Sahrawi Arab Democratic Republic — AU member; territorial status disputed (informational). */
export const sahrawiRepublic: AfricanUnionCountry = {
  name: 'Sahrawi Arab Democratic Republic (Sahrawi Republic)',
  iso3166Alpha2: 'EH',
  africanUnionStatus: 'member',
  capital: 'Tifariti (declared); Rabouni (administrative camps, Algeria)',
  coordinates: { latitude: 27.158, longitude: -9.988 },
  independence: '1976-02-27 (SADR proclamation)',
  topMajorCities: ['Tifariti', 'Rabouni', 'Boujdour', 'Smara', 'Dakhla (disputed administration)'],
  population: 600000,
  mainLanguages: ['Hassaniya Arabic', 'Spanish', 'French'],
  currency: 'Algerian dinar (DZD) in camps; Moroccan dirham (MAD) in Moroccan-administered areas',
  timezone: 'Africa/El_Aaiun',
  foundingLeader: 'Mohamed Abdelaziz',
  currentLeader: 'Brahim Ghali (President, SADR)',
  cryptocurrencyExchanges: ['Diaspora P2P', 'Binance (P2P)', 'Informal remittance channels'],
  stablecoin: 'USDT / USDC informal; no SADR-issued stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['EH'],
  newsOutlets: AU_NEWS_OUTLETS['EH'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['EH'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['EH'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['EH'],
  rareEarths: AU_RARE_EARTHS['EH'],
  stockExchange: 'No national securities exchange',
  bondMarkets: AU_BOND_MARKETS['EH'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['EH'],
}
