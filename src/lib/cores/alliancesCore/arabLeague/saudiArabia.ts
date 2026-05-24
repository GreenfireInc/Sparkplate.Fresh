import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const saudiArabia: ArabLeagueCountry = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  arabLeagueStatus: 'member',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence: '1932-09-23 (Kingdom unification)',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  population: 35000000,
  mainLanguages: ['Arabic', 'English (business)', 'Urdu (expatriate)'],
  currency: 'Saudi riyal (SAR)',
  timezone: 'Asia/Riyadh',
  foundingLeader: 'Ibn Saud (Abdulaziz Al Saud, first King)',
  currentLeader: 'Salman bin Abdulaziz Al Saud (King); Mohammed bin Salman (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Regional OTC', 'International P2P'],
  stablecoin: 'USDT informal; sandbox experiments',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SA'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['SA'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SA'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['SA'],
  stockExchange: 'Saudi Exchange (Tadawul)',
}
