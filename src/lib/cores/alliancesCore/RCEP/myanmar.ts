import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const myanmar: RcepCountry = {
  name: 'Myanmar',
  iso3166Alpha2: 'MM',
  capital: 'Nay Pyi Taw (de jure); Yangon largest city',
  coordinates: { latitude: 19.7633, longitude: 96.0785 },
  independence:
    '1948 independence from UK; ASEAN member; RCEP signatory ratification trajectory — verify against depositary Gazette (post-2021 governance)',
  topMajorCities: ['Yangon', 'Mandalay', 'Nay Pyi Taw', 'Mawlamyine', 'Bago'],
  population: 54000000,
  mainLanguages: ['Burmese', 'Shan', 'Karen languages regional'],
  currency: 'Myanmar kyat (MMK banking disruption — informational)',
  timezone: 'Asia/Yangon',
  foundingLeader: 'Aung San reference — informational',
  currentLeader:
    'Senior General Min Aung Hlaing SAC chair — verify international recognition nuances',
  cryptocurrencyExchanges: ['Sanctions overlays; informal USDT economy — informational'],
  stablecoin: 'USD informal; MMK volatility — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['MM'],
  newsOutlets: RCEP_NEWS_OUTLETS['MM'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['MM'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['MM'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['MM'],
  rareEarths: RCEP_RARE_EARTHS['MM'],
  stockExchange: 'Yangon Stock Exchange (constrained liquidity — informational)',
  bondMarkets: RCEP_BOND_MARKETS['MM'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['MM'],
}
