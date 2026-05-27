import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['SA'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['SA'],
  stockExchange: 'Saudi Exchange (Tadawul)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['SA'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['SA'],
}
