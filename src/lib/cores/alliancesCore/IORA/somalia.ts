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

export const somalia: IoraCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence:
    '1960 republic formation lineage; Horn of Africa / western Indian Ocean exposure; fragile federal restoration; IORA member — informational',
  topMajorCities: ['Mogadishu', 'Bosaso', 'Kismayo', 'Baidoa', 'Garowe'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian legacy / English education'],
  currency: 'Somali shilling (SOS nominal; USD predominant informal)',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Post-conflict transitional-federal roadmap leaders — informational',
  currentLeader: 'President Hassan Sheikh Mohamud — verify; Prime Minister — verify federal bargains',
  cryptocurrencyExchanges: ['Mobile-money economy; OTC informal — informational'],
  stablecoin: 'USD/USDT hawala overlays predominant — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SO'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['SO'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['SO'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['SO'],
  newsOutlets: IORA_NEWS_OUTLETS['SO'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: IORA_RARE_EARTHS['SO'],
  stockExchange: 'No consolidated national exchange (fragmented governance — informational)',
  bondMarkets: IORA_BOND_MARKETS['SO'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['SO'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['SO'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['SO'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['SO'],
}
