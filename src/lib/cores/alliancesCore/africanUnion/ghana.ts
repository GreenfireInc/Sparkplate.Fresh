import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const ghana: AfricanUnionCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  africanUnionStatus: 'member',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34000000,
  mainLanguages: ['English', 'Akan', 'Ewe'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah',
  currentLeader: 'John Mahama (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Busha', 'Quidax'],
  stablecoin: 'USDT / USDC; Bank of Ghana piloting eCedi CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GH'],
  newsOutlets: AU_NEWS_OUTLETS['GH'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GH'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GH'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['GH'],
  rareEarths: AU_RARE_EARTHS['GH'],
  stockExchange: 'Ghana Stock Exchange (GSE)',
  bondMarkets: AU_BOND_MARKETS['GH'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['GH'],
}
