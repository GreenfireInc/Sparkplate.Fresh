import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'

export const eswatini: SadcCountry = {
  name: 'Eswatini',
  iso3166Alpha2: 'SZ',
  capital: 'Mbabane (administrative); Lobamba (royal / legislative)',
  coordinates: { latitude: -26.3054, longitude: 31.1367 },
  independence: '1968-09-06 (Swaziland independence; renamed Eswatini 2018)',
  topMajorCities: ['Mbabane', 'Manzini', 'Big Bend', 'Malkerns', 'Nhlangano'],
  population: 1200000,
  mainLanguages: ['siSwati', 'English', 'Zulu influence'],
  currency: 'Swazi lilangeni (SZL); South African rand (ZAR) legal tender',
  timezone: 'Africa/Mbabane',
  foundingLeader: 'Sobhuza II (King; independence-era)',
  currentLeader: 'King Mswati III; Prime Minister Russell Dlamini — verify',
  cryptocurrencyExchanges: ['Informal P2P; formal regime limited'],
  stablecoin: 'Rand peg context; informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['SZ'],
  newsOutlets: SADC_NEWS_OUTLETS['SZ'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['SZ'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['SZ'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['SZ'],
  rareEarths: SADC_RARE_EARTHS['SZ'],
  stockExchange: 'Eswatini Stock Exchange — verify liquidity',
  bondMarkets: SADC_BOND_MARKETS['SZ'],
}
