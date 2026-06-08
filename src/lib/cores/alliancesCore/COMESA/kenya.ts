import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMESA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMESA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMESA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const kenya: ComesaCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (first President)',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local startups'],
  stablecoin: 'USDT / USDC; regulatory stance evolving — verify',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['KE'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['KE'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['KE'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['KE'],
  newsOutlets: COMESA_NEWS_OUTLETS['KE'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: COMESA_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: COMESA_BOND_MARKETS['KE'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['KE'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['KE'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['KE'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['KE'],
}
