import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const guinea: CensadCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  capital: 'Conakry',
  coordinates: { latitude: 9.537, longitude: -13.6785 },
  independence: '1958-10-02 (Republic of Guinea; post-2021 transition — verify)',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'],
  population: 14600000,
  mainLanguages: ['French', 'Fula', 'Maninka'],
  currency: 'Guinean franc (GNF)',
  timezone: 'Africa/Conakry',
  foundingLeader: 'Ahmed Sékou Touré (first president)',
  currentLeader: 'Colonel Mamadi Doumbouya-led transition — verify',
  cryptocurrencyExchanges: ['Informal OTC predominant'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GN'],
  newsOutlets: CENSAD_NEWS_OUTLETS['GN'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['GN'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['GN'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['GN'],
  rareEarths: CENSAD_RARE_EARTHS['GN'],
  stockExchange: 'Regional BRVM not primary; no major national bourse',
  bondMarkets: CENSAD_BOND_MARKETS['GN'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['GN'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['GN'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['GN'],
}
