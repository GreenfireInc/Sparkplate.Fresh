import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const spain: EuCountry = {
  name: 'Spain',
  iso3166Alpha2: 'ES',
  capital: 'Madrid',
  coordinates: { latitude: 40.4168, longitude: -3.7038 },
  independence: '1978 Constitution monarchy continuity; EU 1986; Euro — informational',
  topMajorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  population: 48100000,
  mainLanguages: ['Spanish (Castilian)', 'Catalan / Galician / Basque (co-official regions)', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Madrid',
  foundingLeader: 'Adolfo Suárez (transition reference)',
  currentLeader: 'King Felipe VI; President of Government Pedro Sánchez — verify elections',
  cryptocurrencyExchanges: ['Bit2Me', 'European MiCA registry ES CNMV'],
  stablecoin: 'EUR stablecoins; Iberian liquidity',
  domesticCourierServices: EU_DOMESTIC_COURIERS['ES'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['ES'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['ES'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['ES'],
  newsOutlets: EU_NEWS_OUTLETS['ES'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['ES'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['ES'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['ES'],
  rareEarths: EU_RARE_EARTHS['ES'],
  stockExchange: 'BME Growth / Euronext Spain context',
  bondMarkets: EU_BOND_MARKETS['ES'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['ES'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['ES'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['ES'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['ES'],
}
