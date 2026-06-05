import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const mauritania: CensadCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  capital: 'Nouakchott',
  coordinates: { latitude: 18.0735, longitude: -15.9582 },
  independence: '1960-11-28',
  topMajorCities: ['Nouakchott', 'Nouadhibou', 'Néma', 'Kaédi', 'Zouérat'],
  population: 4940000,
  mainLanguages: ['Arabic (Hassaniya)', 'French', 'Pulaar'],
  currency: 'Ouguiya (MRU)',
  timezone: 'Africa/Nouakchott',
  foundingLeader: 'Moktar Ould Daddah (first president)',
  currentLeader: 'President Mohamed Ould Ghazouani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['MR'],
  newsOutlets: CENSAD_NEWS_OUTLETS['MR'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['MR'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['MR'],
  rareEarths: CENSAD_RARE_EARTHS['MR'],
  stockExchange: 'Bourse de Mauritanie (Nouakchott — verify depth)',
  bondMarkets: CENSAD_BOND_MARKETS['MR'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['MR'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['MR'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['MR'],
}
