import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const malawi: CommonwealthCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  commonwealthStatus: 'member',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21000000,
  mainLanguages: ['English', 'Chichewa', 'Tumbuka'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda (first Prime Minister)',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MW'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MW'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MW'],
}
