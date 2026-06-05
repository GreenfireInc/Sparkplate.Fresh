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

export const portugal: EuCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  capital: 'Lisbon',
  coordinates: { latitude: 38.7223, longitude: -9.1393 },
  independence: '1974 Carnation legacy republic; EU 1986; Euro — informational',
  topMajorCities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'],
  population: 10500000,
  mainLanguages: ['Portuguese', 'Miranda do Douro linguistic minority', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Lisbon',
  foundingLeader: 'António de Oliveira Salazar Estado Novo-era contrast — informational',
  currentLeader: 'President Marcelo Rebelo de Sousa — verify; Prime Minister Luís Montenegro — verify',
  cryptocurrencyExchanges: ['European brokers; Portuguese CMVM supervision MiCA-era'],
  stablecoin: 'EUR stablecoins; digital euro preparedness',
  domesticCourierServices: EU_DOMESTIC_COURIERS['PT'],
  newsOutlets: EU_NEWS_OUTLETS['PT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['PT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['PT'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['PT'],
  rareEarths: EU_RARE_EARTHS['PT'],
  stockExchange: 'Euronext Lisbon',
  bondMarkets: EU_BOND_MARKETS['PT'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['PT'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['PT'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['PT'],
}
