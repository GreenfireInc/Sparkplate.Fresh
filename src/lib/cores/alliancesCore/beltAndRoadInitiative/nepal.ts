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
export const nepal: BeltAndRoadInitiativeCountry = {
  name: 'Nepal',
  iso3166Alpha2: 'NP',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kathmandu',
  coordinates: { latitude: 28, longitude: 84 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kathmandu', 'Nepal — city 2 (verify)', 'Nepal — city 3 (verify)', 'Nepal — city 4 (verify)', 'Nepal — city 5 (verify)' ] as [string, string, string, string, string],
  population: 29911840,
  mainLanguages: [ 'Nepali', 'English', 'Regional languages' ],
  currency: 'Nepalese rupee (NPR)',
  timezone: 'UTC+05:45',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NP'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['NP'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['NP'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['NP'],
  newsOutlets: BRI_NEWS_OUTLETS['NP'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NP'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NP'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NP'],
  rareEarths: BRI_RARE_EARTHS['NP'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['NP'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['NP'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['NP'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['NP'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['NP'],
}
