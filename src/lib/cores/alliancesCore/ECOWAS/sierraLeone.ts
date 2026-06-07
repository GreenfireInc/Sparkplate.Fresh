import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECOWAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECOWAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECOWAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const sierraLeone: EcowasCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'],
  population: 8500000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai (first Prime Minister)',
  currentLeader: 'President Julius Maada Bio — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['SL'],
  domesticPostService: ECOWAS_DOMESTIC_POST_SERVICES['SL'],
  nationalBankingInstitutions: ECOWAS_NATIONAL_BANKING_INSTITUTIONS['SL'],
  corporationFormationOffice: ECOWAS_CORPORATION_FORMATION_OFFICES['SL'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['SL'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['SL'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['SL'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['SL'],
  rareEarths: ECOWAS_RARE_EARTHS['SL'],
  stockExchange: 'Sierra Leone Stock Exchange',
  bondMarkets: ECOWAS_BOND_MARKETS['SL'],
  intellectualPropertyDepartments: ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['SL'],

  securitiesExchangeCommission: ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS['SL'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['SL'],
  mainInternationalSeaport: ECOWAS_MAIN_INTERNATIONAL_SEAPORTS['SL'],
}
