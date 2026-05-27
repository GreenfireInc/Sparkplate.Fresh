import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const sierraLeone: CensadCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Koidu', 'Makeni'],
  population: 8490000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai (first Prime Minister)',
  currentLeader: 'President Julius Maada Bio — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance P2P informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SL'],
  newsOutlets: CENSAD_NEWS_OUTLETS['SL'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['SL'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['SL'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['SL'],
  rareEarths: CENSAD_RARE_EARTHS['SL'],
  stockExchange: 'Sierra Leone Stock Exchange — verify liquidity',
  bondMarkets: CENSAD_BOND_MARKETS['SL'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['SL'],
}
