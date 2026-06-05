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

export const slovakia: EuCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  capital: 'Bratislava',
  coordinates: { latitude: 48.1486, longitude: 17.1077 },
  independence: '1993 Velvet Divorce; EU 2004-05-01; Euro 2009 — informational',
  topMajorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra'],
  population: 5400000,
  mainLanguages: ['Slovak', 'Hungarian (minority)', 'Romani'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Bratislava',
  foundingLeader: 'Michal Kováč (first president era reference)',
  currentLeader: 'President Peter Pellegrini; Prime Minister Robert Fico — verify',
  cryptocurrencyExchanges: ['European MiCA CASPs onboarding SK retail'],
  stablecoin: 'EUR stablecoins; banking integration',
  domesticCourierServices: EU_DOMESTIC_COURIERS['SK'],
  newsOutlets: EU_NEWS_OUTLETS['SK'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['SK'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['SK'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['SK'],
  rareEarths: EU_RARE_EARTHS['SK'],
  stockExchange: 'Bratislava Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['SK'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['SK'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['SK'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['SK'],
}
