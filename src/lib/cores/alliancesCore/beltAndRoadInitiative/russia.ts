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
export const russia: BeltAndRoadInitiativeCountry = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Moscow',
  coordinates: { latitude: 60, longitude: 100 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Moscow', 'Russia — city 2 (verify)', 'Russia — city 3 (verify)', 'Russia — city 4 (verify)', 'Russia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 146028325,
  mainLanguages: [ 'Russian', 'English', 'Regional languages' ],
  currency: 'Russian ruble (RUB)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['RU'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['RU'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['RU'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['RU'],
  newsOutlets: BRI_NEWS_OUTLETS['RU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['RU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['RU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['RU'],
  rareEarths: BRI_RARE_EARTHS['RU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['RU'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['RU'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['RU'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['RU'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['RU'],
}
