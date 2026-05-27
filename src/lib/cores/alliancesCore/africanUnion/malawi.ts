import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const malawi: AfricanUnionCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  africanUnionStatus: 'member',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21000000,
  mainLanguages: ['English', 'Chichewa', 'Tumbuka'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MW'],
  newsOutlets: AU_NEWS_OUTLETS['MW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: AU_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['MW'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['MW'],
}
