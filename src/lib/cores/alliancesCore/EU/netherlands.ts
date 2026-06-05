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

export const netherlands: EuCountry = {
  name: 'Netherlands',
  iso3166Alpha2: 'NL',
  capital: 'Amsterdam (constitutional); seat of government The Hague',
  coordinates: { latitude: 52.3676, longitude: 4.9041 },
  independence: 'Kingdom constitution continuity; EU founding 1958 — informational',
  topMajorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  population: 17800000,
  mainLanguages: ['Dutch', 'English', 'Turkish / Arabic (communities)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Amsterdam',
  foundingLeader: 'Willem Drees (post-war reference)',
  currentLeader: 'Monarch Willem-Alexander; Prime Minister Dick Schoof — verify',
  cryptocurrencyExchanges: ['Bitstamp', 'EU MiCA-aligned Dutch AFM registry'],
  stablecoin: 'EUR stablecoins; e-money institutions',
  domesticCourierServices: EU_DOMESTIC_COURIERS['NL'],
  newsOutlets: EU_NEWS_OUTLETS['NL'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['NL'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['NL'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['NL'],
  rareEarths: EU_RARE_EARTHS['NL'],
  stockExchange: 'Euronext Amsterdam',
  bondMarkets: EU_BOND_MARKETS['NL'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['NL'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['NL'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['NL'],
}
