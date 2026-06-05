import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const portugal: OecdCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  capital: 'Lisbon',
  coordinates: { latitude: 38.7223, longitude: -9.1393 },
  independence:
    '1974 Carnation republic legacy; EU since 1986; euro participant; OECD founding member Aug 1961 — informational',
  topMajorCities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'],
  population: 10500000,
  mainLanguages: ['Portuguese', 'Miranda do Douro minority', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Lisbon',
  foundingLeader: 'Salazar Estado Novo contrast; Mário Soares democratic transition reference — informational',
  currentLeader: 'President Marcelo Rebelo de Sousa — verify; Prime Minister Luís Montenegro — verify',
  cryptocurrencyExchanges: ['European brokers; CMVM supervision MiCA-era — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['PT'],
  newsOutlets: OECD_NEWS_OUTLETS['PT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['PT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['PT'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['PT'],
  rareEarths: OECD_RARE_EARTHS['PT'],
  stockExchange: 'Euronext Lisbon',
  bondMarkets: OECD_BOND_MARKETS['PT'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['PT'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['PT'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['PT'],
}
