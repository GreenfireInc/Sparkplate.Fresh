import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'

export const singapore: RcepCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 separation from Malaysia; ASEAN founder hub; RCEP Party mega trade-finance node 2022 — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil communities'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew developmental state reference — informational',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing; institutional OTC — informational'],
  stablecoin: 'MAS stable-token guidelines — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['SG'],
  newsOutlets: RCEP_NEWS_OUTLETS['SG'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: RCEP_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange SGX',
  bondMarkets: RCEP_BOND_MARKETS['SG'],
}
