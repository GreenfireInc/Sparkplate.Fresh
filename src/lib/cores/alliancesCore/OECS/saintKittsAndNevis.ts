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

export const saintKittsAndNevis: OecsCountry = {
  name: 'Saint Kitts and Nevis',
  iso3166Alpha2: 'KN',
  capital: 'Basseterre',
  coordinates: { latitude: 17.3026, longitude: -62.7177 },
  independence:
    '1983-09-19 independent federation; Basseterre-era seven-party grouping continuity (St Kitts–Nevis–Anguilla split history — informational)',
  topMajorCities: ['Basseterre', 'Charlestown', 'Sandy Point', 'Cayon', 'Dieppe Bay'],
  population: 53000,
  mainLanguages: ['English', 'Saint Kitts Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/St_Kitts',
  foundingLeader: 'Kennedy Simmonds (first Prime Minister post-independence era)',
  currentLeader: 'Prime Minister Terrance Drew — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Nevis IBC fintech proximity — informational'],
  stablecoin: 'XCD peg; informal USDT — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['KN'],
  domesticPostService: OECS_DOMESTIC_POST_SERVICES['KN'],
  nationalBankingInstitutions: OECS_NATIONAL_BANKING_INSTITUTIONS['KN'],
  corporationFormationOffice: OECS_CORPORATION_FORMATION_OFFICES['KN'],
  newsOutlets: OECS_NEWS_OUTLETS['KN'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['KN'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['KN'],
  mainExportedElements: OECS_MAIN_EXPORTED_ELEMENTS['KN'],
  rareEarths: OECS_RARE_EARTHS['KN'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: OECS_BOND_MARKETS['KN'],
  mainInternationalAirport: OECS_MAIN_INTERNATIONAL_AIRPORTS['KN'],
  mainInternationalSeaport: OECS_MAIN_INTERNATIONAL_SEAPORTS['KN'],
  intellectualPropertyDepartments: OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS['KN'],
  securitiesExchangeCommission: OECS_SECURITIES_EXCHANGE_COMMISSIONS['KN'],
}
