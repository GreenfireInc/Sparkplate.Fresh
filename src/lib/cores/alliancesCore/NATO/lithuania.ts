import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const lithuania: NatoCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  capital: 'Vilnius',
  coordinates: { latitude: 54.6872, longitude: 25.2797 },
  independence:
    '1990 Restoration; EU 2004; euro participant; NATO Ally since Mar 2004 Vilnius pillar — informational',
  topMajorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'],
  population: 2800000,
  mainLanguages: ['Lithuanian', 'Russian', 'Polish (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vilnius',
  foundingLeader: 'Vytautas Landsbergis reference — informational',
  currentLeader: 'President Gitanas Nausėda; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU onboarding; Baltic fintech — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['LT'],
  newsOutlets: NATO_NEWS_OUTLETS['LT'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['LT'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['LT'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['LT'],
  rareEarths: NATO_RARE_EARTHS['LT'],
  stockExchange: 'Nasdaq Vilnius',
  bondMarkets: NATO_BOND_MARKETS['LT'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['LT'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['LT'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['LT'],
}
