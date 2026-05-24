import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const myanmar: AseanCountry = {
  name: 'Myanmar',
  iso3166Alpha2: 'MM',
  capital: 'Nay Pyi Taw (de jure); Yangon largest city',
  coordinates: { latitude: 19.7633, longitude: 96.0785 },
  independence:
    '1948 independence from UK; post-2021 junta governance; ASEAN member since Jul 1997 — informational',
  topMajorCities: ['Yangon', 'Mandalay', 'Nay Pyi Taw', 'Mawlamyine', 'Bago'],
  population: 54000000,
  mainLanguages: ['Burmese', 'Shan', 'Karen / regional languages'],
  currency: 'Myanmar kyat (MMK banking disruption episodes — informational)',
  timezone: 'Asia/Yangon',
  foundingLeader: 'Aung San independence martyr reference — informational',
  currentLeader:
    'State Administration Council chair Senior General Min Aung Hlaing — verify international recognition',
  cryptocurrencyExchanges: ['CBM restrictive; informal USDT prevalent under sanctions context — informational'],
  stablecoin: 'USD informal settlement; MMK volatility — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['MM'],
  newsOutlets: ASEAN_NEWS_OUTLETS['MM'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['MM'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['MM'],
  stockExchange: 'Yangon Stock Exchange (operational constraints — informational)',
}
