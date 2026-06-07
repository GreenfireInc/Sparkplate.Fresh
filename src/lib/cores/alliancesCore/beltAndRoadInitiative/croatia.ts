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
export const croatia: BeltAndRoadInitiativeCountry = {
  name: 'Croatia',
  iso3166Alpha2: 'HR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Zagreb',
  coordinates: { latitude: 45.16666666, longitude: 15.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Zagreb', 'Croatia — city 2 (verify)', 'Croatia — city 3 (verify)', 'Croatia — city 4 (verify)', 'Croatia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3866233,
  mainLanguages: [ 'Croatian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['HR'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['HR'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['HR'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['HR'],
  newsOutlets: BRI_NEWS_OUTLETS['HR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['HR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['HR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['HR'],
  rareEarths: BRI_RARE_EARTHS['HR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['HR'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['HR'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['HR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['HR'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['HR'],
}
