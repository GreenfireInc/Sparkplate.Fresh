import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { NATO_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { NATO_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { NATO_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const france: NatoCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; EU founding member; NATO founding Ally 1949-04-04 (Integrated Military Command evolution — informational)',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle Fourth/Fifth Republic reference — informational',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['FR'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['FR'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['FR'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['FR'],
  newsOutlets: NATO_NEWS_OUTLETS['FR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: NATO_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: NATO_BOND_MARKETS['FR'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['FR'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['FR'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['FR'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['FR'],
}
