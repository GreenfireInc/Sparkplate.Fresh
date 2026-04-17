import type { AfricanUnionCountry } from './types'

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
  stockExchange: 'No national securities exchange',
}
