import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const tunisia: ArabLeagueCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  arabLeagueStatus: 'member',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  population: 12000000,
  mainLanguages: ['Arabic (Tunisian)', 'French', 'Berber'],
  currency: 'Tunisian dinar (TND)',
  timezone: 'Africa/Tunis',
  foundingLeader: 'Habib Bourguiba',
  currentLeader: 'Kais Saied (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'OTC'],
  stablecoin: 'USDT informal; e-dinar discussions',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['TN'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['TN'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['TN'],
  stockExchange: 'Bourse de Tunis',
}
