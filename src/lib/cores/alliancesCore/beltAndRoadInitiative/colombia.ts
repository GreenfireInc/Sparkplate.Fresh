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
export const colombia: BeltAndRoadInitiativeCountry = {
  name: 'Colombia',
  iso3166Alpha2: 'CO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bogotá',
  coordinates: { latitude: 4, longitude: -72 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bogotá', 'Colombia — city 2 (verify)', 'Colombia — city 3 (verify)', 'Colombia — city 4 (verify)', 'Colombia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 53057212,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Colombian peso (COP)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CO'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['CO'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['CO'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['CO'],
  newsOutlets: BRI_NEWS_OUTLETS['CO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CO'],
  rareEarths: BRI_RARE_EARTHS['CO'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CO'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['CO'],
}
