import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'

export const iran: OpecCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  capital: 'Tehran',
  coordinates: { latitude: 35.6892, longitude: 51.389 },
  independence:
    '1979 Islamic Republic continuity references 1906 constitutional lineage; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Shiraz'],
  population: 89000000,
  mainLanguages: ['Persian (Farsi)', 'Azerbaijani (regional)', 'Kurdish (regional)'],
  currency: 'Iranian rial (IRR multifaceted official / informal FX rates — informational)',
  timezone: 'Asia/Tehran',
  foundingLeader:
    'Mohammad Mossadegh oil-nationalisation narrative; shah-era OPEC continuity — informational',
  currentLeader: 'Supreme Leader Ali Khamenei; President Masoud Pezeshkian — verify cabinet',
  cryptocurrencyExchanges:
    ['US/EU sanction-screened miners / informal mining; regulated pilot contradictions — informational'],
  stablecoin: 'Stable references via informal USD IRR parallel rates — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['IR'],
  newsOutlets: OPEC_NEWS_OUTLETS['IR'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['IR'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['IR'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['IR'],
  rareEarths: OPEC_RARE_EARTHS['IR'],
  stockExchange: 'Tehran Stock Exchange (irrational volatility episodes — informational)',
  bondMarkets: OPEC_BOND_MARKETS['IR'],
}
