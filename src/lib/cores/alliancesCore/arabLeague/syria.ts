import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const syria: ArabLeagueCountry = {
  name: 'Syria',
  iso3166Alpha2: 'SY',
  arabLeagueStatus: 'member',
  capital: 'Damascus',
  coordinates: { latitude: 33.5138, longitude: 36.2765 },
  independence: '1946-04-17',
  topMajorCities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama'],
  population: 23000000,
  mainLanguages: ['Arabic', 'Kurdish', 'Armenian (minority)'],
  currency: 'Syrian pound (SYP)',
  timezone: 'Asia/Damascus',
  foundingLeader: 'Shukri al-Quwatli (Republic era)',
  currentLeader: 'Ahmed al-Sharaa (President; transitional context — verify)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Sanctions-affected rails'],
  stablecoin: 'USDT informal; heavily depreciated SYP',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SY'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SY'],
  stockExchange: 'Damascus Securities Exchange (limited)',
}
