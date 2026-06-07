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
export const estonia: BeltAndRoadInitiativeCountry = {
  name: 'Estonia',
  iso3166Alpha2: 'EE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tallinn',
  coordinates: { latitude: 59, longitude: 26 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tallinn', 'Estonia — city 2 (verify)', 'Estonia — city 3 (verify)', 'Estonia — city 4 (verify)', 'Estonia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1369995,
  mainLanguages: [ 'Estonian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['EE'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['EE'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['EE'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['EE'],
  newsOutlets: BRI_NEWS_OUTLETS['EE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['EE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['EE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['EE'],
  rareEarths: BRI_RARE_EARTHS['EE'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['EE'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['EE'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['EE'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['EE'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['EE'],
}
