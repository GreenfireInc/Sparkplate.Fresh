import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const saintKittsAndNevis: OecsCountry = {
  name: 'Saint Kitts and Nevis',
  iso3166Alpha2: 'KN',
  capital: 'Basseterre',
  coordinates: { latitude: 17.3026, longitude: -62.7177 },
  independence:
    '1983-09-19 independent federation; Basseterre-era seven-party grouping continuity (St Kitts–Nevis–Anguilla split history — informational)',
  topMajorCities: ['Basseterre', 'Charlestown', 'Sandy Point', 'Cayon', 'Dieppe Bay'],
  population: 53000,
  mainLanguages: ['English', 'Saint Kitts Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/St_Kitts',
  foundingLeader: 'Kennedy Simmonds (first Prime Minister post-independence era)',
  currentLeader: 'Prime Minister Terrance Drew — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Nevis IBC fintech proximity — informational'],
  stablecoin: 'XCD peg; informal USDT — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['KN'],
  newsOutlets: OECS_NEWS_OUTLETS['KN'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['KN'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
