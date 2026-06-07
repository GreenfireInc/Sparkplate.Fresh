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
export const namibia: BeltAndRoadInitiativeCountry = {
  name: 'Namibia',
  iso3166Alpha2: 'NA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Windhoek',
  coordinates: { latitude: -22.5597, longitude: 17.0832 },
  independence: '1990-03-21',
  topMajorCities: ['Windhoek', 'Walvis Bay', 'Swakopmund', 'Rundu', 'Oshakati'] as [string, string, string, string, string],
  population: 3022401,
  mainLanguages: [ 'Afrikaans', 'German', 'English' ],
  currency: 'Namibian dollar (NAD)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Sam Nujoma',
  currentLeader: 'Netumbo Nandi-Ndaitwah (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African-linked banking',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NA'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['NA'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['NA'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['NA'],
  newsOutlets: BRI_NEWS_OUTLETS['NA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NA'],
  rareEarths: BRI_RARE_EARTHS['NA'],
  stockExchange: 'Namibia Stock Exchange (NSX)',
  bondMarkets: BRI_BOND_MARKETS['NA'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['NA'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['NA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['NA'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['NA'],
}
