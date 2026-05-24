import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const zimbabwe: SadcCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'],
  population: 16300000,
  mainLanguages: ['English', 'Shona', 'Ndebele'],
  currency: 'Zimbabwe Gold (ZiG successor era); multicurrency contexts — verify',
  timezone: 'Africa/Harare',
  foundingLeader: 'Robert Mugabe (first Prime Minister 1980 era)',
  currentLeader:
    'President Emmerson Mnangagwa — verify (election cycles and GNU narratives)',
  cryptocurrencyExchanges: ['Heavy informal USDT/USDC amidst FX stress'],
  stablecoin: 'Informal USD and stablecoins domestically predominant',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['ZW'],
  newsOutlets: SADC_NEWS_OUTLETS['ZW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
}
