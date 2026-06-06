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

export const greece: EuCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  capital: 'Athens',
  coordinates: { latitude: 37.9838, longitude: 23.7275 },
  independence: '1830 Kingdom lineage; EU since 1981-01-01; Euro 2001 — informational',
  topMajorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  population: 10400000,
  mainLanguages: ['Greek', 'English (tourism)', 'Albanian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Athens',
  foundingLeader: 'Ioannis Kapodistrias-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU-licensed gateways; OTC alongside capital controls lifted — informational'],
  stablecoin: 'EUR stablecoins; banking sector cautions historical',
  domesticCourierServices: EU_DOMESTIC_COURIERS['GR'],
  newsOutlets: EU_NEWS_OUTLETS['GR'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['GR'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['GR'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['GR'],
  rareEarths: EU_RARE_EARTHS['GR'],
  stockExchange: 'Athens Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['GR'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['GR'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['GR'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['GR'],
}
