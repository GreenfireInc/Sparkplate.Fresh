import type { FiveEyesCountry } from './types'
import { FIVE_EYES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { FIVE_EYES_NEWS_OUTLETS } from './newsOutletsByIso'
import { FIVE_EYES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { FIVE_EYES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { FIVE_EYES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { FIVE_EYES_RARE_EARTHS } from './rareEarthsByIso'
import { FIVE_EYES_BOND_MARKETS } from './bondMarketsByIso'

export const newZealand: FiveEyesCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    '1907 Dominion status; substantive autonomy from Westminster; Westminster Statute applicability; WWII UKUSA-aligned partner — informational',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Post-war integration under successive PMs linking NZ signals partners to Anglo-American core — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'Digital asset providers under FMCA/DIA registration context — informational'],
  stablecoin: 'NZD-referenced crypto (private); RB NZ policy evolution — informational',
  domesticCourierServices: FIVE_EYES_DOMESTIC_COURIERS['NZ'],
  newsOutlets: FIVE_EYES_NEWS_OUTLETS['NZ'],
  notableUniversities: FIVE_EYES_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: FIVE_EYES_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: FIVE_EYES_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: FIVE_EYES_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited (NZ markets — informational)',
  bondMarkets: FIVE_EYES_BOND_MARKETS['NZ'],
}
