import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const namibia: SadcCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5609, longitude: 17.0658 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Rundu', 'Walvis Bay', 'Swakopmund', 'Oshakati'],
  population: 2700000,
  mainLanguages: ['English', 'Oshiwambo', 'Afrikaans'],
  currency: 'Namibian dollar (NAD); South African rand legal tender',
  timezone: 'Africa/Windhoek',
  foundingLeader: 'Sam Nujoma (first President)',
  currentLeader: 'President Netumbo Nandi-Ndaitwah — verify',
  cryptocurrencyExchanges: ['Informal OTC; regulatory posture evolving'],
  stablecoin: 'Rand-pegged NAD; informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['NA'],
  newsOutlets: SADC_NEWS_OUTLETS['NA'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['NA'],
  stockExchange: 'Namibian Stock Exchange (NSX)',
}
