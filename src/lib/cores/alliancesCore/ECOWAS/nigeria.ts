import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const nigeria: EcowasCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 223000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Abubakar Tafawa Balewa (first Prime Minister)',
  currentLeader: 'President Bola Tinubu — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Quidax', 'Yellow Card', 'CBN stance evolution — verify'],
  stablecoin: 'USDT / USDC P2P; cNGN / stablecoin pilots — verify',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['NG'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['NG'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: ECOWAS_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group (NGX); ECOWAS Commission host country — informational',
  bondMarkets: ECOWAS_BOND_MARKETS['NG'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['NG'],
}
