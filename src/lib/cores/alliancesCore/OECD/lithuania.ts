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

export const lithuania: OecdCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  capital: 'Vilnius',
  coordinates: { latitude: 54.6872, longitude: 25.2797 },
  independence:
    '1990 Restoration; EU 2004; euro participant; OECD member since Jul 2018 — informational',
  topMajorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'],
  population: 2800000,
  mainLanguages: ['Lithuanian', 'Russian', 'Polish (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vilnius',
  foundingLeader: 'Vytautas Landsbergis (Sąjūdis reference)',
  currentLeader: 'President Gitanas Nausėda; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU onboarding; Baltic fintech — informational'],
  stablecoin: 'EUR stablecoins; digital euro preparedness — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['LT'],
  newsOutlets: OECD_NEWS_OUTLETS['LT'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['LT'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['LT'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['LT'],
  rareEarths: OECD_RARE_EARTHS['LT'],
  stockExchange: 'Nasdaq Vilnius',
  bondMarkets: OECD_BOND_MARKETS['LT'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['LT'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['LT'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['LT'],
}
