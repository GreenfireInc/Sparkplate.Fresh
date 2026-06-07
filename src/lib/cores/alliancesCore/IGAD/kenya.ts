import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IGAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IGAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IGAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IGAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IGAD_RARE_EARTHS } from './rareEarthsByIso'
import { IGAD_BOND_MARKETS } from './bondMarketsByIso'
import { IGAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IGAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IGAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const kenya: IgadCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2921, longitude: 36.8219 },
  independence:
    '1963-12-12 independence from UK; IGADD founding state Jan 1986; East African Community overlap — informational',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu / Luhya / regional Bantu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (independence); Daniel arap Moi IGADD-era continuity — informational',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['BitPesa / Yellow Card regional; Capital Markets Authority ICO guidance — informational'],
  stablecoin: 'KES-referenced pilots; informal USDT overlays — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['KE'],
  domesticPostService: IGAD_DOMESTIC_POST_SERVICES['KE'],
  nationalBankingInstitutions: IGAD_NATIONAL_BANKING_INSTITUTIONS['KE'],
  corporationFormationOffice: IGAD_CORPORATION_FORMATION_OFFICES['KE'],
  newsOutlets: IGAD_NEWS_OUTLETS['KE'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: IGAD_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: IGAD_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: IGAD_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: IGAD_BOND_MARKETS['KE'],
  mainInternationalAirport: IGAD_MAIN_INTERNATIONAL_AIRPORTS['KE'],
  mainInternationalSeaport: IGAD_MAIN_INTERNATIONAL_SEAPORTS['KE'],
  intellectualPropertyDepartments: IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['KE'],
  securitiesExchangeCommission: IGAD_SECURITIES_EXCHANGE_COMMISSIONS['KE'],
}
