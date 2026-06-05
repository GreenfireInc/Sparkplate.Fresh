import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const france: EuCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence: 'Fifth Republic continuity; EU founding state Treaty of Rome — informational',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / Breton / Alsatian (regional)', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots',
  domesticCourierServices: EU_DOMESTIC_COURIERS['FR'],
  newsOutlets: EU_NEWS_OUTLETS['FR'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: EU_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: EU_BOND_MARKETS['FR'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['FR'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['FR'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['FR'],
}
