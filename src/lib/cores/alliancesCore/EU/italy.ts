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

export const italy: EuCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence: '1946 republic; EU founding member lineage — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader: 'Alcide De Gasperi (Republic / integration reference)',
  currentLeader: 'President Sergio Mattarella / successor — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots',
  domesticCourierServices: EU_DOMESTIC_COURIERS['IT'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['IT'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['IT'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['IT'],
  newsOutlets: EU_NEWS_OUTLETS['IT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['IT'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['IT'],
  rareEarths: EU_RARE_EARTHS['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
  bondMarkets: EU_BOND_MARKETS['IT'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['IT'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['IT'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['IT'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['IT'],
}
