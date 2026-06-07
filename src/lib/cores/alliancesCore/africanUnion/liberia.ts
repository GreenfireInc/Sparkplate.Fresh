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
export const liberia: AfricanUnionCountry = {
  name: 'Liberia',
  iso3166Alpha2: 'LR',
  africanUnionStatus: 'member',
  capital: 'Monrovia',
  coordinates: { latitude: 6.3156, longitude: -10.8074 },
  independence: '1847-07-26',
  topMajorCities: ['Monrovia', 'Gbarnga', 'Buchanan', 'Kakata', 'Voinjama'],
  population: 5500000,
  mainLanguages: ['English', 'Kpelle', 'Bassa'],
  currency: 'Liberian dollar (LRD); United States dollar (USD) in circulation',
  timezone: 'Africa/Monrovia',
  foundingLeader: 'Joseph Jenkins Roberts',
  currentLeader: 'Joseph Boakai (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC; USD cash economy dominant',
  domesticCourierServices: AU_DOMESTIC_COURIERS['LR'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['LR'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['LR'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['LR'],
  newsOutlets: AU_NEWS_OUTLETS['LR'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['LR'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['LR'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['LR'],
  rareEarths: AU_RARE_EARTHS['LR'],
  stockExchange: 'Liberia Stock Exchange (very limited)',
  bondMarkets: AU_BOND_MARKETS['LR'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['LR'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['LR'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['LR'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['LR'],
}
