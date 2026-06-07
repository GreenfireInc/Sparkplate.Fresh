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
export const seychelles: AfricanUnionCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  africanUnionStatus: 'member',
  capital: 'Victoria (Mahé)',
  coordinates: { latitude: -4.6232, longitude: 55.4524 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'English', 'French'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Binance (offshore registrations historically)', 'International brokers'],
  stablecoin: 'USDT / USDC; offshore financial services sector',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SC'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['SC'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['SC'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['SC'],
  newsOutlets: AU_NEWS_OUTLETS['SC'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SC'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SC'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SC'],
  rareEarths: AU_RARE_EARTHS['SC'],
  stockExchange: 'Merjep (Seychelles Securities Exchange) — niche',
  bondMarkets: AU_BOND_MARKETS['SC'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['SC'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['SC'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['SC'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['SC'],
}
