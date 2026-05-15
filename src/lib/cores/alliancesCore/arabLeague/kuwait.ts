import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const kuwait: ArabLeagueCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  arabLeagueStatus: 'member',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence: '1961-06-19',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Al Jahra'],
  population: 4500000,
  mainLanguages: ['Arabic', 'English', 'Hindi/Urdu (expatriate)'],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'Asia/Kuwait',
  foundingLeader: 'Abdullah Al-Salim Al-Sabah (Emir)',
  currentLeader: 'Mishal Al-Ahmad Al-Jaber Al-Sabah (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; no major local spot exchange'],
  stablecoin: 'USDT / USDC informal; oil-economy USD links',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['KW'],
  stockExchange: 'Boursa Kuwait',
}
