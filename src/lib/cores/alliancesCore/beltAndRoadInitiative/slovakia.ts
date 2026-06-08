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
export const slovakia: BeltAndRoadInitiativeCountry = {
  name: 'Slovakia',
  iso3166Alpha2: 'SK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bratislava',
  coordinates: { latitude: 48.66666666, longitude: 19.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bratislava', 'Slovakia — city 2 (verify)', 'Slovakia — city 3 (verify)', 'Slovakia — city 4 (verify)', 'Slovakia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 5413813,
  mainLanguages: [ 'Slovak', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SK'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['SK'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['SK'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['SK'],
  newsOutlets: BRI_NEWS_OUTLETS['SK'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SK'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SK'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SK'],
  rareEarths: BRI_RARE_EARTHS['SK'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SK'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SK'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SK'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SK'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['SK'],
}
