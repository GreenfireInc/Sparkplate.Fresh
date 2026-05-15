import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const ivoryCoast: EcowasCountry = {
  name: "Côte d'Ivoire",
  iso3166Alpha2: 'CI',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'],
  population: 29000000,
  mainLanguages: ['French', 'Baoulé', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Abidjan',
  foundingLeader: 'Félix Houphouët-Boigny (first President)',
  currentLeader: 'President Alassane Ouattara — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF CFA peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['CI'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM — seat Abidjan)',
}
