import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const namibia: AfricanUnionCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  africanUnionStatus: 'member',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5597, longitude: 17.0832 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Walvis Bay', 'Swakopmund', 'Rundu', 'Oshakati'],
  population: 2700000,
  mainLanguages: ['English', 'Oshiwambo', 'Afrikaans'],
  currency: 'Namibian dollar (NAD); South African rand (ZAR) pegged 1:1',
  timezone: 'Africa/Windhoek',
  foundingLeader: 'Sam Nujoma',
  currentLeader: 'Netumbo Nandi-Ndaitwah (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African-linked banking',
  domesticCourierServices: AU_DOMESTIC_COURIERS['NA'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['NA'],
  stockExchange: 'Namibia Stock Exchange (NSX)',
}
