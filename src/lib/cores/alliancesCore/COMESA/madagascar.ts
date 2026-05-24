import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const madagascar: ComesaCountry = {
  name: 'Madagascar',
  iso3166Alpha2: 'MG',
  capital: 'Antananarivo',
  coordinates: { latitude: -18.8792, longitude: 47.5079 },
  independence: '1960-06-26',
  topMajorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'],
  population: 30000000,
  mainLanguages: ['Malagasy', 'French', 'English (official, limited daily use)'],
  currency: 'Malagasy ariary (MGA)',
  timezone: 'Indian/Antananarivo',
  foundingLeader: 'Philibert Tsiranana (first President republic)',
  currentLeader:
    'President Andry Rajoelina — verify (AU suspended status informational; COMESA participation — verify)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'International brokers'],
  stablecoin: 'USDT informal; no MGA stablecoin',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['MG'],
  newsOutlets: COMESA_NEWS_OUTLETS['MG'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['MG'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['MG'],
  stockExchange: 'Madagascar Stock Exchange (SEM)',
}
