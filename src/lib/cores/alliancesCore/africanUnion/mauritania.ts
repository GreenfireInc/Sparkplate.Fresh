import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
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
  domesticPostService: AU_DOMESTIC_POST_SERVICES['MR'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['MR'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['MR'],
  newsOutlets: AU_NEWS_OUTLETS['MR'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MR'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MR'],
  rareEarths: AU_RARE_EARTHS['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
  bondMarkets: AU_BOND_MARKETS['MR'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['MR'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['MR'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['MR'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['MR'],
}
