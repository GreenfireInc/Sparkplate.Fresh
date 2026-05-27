import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const southAfrica: SadcCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence:
    '1994-04-27 (Freedom Day democratic transition); Union heritage 1910 — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Gqeberha'],
  population: 62000000,
  mainLanguages: ['IsiZulu', 'Afrikaans', 'English'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela (first President post-apartheid era)',
  currentLeader:
    'President Cyril Ramaphosa — verify (cabinet may reflect coalition eras post-2024)',
  cryptocurrencyExchanges: ['Revix', 'Global P2P; FSCA licensing evolution'],
  stablecoin: 'ZARP ZAR-pegged token narrative; informal USDT/USDC',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['ZA'],
  newsOutlets: SADC_NEWS_OUTLETS['ZA'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: SADC_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
  bondMarkets: SADC_BOND_MARKETS['ZA'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['ZA'],
}
