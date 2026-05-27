import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const madagascar: SadcCountry = {
  name: 'Madagascar',
  iso3166Alpha2: 'MG',
  capital: 'Antananarivo',
  coordinates: { latitude: -18.8792, longitude: 47.5079 },
  independence: '1960-06-26',
  topMajorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'],
  population: 30300000,
  mainLanguages: ['Malagasy', 'French', 'English (limited official use)'],
  currency: 'Malagasy ariary (MGA)',
  timezone: 'Indian/Antananarivo',
  foundingLeader: 'Philibert Tsiranana (first President republic)',
  currentLeader: 'President Andry Rajoelina — verify',
  cryptocurrencyExchanges: ['Informal P2P; regulatory evolution'],
  stablecoin: 'Informal EUR/USD-stable references',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MG'],
  newsOutlets: SADC_NEWS_OUTLETS['MG'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MG'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['MG'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['MG'],
  rareEarths: SADC_RARE_EARTHS['MG'],
  stockExchange: 'Madagascar Stock Exchange (SEM) — thin market',
  bondMarkets: SADC_BOND_MARKETS['MG'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['MG'],
}
