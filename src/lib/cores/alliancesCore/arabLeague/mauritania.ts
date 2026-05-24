import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const mauritania: ArabLeagueCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  arabLeagueStatus: 'member',
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
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['MR'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['MR'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
}
