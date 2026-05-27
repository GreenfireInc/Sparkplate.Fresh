import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const sierraLeone: EcowasCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'],
  population: 8500000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai (first Prime Minister)',
  currentLeader: 'President Julius Maada Bio — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['SL'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['SL'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['SL'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['SL'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['SL'],
  rareEarths: ECOWAS_RARE_EARTHS['SL'],
  stockExchange: 'Sierra Leone Stock Exchange',
  bondMarkets: ECOWAS_BOND_MARKETS['SL'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['SL'],
}
