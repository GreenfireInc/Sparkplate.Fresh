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

export const lithuania: EuCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  capital: 'Vilnius',
  coordinates: { latitude: 54.6872, longitude: 25.2797 },
  independence: '1990 Restoration; EU 2004-05-01; Euro 2015 — informational',
  topMajorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'],
  population: 2800000,
  mainLanguages: ['Lithuanian', 'Russian', 'Polish (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vilnius',
  foundingLeader: 'Vytautas Landsbergis (Sąjūdis reference)',
  currentLeader: 'President Gitanas Nausėda; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU-licensed onboarding; Baltic fintech'],
  stablecoin: 'EUR stablecoins; ECB digital euro research participation',
  domesticCourierServices: EU_DOMESTIC_COURIERS['LT'],
  newsOutlets: EU_NEWS_OUTLETS['LT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['LT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['LT'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['LT'],
  rareEarths: EU_RARE_EARTHS['LT'],
  stockExchange: 'Nasdaq Vilnius',
  bondMarkets: EU_BOND_MARKETS['LT'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['LT'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['LT'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['LT'],
}
