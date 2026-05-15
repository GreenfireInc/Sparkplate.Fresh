import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const togo: CommonwealthCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  commonwealthStatus: 'member',
  capital: 'Lomé',
  coordinates: { latitude: 6.1256, longitude: 1.2254 },
  independence: '1960-04-27',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Palimé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Mina'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio (first President)',
  currentLeader: 'Faure Gnassingbé (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XOF peg to EUR; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TG'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (regional)',
}
