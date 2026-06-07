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

export const antiguaAndBarbuda: OecsCountry = {
  name: 'Antigua and Barbuda',
  iso3166Alpha2: 'AG',
  capital: 'St. John\'s',
  coordinates: { latitude: 17.1274, longitude: -61.8468 },
  independence:
    '1981-11-01 independent state; OECS Treaty of Basseterre 1981 founding signatory — informational',
  topMajorCities: ['St. John\'s', 'All Saints', 'Liberta', 'Potters Village', 'Bolands'],
  population: 100000,
  mainLanguages: ['English', 'Antiguan Creole', 'Spanish (minor)'],
  currency: 'East Caribbean dollar (XCD; ECCB currency union)',
  timezone: 'America/Antigua',
  foundingLeader: 'Vere Bird (first Prime Minister)',
  currentLeader: 'Prime Minister Gaston Browne — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'ECCB-region Binance P2P overlays — informational'],
  stablecoin: 'XCD USD peg via ECCB; informal USDT/USDC — informational',
  domesticCourierServices: OECS_DOMESTIC_COURIERS['AG'],
  domesticPostService: OECS_DOMESTIC_POST_SERVICES['AG'],
  nationalBankingInstitutions: OECS_NATIONAL_BANKING_INSTITUTIONS['AG'],
  corporationFormationOffice: OECS_CORPORATION_FORMATION_OFFICES['AG'],
  newsOutlets: OECS_NEWS_OUTLETS['AG'],
  notableUniversities: OECS_NOTABLE_UNIVERSITIES['AG'],
  mainExportCommodities: OECS_MAIN_EXPORT_COMMODITIES['AG'],
  mainExportedElements: OECS_MAIN_EXPORTED_ELEMENTS['AG'],
  rareEarths: OECS_RARE_EARTHS['AG'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
  bondMarkets: OECS_BOND_MARKETS['AG'],
  mainInternationalAirport: OECS_MAIN_INTERNATIONAL_AIRPORTS['AG'],
  mainInternationalSeaport: OECS_MAIN_INTERNATIONAL_SEAPORTS['AG'],
  intellectualPropertyDepartments: OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS['AG'],
  securitiesExchangeCommission: OECS_SECURITIES_EXCHANGE_COMMISSIONS['AG'],
}
