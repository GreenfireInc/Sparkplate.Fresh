import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
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
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['MR'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['MR'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['MR'],
  newsOutlets: BRI_NEWS_OUTLETS['MR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MR'],
  rareEarths: BRI_RARE_EARTHS['MR'],
  stockExchange: 'Bourse Notation Agréée (limited)',
  bondMarkets: BRI_BOND_MARKETS['MR'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['MR'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['MR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['MR'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['MR'],
}
