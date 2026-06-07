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
export const lithuania: BeltAndRoadInitiativeCountry = {
  name: 'Lithuania',
  iso3166Alpha2: 'LT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vilnius',
  coordinates: { latitude: 56, longitude: 24 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vilnius', 'Lithuania — city 2 (verify)', 'Lithuania — city 3 (verify)', 'Lithuania — city 4 (verify)', 'Lithuania — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2894886,
  mainLanguages: [ 'Lithuanian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LT'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['LT'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['LT'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['LT'],
  newsOutlets: BRI_NEWS_OUTLETS['LT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LT'],
  rareEarths: BRI_RARE_EARTHS['LT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LT'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LT'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LT'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['LT'],
}
