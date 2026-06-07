import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const jordan: BeltAndRoadInitiativeCountry = {
  name: 'Jordan',
  iso3166Alpha2: 'JO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Amman',
  coordinates: { latitude: 31.9539, longitude: 35.9106 },
  independence: '1946-05-25',
  topMajorCities: ['Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Wadi al-Sir'] as [string, string, string, string, string],
  population: 11734000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Jordanian dinar (JOD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Abdullah I (King)',
  currentLeader: 'Abdullah II (King); Jafar Hassan (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'Rain (regional)'],
  stablecoin: 'USDT / USDC informal; central bank cautious',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['JO'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['JO'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['JO'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['JO'],
  newsOutlets: BRI_NEWS_OUTLETS['JO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['JO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['JO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['JO'],
  rareEarths: BRI_RARE_EARTHS['JO'],
  stockExchange: 'Amman Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['JO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['JO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['JO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['JO'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['JO'],
}
