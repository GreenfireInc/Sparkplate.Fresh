import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const jordan: ArabLeagueCountry = {
  name: 'Jordan',
  iso3166Alpha2: 'JO',
  arabLeagueStatus: 'member',
  capital: 'Amman',
  coordinates: { latitude: 31.9539, longitude: 35.9106 },
  independence: '1946-05-25',
  topMajorCities: ['Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Wadi al-Sir'],
  population: 11000000,
  mainLanguages: ['Arabic', 'English', 'Circassian (minority)'],
  currency: 'Jordanian dinar (JOD)',
  timezone: 'Asia/Amman',
  foundingLeader: 'Abdullah I (King)',
  currentLeader: 'Abdullah II (King); Jafar Hassan (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'Rain (regional)'],
  stablecoin: 'USDT / USDC informal; central bank cautious',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['JO'],
  domesticPostService: ARAB_LEAGUE_DOMESTIC_POST_SERVICES['JO'],
  nationalBankingInstitutions: ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS['JO'],
  corporationFormationOffice: ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES['JO'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['JO'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['JO'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['JO'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['JO'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['JO'],
  stockExchange: 'Amman Stock Exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['JO'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['JO'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['JO'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['JO'],
  mainInternationalSeaport: ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS['JO'],
}
