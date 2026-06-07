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
export const malawi: BeltAndRoadInitiativeCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'] as [string, string, string, string, string],
  population: 20734262,
  mainLanguages: [ 'English', 'Chewa', 'Regional languages' ],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Hastings Banda',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MW'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['MW'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['MW'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['MW'],
  newsOutlets: BRI_NEWS_OUTLETS['MW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: BRI_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  bondMarkets: BRI_BOND_MARKETS['MW'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['MW'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['MW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['MW'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['MW'],
}
