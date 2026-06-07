import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const italy: OecdCountry = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence:
    '1946 republic continuity; EU founding lineage; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader: 'Alcide De Gasperi (integration reference)',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IT'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['IT'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['IT'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['IT'],
  newsOutlets: OECD_NEWS_OUTLETS['IT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['IT'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['IT'],
  rareEarths: OECD_RARE_EARTHS['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
  bondMarkets: OECD_BOND_MARKETS['IT'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['IT'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['IT'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['IT'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['IT'],
}
