import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'

export const tanzania: IoraCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence:
    '1964 Tanzania union Tanganyika Zanzibar; Kilwa / Dar Indian Ocean littoral gateways; IORA member — informational',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Sukuma / Nyamwezi regional'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere unity reference — informational',
  currentLeader:
    'President Samia Suluhu Hassan — verify Zanzibar co-sovereignty politics',
  cryptocurrencyExchanges: ['BOT cautious licensing; diaspora OTC — informational'],
  stablecoin: 'USD informal TZS parallel segments — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['TZ'],
  newsOutlets: IORA_NEWS_OUTLETS['TZ'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: IORA_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
  bondMarkets: IORA_BOND_MARKETS['TZ'],
}
