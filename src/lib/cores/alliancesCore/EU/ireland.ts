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

export const ireland: EuCountry = {
  name: 'Ireland',
  iso3166Alpha2: 'IE',
  capital: 'Dublin',
  coordinates: { latitude: 53.3498, longitude: -6.2603 },
  independence: '1922 Dominion to republic evolution; EU since 1973-01-01; Euro — informational',
  topMajorCities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'],
  population: 5300000,
  mainLanguages: ['English', 'Irish (Gaelige)', 'Polish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Dublin',
  foundingLeader: 'Éamon de Valera (early state reference)',
  currentLeader: 'President Michael D. Higgins; Taoiseach — verify',
  cryptocurrencyExchanges: ['Kraken EU', 'European brokers; IDA tech hub onboarding'],
  stablecoin: 'EUR stablecoins; MiCA-aligned issuers referencing IE vehicles',
  domesticCourierServices: EU_DOMESTIC_COURIERS['IE'],
  newsOutlets: EU_NEWS_OUTLETS['IE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['IE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['IE'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['IE'],
  rareEarths: EU_RARE_EARTHS['IE'],
  stockExchange: 'Euronext Dublin',
  bondMarkets: EU_BOND_MARKETS['IE'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['IE'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['IE'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['IE'],
}
