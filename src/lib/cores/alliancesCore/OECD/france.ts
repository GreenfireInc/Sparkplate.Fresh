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

export const france: OecdCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; EU founding Treaty of Rome; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['FR'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['FR'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['FR'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['FR'],
  newsOutlets: OECD_NEWS_OUTLETS['FR'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: OECD_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: OECD_BOND_MARKETS['FR'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['FR'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['FR'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['FR'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['FR'],
}
