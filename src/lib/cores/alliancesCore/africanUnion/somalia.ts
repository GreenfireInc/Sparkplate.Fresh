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
export const somalia: AfricanUnionCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  africanUnionStatus: 'member',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian (legacy)'],
  currency: 'Somali shilling (SOS); United States dollar widely used',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SO'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['SO'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['SO'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['SO'],
  newsOutlets: AU_NEWS_OUTLETS['SO'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: AU_RARE_EARTHS['SO'],
  stockExchange: 'No functioning national exchange',
  bondMarkets: AU_BOND_MARKETS['SO'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['SO'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['SO'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['SO'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['SO'],
}
