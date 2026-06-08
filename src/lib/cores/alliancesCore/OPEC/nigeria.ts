import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OPEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OPEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'
import { OPEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OPEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OPEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const nigeria: OpecCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence:
    '1960 independence from UK; OPEC member since Jul 1971; NNPC / OPEC quota politics — informational',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 230000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba / Igbo regional'],
  currency: 'Nigerian naira (NGN; parallel FX-market episodes — informational)',
  timezone: 'Africa/Lagos',
  foundingLeader: 'Abubakar Tafawa Balewa federation reference — informational',
  currentLeader: 'President Bola Ahmed Tinubu — verify',
  cryptocurrencyExchanges: ['SEC cautious licensing; Patricia / Nigerian P2P with CBN evolution — informational'],
  stablecoin: 'e-Naira CBDC experimentation; informal USDT pricing — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['NG'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['NG'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['NG'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['NG'],
  newsOutlets: OPEC_NEWS_OUTLETS['NG'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: OPEC_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group NGX (Lagos equities)',
  bondMarkets: OPEC_BOND_MARKETS['NG'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['NG'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['NG'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['NG'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['NG'],
}
