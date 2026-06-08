import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECOWAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECOWAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECOWAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const senegal: EcowasCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  capital: 'Dakar',
  coordinates: { latitude: 14.7167, longitude: -17.4677 },
  independence: '1960-04-04',
  topMajorCities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack'],
  population: 18000000,
  mainLanguages: ['French', 'Wolof', 'Pulaar'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Dakar',
  foundingLeader: 'Léopold Sédar Senghor (first President cohort)',
  currentLeader: 'President Bassirou Diomaye Faye — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Wave-linked fintech'],
  stablecoin: 'USDT / USDC; XOF CFA peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['SN'],
  domesticPostService: ECOWAS_DOMESTIC_POST_SERVICES['SN'],
  nationalBankingInstitutions: ECOWAS_NATIONAL_BANKING_INSTITUTIONS['SN'],
  corporationFormationOffice: ECOWAS_CORPORATION_FORMATION_OFFICES['SN'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['SN'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['SN'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['SN'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['SN'],
  rareEarths: ECOWAS_RARE_EARTHS['SN'],
  stockExchange: 'BRVM (Dakar listings)',
  bondMarkets: ECOWAS_BOND_MARKETS['SN'],
  intellectualPropertyDepartments: ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['SN'],

  securitiesExchangeCommission: ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS['SN'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['SN'],
  mainInternationalSeaport: ECOWAS_MAIN_INTERNATIONAL_SEAPORTS['SN'],
}
