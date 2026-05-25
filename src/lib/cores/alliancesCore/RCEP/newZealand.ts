import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'

export const newZealand: RcepCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    'Fully independent Realm evolution; Pacific trade openness; RCEP Party (2022 wave with Australia linkage — informational)',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Muldoon / Lange-era trade diplomacy reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'FMCA/DIA onboarding — informational'],
  stablecoin: 'NZD issuance thin; RB NZ digital policy evolution — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['NZ'],
  newsOutlets: RCEP_NEWS_OUTLETS['NZ'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: RCEP_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited',
  bondMarkets: RCEP_BOND_MARKETS['NZ'],
}
