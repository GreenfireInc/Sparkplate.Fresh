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
export const rwanda: AfricanUnionCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  africanUnionStatus: 'member',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Butare (Huye)', 'Gitarama (Muhanga)', 'Musanze', 'Cyangugu'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda',
  currentLeader: 'Paul Kagame (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Blockchain hub initiatives'],
  stablecoin: 'USDT / USDC; central bank exploring CBDC',
  domesticCourierServices: AU_DOMESTIC_COURIERS['RW'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['RW'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['RW'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['RW'],
  newsOutlets: AU_NEWS_OUTLETS['RW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: AU_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['RW'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['RW'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['RW'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['RW'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['RW'],
}
