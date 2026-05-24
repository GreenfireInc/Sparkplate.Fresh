import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const namibia: CommonwealthCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  commonwealthStatus: 'member',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5597, longitude: 17.0832 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Rundu', 'Walvis Bay', 'Oshakati', 'Swakopmund'],
  population: 2600000,
  mainLanguages: ['English', 'Afrikaans', 'Oshiwambo'],
  currency: 'Namibian dollar (NAD); South African rand legal tender',
  timezone: 'Africa/Windhoek',
  foundingLeader: 'Sam Nujoma (first President)',
  currentLeader: 'Netumbo Nandi-Ndaitwah (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['NA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['NA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['NA'],
  stockExchange: 'Namibian Stock Exchange',
}
