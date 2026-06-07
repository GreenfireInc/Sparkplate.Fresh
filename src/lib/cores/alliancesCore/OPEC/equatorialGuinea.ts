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

export const equatorialGuinea: OpecCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  capital: 'Malabo (insular administrative); Oyala mainland capital project — informational',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence:
    '1968 independence from Spain; liquefied-gas prominence; OPEC member since May 2017 — informational',
  topMajorCities: ['Malabo', 'Bata', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Pidgin / Fang / Bubi regional)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema-era contrast Teodoro Obiang continuity — informational',
  currentLeader: 'President Teodoro Obiang Nguema — verify succession planning',
  cryptocurrencyExchanges: ['Strict banking environment; OTC sparse — informational'],
  stablecoin: 'USD/EUR pricing of hydrocarbons; informal stable settlement — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['GQ'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['GQ'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['GQ'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['GQ'],
  newsOutlets: OPEC_NEWS_OUTLETS['GQ'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['GQ'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['GQ'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['GQ'],
  rareEarths: OPEC_RARE_EARTHS['GQ'],
  stockExchange: 'Malabo regional listings nascent / thin — informational',
  bondMarkets: OPEC_BOND_MARKETS['GQ'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['GQ'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['GQ'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['GQ'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['GQ'],
}
