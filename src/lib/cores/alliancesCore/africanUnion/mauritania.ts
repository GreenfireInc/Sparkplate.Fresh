import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const mauritania: AfricanUnionCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  africanUnionStatus: 'member',
  capital: 'Nouakchott',
  coordinates: { latitude: 18.0735, longitude: -15.9582 },
  independence: '1960-11-28',
  topMajorCities: ['Nouakchott', 'Nouadhibou', 'Néma', 'Kaédi', 'Rosso'],
  population: 5000000,
  mainLanguages: ['Arabic (Hassaniya)', 'French', 'Pulaar'],
  currency: 'Mauritanian ouguiya (MRU)',
  timezone: 'Africa/Nouakchott',
  foundingLeader: 'Moktar Ould Daddah',
  currentLeader: 'Mohamed Ould Ghazouani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC', 'Peer-to-peer networks'],
  stablecoin: 'USDT informal; no MRU stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MR'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
}
