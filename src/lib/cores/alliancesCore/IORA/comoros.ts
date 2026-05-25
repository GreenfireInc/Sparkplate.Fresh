import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'

export const comoros: IoraCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.6986, longitude: 43.2551 },
  independence:
    '1975 independence from France federation evolution; Mozambique Channel Indian Ocean positioning; IORA member — informational',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 860000,
  mainLanguages: ['Comorian', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF pegged EUR via French Treasury mechanism — informational)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah Mohamed reference — informational',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Thin formal licensing; diaspora OTC — informational'],
  stablecoin: 'EUR informal pricing; scarce onshore rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['KM'],
  newsOutlets: IORA_NEWS_OUTLETS['KM'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: IORA_RARE_EARTHS['KM'],
  stockExchange: 'No substantive national equities market — informational',
  bondMarkets: IORA_BOND_MARKETS['KM'],
}
