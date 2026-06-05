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

export const estonia: OecdCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  capital: 'Tallinn',
  coordinates: { latitude: 59.437, longitude: 24.7536 },
  independence:
    '1991 Restoration; EU since 2004-05-01; euro 2011; OECD member since Dec 2010 — informational',
  topMajorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'],
  population: 1370000,
  mainLanguages: ['Estonian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Tallinn',
  foundingLeader: 'Lennart Meri (early republic reference)',
  currentLeader: 'President Alar Karis; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASPs onboarding; Startup Estonia narratives — informational'],
  stablecoin: 'EUR stablecoins; digital euro preparedness — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['EE'],
  newsOutlets: OECD_NEWS_OUTLETS['EE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['EE'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['EE'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['EE'],
  rareEarths: OECD_RARE_EARTHS['EE'],
  stockExchange: 'Nasdaq Tallinn',
  bondMarkets: OECD_BOND_MARKETS['EE'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['EE'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['EE'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['EE'],
}
