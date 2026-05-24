import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const namibia: BeltAndRoadInitiativeCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5597, longitude: 17.0832 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Walvis Bay', 'Swakopmund', 'Rundu', 'Oshakati'] as [string, string, string, string, string],
  population: 3022401,
  mainLanguages: [ 'Afrikaans', 'German', 'English' ],
  currency: 'Namibian dollar (NAD)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Sam Nujoma',
  currentLeader: 'Netumbo Nandi-Ndaitwah (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African-linked banking',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NA'],
  newsOutlets: BRI_NEWS_OUTLETS['NA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NA'],
  stockExchange: 'Namibia Stock Exchange (NSX)',
}
