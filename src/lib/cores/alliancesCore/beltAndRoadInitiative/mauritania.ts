import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const mauritania: BeltAndRoadInitiativeCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nouakchott',
  coordinates: { latitude: 18.0735, longitude: -15.9582 },
  independence: '1960-11-28',
  topMajorCities: ['Nouakchott', 'Nouadhibou', 'Néma', 'Kaédi', 'Rosso'] as [string, string, string, string, string],
  population: 4927532,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Mauritanian ouguiya (MRU)',
  timezone: 'UTC',
  foundingLeader: 'Moktar Ould Daddah',
  currentLeader: 'Mohamed Ould Ghazouani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC', 'Peer-to-peer networks'],
  stablecoin: 'USDT informal; no MRU stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MR'],
  newsOutlets: BRI_NEWS_OUTLETS['MR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
}
