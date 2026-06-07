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
export const micronesia: BeltAndRoadInitiativeCountry = {
  name: 'Micronesia',
  iso3166Alpha2: 'FM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Palikir',
  coordinates: { latitude: 6.91666666, longitude: 158.25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Palikir', 'Micronesia — city 2 (verify)', 'Micronesia — city 3 (verify)', 'Micronesia — city 4 (verify)', 'Micronesia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 105564,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC+10:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['FM'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['FM'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['FM'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['FM'],
  newsOutlets: BRI_NEWS_OUTLETS['FM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['FM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['FM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['FM'],
  rareEarths: BRI_RARE_EARTHS['FM'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['FM'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['FM'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['FM'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['FM'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['FM'],
}
