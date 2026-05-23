import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const somalia: ArabLeagueCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  arabLeagueStatus: 'member',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian (legacy)'],
  currency: 'Somali shilling (SOS); United States dollar widely used',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SO'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['SO'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SO'],
  stockExchange: 'No functioning national exchange',
}
