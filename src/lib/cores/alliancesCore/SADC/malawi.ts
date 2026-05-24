import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const malawi: SadcCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21200000,
  mainLanguages: ['English', 'Chichewa', 'Chinyanja'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda (first Prime Minister)',
  currentLeader: 'President Lazarus Chakwera — verify',
  cryptocurrencyExchanges: ['Yellow Card context', 'OTC informal'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MW'],
  newsOutlets: SADC_NEWS_OUTLETS['MW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MW'],
  stockExchange: 'Malawi Stock Exchange',
}
