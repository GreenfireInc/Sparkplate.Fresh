import type { BricsCountry } from './types'
import { BRICS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRICS_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRICS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRICS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRICS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRICS_RARE_EARTHS } from './rareEarthsByIso'
import { BRICS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRICS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const russia: BricsCountry = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  bricsStatus: 'founding_member',
  capital: 'Moscow',
  coordinates: { latitude: 55.7558, longitude: 37.6173 },
  independence: '1991-12-26',
  topMajorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
  population: 144000000,
  mainLanguages: ['Russian', 'Regional co-official languages (e.g. Tatar, Bashkir — republic level)', 'English (common in business)'],
  currency: 'Russian ruble (RUB)',
  timezone: 'Europe/Moscow',
  foundingLeader: 'Boris Yeltsin (first President of the Russian Federation)',
  currentLeader: 'Vladimir Putin (President)',
  cryptocurrencyExchanges: ['Garantex', 'Regional OTC', 'P2P platforms (availability varies by jurisdiction)'],
  stablecoin: 'Digital ruble pilot; USDT/USDC used in informal crypto channels where permitted',
  domesticCourierServices: BRICS_DOMESTIC_COURIERS['RU'],
  newsOutlets: BRICS_NEWS_OUTLETS['RU'],
  notableUniversities: BRICS_NOTABLE_UNIVERSITIES['RU'],
  mainExportCommodities: BRICS_MAIN_EXPORT_COMMODITIES['RU'],
  mainExportedElements: BRICS_MAIN_EXPORTED_ELEMENTS['RU'],
  rareEarths: BRICS_RARE_EARTHS['RU'],
  stockExchange: 'Moscow Exchange (MOEX)',
  intellectualPropertyDepartments: BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS['RU'],
  securitiesExchangeCommission: BRICS_SECURITIES_EXCHANGE_COMMISSIONS['RU'],
  mainInternationalAirport: BRICS_MAIN_INTERNATIONAL_AIRPORTS['RU'],
}
