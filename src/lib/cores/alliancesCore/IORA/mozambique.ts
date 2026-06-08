import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const mozambique: IoraCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence:
    '1975 independence from Portugal; Channel / Southwest Indian Ocean coastline; IORA member — informational',
  topMajorCities: ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio'],
  population: 34000000,
  mainLanguages: ['Portuguese', 'Makhuwa', 'Tsonga / Sena regional'],
  currency: 'Mozambican metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel liberation reference — informational',
  currentLeader: 'President Daniel Chapo — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Informal P2P; banking dollarisation episodes — informational'],
  stablecoin: 'USD informal settlement in extractives corridors — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MZ'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['MZ'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['MZ'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['MZ'],
  newsOutlets: IORA_NEWS_OUTLETS['MZ'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MZ'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['MZ'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['MZ'],
  rareEarths: IORA_RARE_EARTHS['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique (Maputo — informational)',
  bondMarkets: IORA_BOND_MARKETS['MZ'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['MZ'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['MZ'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['MZ'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['MZ'],
}
