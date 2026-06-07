import type { OecsCountry } from './types'
import { OECS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECS_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECS_RARE_EARTHS } from './rareEarthsByIso'
import { OECS_BOND_MARKETS } from './bondMarketsByIso'
import { OECS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const anguilla: OecsCountry = {
  name: 'Anguilla',
  iso3166Alpha2: 'AI',
  capital: 'The Valley',
  coordinates: { latitude: 18.2206, longitude: -63.0686 },
  independence:
    'British Overseas Territory (UK); OECS associate / third-party participation per accession instruments — verify status',
  topMajorCities: ['The Valley', 'Stoney Ground', 'Island Harbour', 'Blowing Point', 'Sandy Ground'],
  population: 16000,
  mainLanguages: ['English', 'Anguillian Creole', 'Spanish (regional)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Anguilla',
  foundingLeader: 'Chief Minister-era self-government reference — informational',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'offshore services proximity — informational'],
  stablecoin: 'XCD peg; informal USDT — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['AI'],
  domesticPostService: OECS_DOMESTIC_POST_SERVICES['AI'],
  nationalBankingInstitutions: OECS_NATIONAL_BANKING_INSTITUTIONS['AI'],
  corporationFormationOffice: OECS_CORPORATION_FORMATION_OFFICES['AI'],
  newsOutlets: OECS_NEWS_OUTLETS['AI'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['AI'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['AI'],
  mainExportedElements: OECS_MAIN_EXPORTED_ELEMENTS['AI'],
  rareEarths: OECS_RARE_EARTHS['AI'],
  stockExchange: 'No dedicated national exchange; regional ECSE context — informational',
  bondMarkets: OECS_BOND_MARKETS['AI'],
  mainInternationalAirport: OECS_MAIN_INTERNATIONAL_AIRPORTS['AI'],
  mainInternationalSeaport: OECS_MAIN_INTERNATIONAL_SEAPORTS['AI'],
  intellectualPropertyDepartments: OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS['AI'],
  securitiesExchangeCommission: OECS_SECURITIES_EXCHANGE_COMMISSIONS['AI'],
}
