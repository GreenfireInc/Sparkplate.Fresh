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

export const southSudan: IgadCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence:
    '2011-07-09 independence from Sudan; IGAD admitted 2011; participation suspended Dec 2021 per Summit decisions — verify current status',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Bor'],
  population: 11500000,
  mainLanguages: ['English (official)', 'Dinka', 'Nuer / regional languages'],
  currency: 'South Sudanese pound (SSP; hyperinflationary episodes; USD informal — informational)',
  timezone: 'Africa/Juba',
  foundingLeader: 'Dr John Garang reference (SPLM liberation-to-state continuity — informational)',
  currentLeader: 'President Salva Kiir Mayardit — verify; First Vice President — verify (R-ARCSS implementation)',
  cryptocurrencyExchanges: ['Mobile money informal; regional sanctions compliance overlays — informational'],
  stablecoin: 'USD cash economy dominant; SSP digital thin — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['SS'],
  domesticPostService: IGAD_DOMESTIC_POST_SERVICES['SS'],
  nationalBankingInstitutions: IGAD_NATIONAL_BANKING_INSTITUTIONS['SS'],
  corporationFormationOffice: IGAD_CORPORATION_FORMATION_OFFICES['SS'],
  newsOutlets: IGAD_NEWS_OUTLETS['SS'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['SS'],
  mainExportCommodities: IGAD_MAIN_EXPORT_COMMODITIES['SS'],
  mainExportedElements: IGAD_MAIN_EXPORTED_ELEMENTS['SS'],
  rareEarths: IGAD_RARE_EARTHS['SS'],
  stockExchange: 'No national exchange consolidated (Juba financial-market nascent — informational)',
  bondMarkets: IGAD_BOND_MARKETS['SS'],
  mainInternationalAirport: IGAD_MAIN_INTERNATIONAL_AIRPORTS['SS'],
  mainInternationalSeaport: IGAD_MAIN_INTERNATIONAL_SEAPORTS['SS'],
  intellectualPropertyDepartments: IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['SS'],
  securitiesExchangeCommission: IGAD_SECURITIES_EXCHANGE_COMMISSIONS['SS'],
}
