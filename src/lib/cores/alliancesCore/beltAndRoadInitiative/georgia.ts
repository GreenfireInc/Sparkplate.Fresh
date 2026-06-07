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
export const georgia: BeltAndRoadInitiativeCountry = {
  name: 'Georgia',
  iso3166Alpha2: 'GE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tbilisi',
  coordinates: { latitude: 42, longitude: 43.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tbilisi', 'Georgia — city 2 (verify)', 'Georgia — city 3 (verify)', 'Georgia — city 4 (verify)', 'Georgia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 4000921,
  mainLanguages: [ 'Georgian', 'English', 'Regional languages' ],
  currency: 'lari (GEL)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GE'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['GE'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['GE'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['GE'],
  newsOutlets: BRI_NEWS_OUTLETS['GE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GE'],
  rareEarths: BRI_RARE_EARTHS['GE'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['GE'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GE'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GE'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GE'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['GE'],
}
