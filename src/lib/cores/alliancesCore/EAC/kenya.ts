import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EAC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EAC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EAC_RARE_EARTHS } from './rareEarthsByIso'
import { EAC_BOND_MARKETS } from './bondMarketsByIso'
import { EAC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const kenya: EacCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (first President)',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local startups'],
  stablecoin: 'USDT / USDC; regulatory stance evolving — verify',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['KE'],
  newsOutlets: EAC_NEWS_OUTLETS['KE'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: EAC_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: EAC_BOND_MARKETS['KE'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['KE'],
}
