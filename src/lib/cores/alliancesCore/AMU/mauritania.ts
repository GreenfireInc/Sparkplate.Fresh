import type { AmuCountry } from './types'
import { AMU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AMU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AMU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AMU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AMU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AMU_RARE_EARTHS } from './rareEarthsByIso'
import { AMU_BOND_MARKETS } from './bondMarketsByIso'
import { AMU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AMU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AMU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const mauritania: AmuCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  amuStatus: 'founding_member',
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
  domesticCourierServices: AMU_DOMESTIC_COURIERS['MR'],
  newsOutlets: AMU_NEWS_OUTLETS['MR'],
  notableUniversities: AMU_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: AMU_MAIN_EXPORT_COMMODITIES['MR'],
  mainExportedElements: AMU_MAIN_EXPORTED_ELEMENTS['MR'],
  rareEarths: AMU_RARE_EARTHS['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
  bondMarkets: AMU_BOND_MARKETS['MR'],
  intellectualPropertyDepartments: AMU_INTELLECTUAL_PROPERTY_DEPARTMENTS['MR'],
  securitiesExchangeCommission: AMU_SECURITIES_EXCHANGE_COMMISSIONS['MR'],
  mainInternationalAirport: AMU_MAIN_INTERNATIONAL_AIRPORTS['MR'],
}
