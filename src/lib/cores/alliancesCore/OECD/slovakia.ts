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

export const slovakia: OecdCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  capital: 'Bratislava',
  coordinates: { latitude: 48.1486, longitude: 17.1077 },
  independence:
    '1993 Velvet Divorce Slovak line; EU 2004; euro participant; OECD member since Dec 2000 — informational',
  topMajorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra'],
  population: 5400000,
  mainLanguages: ['Slovak', 'Hungarian (minority)', 'Romani'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Bratislava',
  foundingLeader: 'Michal Kováč early republic reference — informational',
  currentLeader: 'President Peter Pellegrini; Prime Minister Robert Fico — verify',
  cryptocurrencyExchanges: ['MiCA-aligned EU CASPs Slovak retail onboarding — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['SK'],
  newsOutlets: OECD_NEWS_OUTLETS['SK'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['SK'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['SK'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['SK'],
  rareEarths: OECD_RARE_EARTHS['SK'],
  stockExchange: 'Bratislava Stock Exchange',
  bondMarkets: OECD_BOND_MARKETS['SK'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['SK'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['SK'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['SK'],
}
