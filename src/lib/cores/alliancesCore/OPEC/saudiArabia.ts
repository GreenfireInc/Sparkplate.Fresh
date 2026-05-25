import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'

export const saudiArabia: OpecCountry = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence:
    'Kingdom proclaimed 1932 Ibn Saud consolidation; swing-producer stature; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  population: 36000000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Tagalog / Bengali (expatriate communities)'],
  currency: 'Saudi riyal (SAR)',
  timezone: 'Asia/Riyadh',
  foundingLeader: 'King Abdulaziz ibn Saud (state founder — informational)',
  currentLeader:
    'Custodian King Salman bin Abdulaziz Al Saud — verify; Crown Prime Minister Mohammed bin Salman — verify',
  cryptocurrencyExchanges: ['SAMA sandbox licensees; regional institutional custody pilots — informational'],
  stablecoin: 'SAMA stablecoin pilots; fiat SAR anchoring — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['SA'],
  newsOutlets: OPEC_NEWS_OUTLETS['SA'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['SA'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['SA'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['SA'],
  rareEarths: OPEC_RARE_EARTHS['SA'],
  stockExchange: 'Tadawul Saudi Exchange (national benchmark — informational)',
  bondMarkets: OPEC_BOND_MARKETS['SA'],
}
