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
export const vanuatu: BeltAndRoadInitiativeCountry = {
  name: 'Vanuatu',
  iso3166Alpha2: 'VU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Port Vila',
  coordinates: { latitude: -16, longitude: 167 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Port Vila', 'Vanuatu — city 2 (verify)', 'Vanuatu — city 3 (verify)', 'Vanuatu — city 4 (verify)', 'Vanuatu — city 5 (verify)' ] as [string, string, string, string, string],
  population: 321409,
  mainLanguages: [ 'Bislama', 'English', 'French' ],
  currency: 'Vanuatu vatu (VUV)',
  timezone: 'UTC+11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['VU'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['VU'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['VU'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['VU'],
  newsOutlets: BRI_NEWS_OUTLETS['VU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['VU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['VU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['VU'],
  rareEarths: BRI_RARE_EARTHS['VU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['VU'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['VU'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['VU'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['VU'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['VU'],
}
