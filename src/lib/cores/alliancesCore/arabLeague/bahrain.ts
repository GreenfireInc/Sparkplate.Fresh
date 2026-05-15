import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const bahrain: ArabLeagueCountry = {
  name: 'Bahrain',
  iso3166Alpha2: 'BH',
  arabLeagueStatus: 'member',
  capital: 'Manama',
  coordinates: { latitude: 26.2235, longitude: 50.5876 },
  independence: '1971-08-15',
  topMajorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'],
  population: 1500000,
  mainLanguages: ['Arabic', 'English', 'Urdu (expatriate)'],
  currency: 'Bahraini dinar (BHD)',
  timezone: 'Asia/Bahrain',
  foundingLeader: 'Isa bin Salman Al Khalifa (Emir)',
  currentLeader: 'Hamad bin Isa Al Khalifa (King); Salman bin Hamad Al Khalifa (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Binance (regional)', 'International OTC'],
  stablecoin: 'USDT / USDC; CBDC pilots in Gulf context',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['BH'],
  stockExchange: 'Bahrain Bourse',
}
