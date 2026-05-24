import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

/** State of Palestine — UN observer; Arab League member; territorial status disputed (informational). */
export const palestine: ArabLeagueCountry = {
  name: 'Palestine',
  iso3166Alpha2: 'PS',
  arabLeagueStatus: 'member',
  capital: 'Ramallah (administrative); East Jerusalem (declared)',
  coordinates: { latitude: 31.902, longitude: 35.1954 },
  independence: '1988-11-15 (Algiers declaration of State of Palestine)',
  topMajorCities: ['Gaza City', 'Ramallah', 'Hebron', 'Nablus', 'Jenin'],
  population: 5400000,
  mainLanguages: ['Arabic', 'Hebrew (communication)', 'English'],
  currency: 'Israeli new shekel (ILS); Jordanian dinar in some contexts',
  timezone: 'Asia/Gaza',
  foundingLeader: 'Yasser Arafat (first President, PLO era)',
  currentLeader: 'Mahmoud Abbas (President, Palestinian Authority — verify mandate)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Diaspora remittance'],
  stablecoin: 'USDT informal; shekel economy dominant',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['PS'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['PS'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['PS'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['PS'],
  stockExchange: 'Palestine Securities Exchange (limited)',
}
