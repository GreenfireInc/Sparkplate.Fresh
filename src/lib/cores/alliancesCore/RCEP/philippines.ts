import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { RCEP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const philippines: RcepCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  capital: 'Manila (Metro Manila capital region)',
  coordinates: { latitude: 14.5995, longitude: 120.9842 },
  independence:
    '1946 independence recognised; ASEAN founder; RCEP Party Jan 2022 wave — informational',
  topMajorCities: ['Manila', 'Quezon City', 'Davao City', 'Cebu City', 'Zamboanga City'],
  population: 115000000,
  mainLanguages: ['Filipino', 'English', 'Cebuano / Ilocano regional'],
  currency: 'Philippine peso (PHP)',
  timezone: 'Asia/Manila',
  foundingLeader: 'Manuel Roxas reference — informational',
  currentLeader: 'President Ferdinand Marcos Jr. — verify',
  cryptocurrencyExchanges: ['BSP VASP registry; institutional ramps — informational'],
  stablecoin: 'PHP pilots; USDT remittance overlays — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['PH'],
  newsOutlets: RCEP_NEWS_OUTLETS['PH'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['PH'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['PH'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['PH'],
  rareEarths: RCEP_RARE_EARTHS['PH'],
  stockExchange: 'Philippine Stock Exchange (PSE)',
  bondMarkets: RCEP_BOND_MARKETS['PH'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['PH'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['PH'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['PH'],
}
