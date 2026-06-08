import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { G7_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { G7_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G7_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G7_RARE_EARTHS } from './rareEarthsByIso'
import { G7_BOND_MARKETS } from './bondMarketsByIso'
import { G7_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G7_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G7_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { G7_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const france: G7Country = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; G7 Rambouillet host context (France as convener — informational)',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference; post-war IMF/Bretton Woods continuity — informational)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['FR'],
  domesticPostService: G7_DOMESTIC_POST_SERVICES['FR'],
  nationalBankingInstitutions: G7_NATIONAL_BANKING_INSTITUTIONS['FR'],
  corporationFormationOffice: G7_CORPORATION_FORMATION_OFFICES['FR'],
  newsOutlets: G7_NEWS_OUTLETS['FR'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: G7_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: G7_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: G7_BOND_MARKETS['FR'],
  mainInternationalAirport: G7_MAIN_INTERNATIONAL_AIRPORTS['FR'],
  mainInternationalSeaport: G7_MAIN_INTERNATIONAL_SEAPORTS['FR'],
  intellectualPropertyDepartments: G7_INTELLECTUAL_PROPERTY_DEPARTMENTS['FR'],
  securitiesExchangeCommission: G7_SECURITIES_EXCHANGE_COMMISSIONS['FR'],
}
