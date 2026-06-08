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
export const tonga: BeltAndRoadInitiativeCountry = {
  name: 'Tonga',
  iso3166Alpha2: 'TO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Nuku\'alofa',
  coordinates: { latitude: -20, longitude: -175 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Nuku\'alofa', 'Tonga — city 2 (verify)', 'Tonga — city 3 (verify)', 'Tonga — city 4 (verify)', 'Tonga — city 5 (verify)' ] as [string, string, string, string, string],
  population: 100179,
  mainLanguages: [ 'English', 'Tongan', 'Regional languages' ],
  currency: 'Tongan paʻanga (TOP)',
  timezone: 'UTC+13:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TO'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['TO'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['TO'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['TO'],
  newsOutlets: BRI_NEWS_OUTLETS['TO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TO'],
  rareEarths: BRI_RARE_EARTHS['TO'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['TO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['TO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TO'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['TO'],
}
