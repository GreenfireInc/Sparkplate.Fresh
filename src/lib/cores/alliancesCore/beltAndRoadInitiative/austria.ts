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
export const austria: BeltAndRoadInitiativeCountry = {
  name: 'Austria',
  iso3166Alpha2: 'AT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vienna',
  coordinates: { latitude: 47.33333333, longitude: 13.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vienna', 'Austria — city 2 (verify)', 'Austria — city 3 (verify)', 'Austria — city 4 (verify)', 'Austria — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9200931,
  mainLanguages: [ 'German', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AT'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['AT'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['AT'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['AT'],
  newsOutlets: BRI_NEWS_OUTLETS['AT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AT'],
  rareEarths: BRI_RARE_EARTHS['AT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['AT'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['AT'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['AT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AT'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['AT'],
}
