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
export const samoa: BeltAndRoadInitiativeCountry = {
  name: 'Samoa',
  iso3166Alpha2: 'WS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Apia',
  coordinates: { latitude: -13.58333333, longitude: -172.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Apia', 'Samoa — city 2 (verify)', 'Samoa — city 3 (verify)', 'Samoa — city 4 (verify)', 'Samoa — city 5 (verify)' ] as [string, string, string, string, string],
  population: 205557,
  mainLanguages: [ 'English', 'Samoan', 'Regional languages' ],
  currency: 'Samoan tālā (WST)',
  timezone: 'UTC+13:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['WS'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['WS'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['WS'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['WS'],
  newsOutlets: BRI_NEWS_OUTLETS['WS'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['WS'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['WS'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['WS'],
  rareEarths: BRI_RARE_EARTHS['WS'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['WS'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['WS'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['WS'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['WS'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['WS'],
}
