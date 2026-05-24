import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { GCC_NEWS_OUTLETS } from './newsOutletsByIso'
import { GCC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { GCC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const saudiArabia: GccCountry = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence:
    'Kingdom proclaimed 1932 Abdulaziz ibn Saud consolidation; GCC charter deposited; Secretariat host state — informational',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  population: 36000000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Tagalog / Bengali (expatriate communities)'],
  currency: 'Saudi riyal (SAR)',
  timezone: 'Asia/Riyadh',
  foundingLeader: 'King Abdulaziz ibn Saud Al Saud (GCC founding Custodian reference — informational)',
  currentLeader:
    'Custodian King Salman bin Abdulaziz Al Saud — verify; Crown Prime Minister Mohammed bin Salman — verify titles',
  cryptocurrencyExchanges: ['SAMA regulatory sandbox licensees; Binance Gulf regional licences — informational'],
  stablecoin: 'SAMA stablecoin issuance pilots; fiat SAR anchoring — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['SA'],
  newsOutlets: GCC_NEWS_OUTLETS['SA'],
  notableUniversities: GCC_NOTABLE_UNIVERSITIES['SA'],
  mainExportCommodities: GCC_MAIN_EXPORT_COMMODITIES['SA'],
  stockExchange: 'Tadawul Saudi Exchange (national), parallel regional listings — informational',
}
