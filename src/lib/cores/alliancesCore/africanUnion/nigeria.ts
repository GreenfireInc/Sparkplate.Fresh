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
export const nigeria: AfricanUnionCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  africanUnionStatus: 'member',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence: '1960-10-01',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 223000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba'],
  currency: 'Nigerian naira (NGN)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Abubakar Tafawa Balewa (Prime Minister)',
  currentLeader: 'Bola Tinubu (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Luno', 'Quidax', 'Busha', 'Yellow Card'],
  stablecoin: 'USDT / USDC P2P dominant; cNGN stablecoin pilots',
  domesticCourierServices: AU_DOMESTIC_COURIERS['NG'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['NG'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['NG'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['NG'],
  newsOutlets: AU_NEWS_OUTLETS['NG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: AU_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group (NGX)',
  bondMarkets: AU_BOND_MARKETS['NG'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['NG'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['NG'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['NG'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['NG'],
}
