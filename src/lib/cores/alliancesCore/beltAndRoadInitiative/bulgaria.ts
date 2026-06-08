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
export const bulgaria: BeltAndRoadInitiativeCountry = {
  name: 'Bulgaria',
  iso3166Alpha2: 'BG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sofia',
  coordinates: { latitude: 43, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sofia', 'Bulgaria — city 2 (verify)', 'Bulgaria — city 3 (verify)', 'Bulgaria — city 4 (verify)', 'Bulgaria — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6437360,
  mainLanguages: [ 'Bulgarian', 'English', 'Regional languages' ],
  currency: 'Bulgarian lev (BGN)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BG'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['BG'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['BG'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['BG'],
  newsOutlets: BRI_NEWS_OUTLETS['BG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BG'],
  rareEarths: BRI_RARE_EARTHS['BG'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BG'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BG'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BG'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BG'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['BG'],
}
