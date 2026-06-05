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

export const ghana: CensadCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34400000,
  mainLanguages: ['English', 'Asante Twi', 'Fante'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah (first Prime Minister)',
  currentLeader: 'President John Mahama — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance context', 'Licensed VASP evolution'],
  stablecoin: 'Pilot eCedi (CBDC narrative); USDT regional',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GH'],
  newsOutlets: CENSAD_NEWS_OUTLETS['GH'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['GH'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['GH'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['GH'],
  rareEarths: CENSAD_RARE_EARTHS['GH'],
  stockExchange: 'Ghana Stock Exchange',
  bondMarkets: CENSAD_BOND_MARKETS['GH'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['GH'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['GH'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['GH'],
}
