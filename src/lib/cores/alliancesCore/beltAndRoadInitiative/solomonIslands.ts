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
export const solomonIslands: BeltAndRoadInitiativeCountry = {
  name: 'Solomon Islands',
  iso3166Alpha2: 'SB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Honiara',
  coordinates: { latitude: -8, longitude: 159 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Honiara', 'Solomon Islands — city 2 (verify)', 'Solomon Islands — city 3 (verify)', 'Solomon Islands — city 4 (verify)', 'Solomon Islands — city 5 (verify)' ] as [string, string, string, string, string],
  population: 750325,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Solomon Islands dollar (SBD)',
  timezone: 'UTC+11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SB'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['SB'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['SB'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['SB'],
  newsOutlets: BRI_NEWS_OUTLETS['SB'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SB'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SB'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SB'],
  rareEarths: BRI_RARE_EARTHS['SB'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SB'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SB'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SB'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SB'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['SB'],
}
