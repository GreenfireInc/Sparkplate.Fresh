import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'

export const republicOfTheCongo: OpecCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence:
    '1960 independence from France; hydrocarbon rents central; OPEC member since Jun 2018 — informational',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Impfondo'],
  population: 6000000,
  mainLanguages: ['French', 'Lingala', 'Kituba / Munukutuba regional'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Brazzaville',
  foundingLeader: 'Fulbert Youlou autonomy reference; Sassou-era continuity — informational',
  currentLeader: 'President Denis Sassou-Nguesso — verify',
  cryptocurrencyExchanges: ['Regional OTC; banking USD rails — informational'],
  stablecoin: 'EUR-pegged XAF; informal USDT overlays — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['CG'],
  newsOutlets: OPEC_NEWS_OUTLETS['CG'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['CG'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['CG'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['CG'],
  rareEarths: OPEC_RARE_EARTHS['CG'],
  stockExchange: 'Brazaafrica listings thin; Congo regional bourse narratives — informational',
  bondMarkets: OPEC_BOND_MARKETS['CG'],
}
