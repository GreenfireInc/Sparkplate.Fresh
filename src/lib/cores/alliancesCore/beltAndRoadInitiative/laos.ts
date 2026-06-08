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
export const laos: BeltAndRoadInitiativeCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vientiane',
  coordinates: { latitude: 18, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vientiane', 'Laos — city 2 (verify)', 'Laos — city 3 (verify)', 'Laos — city 4 (verify)', 'Laos — city 5 (verify)' ] as [string, string, string, string, string],
  population: 7647000,
  mainLanguages: [ 'Lao', 'English', 'Regional languages' ],
  currency: 'Lao kip (LAK)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LA'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['LA'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['LA'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['LA'],
  newsOutlets: BRI_NEWS_OUTLETS['LA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LA'],
  rareEarths: BRI_RARE_EARTHS['LA'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LA'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LA'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LA'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['LA'],
}
