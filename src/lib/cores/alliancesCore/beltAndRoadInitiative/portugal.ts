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
export const portugal: BeltAndRoadInitiativeCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lisbon',
  coordinates: { latitude: 39.5, longitude: -8 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Lisbon', 'Portugal — city 2 (verify)', 'Portugal — city 3 (verify)', 'Portugal — city 4 (verify)', 'Portugal — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10749635,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC-01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PT'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['PT'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['PT'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['PT'],
  newsOutlets: BRI_NEWS_OUTLETS['PT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PT'],
  rareEarths: BRI_RARE_EARTHS['PT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PT'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['PT'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['PT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['PT'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['PT'],
}
