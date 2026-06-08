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
export const ghana: BeltAndRoadInitiativeCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'] as [string, string, string, string, string],
  population: 33742380,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'UTC',
  foundingLeader: 'Kwame Nkrumah',
  currentLeader: 'John Mahama (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Busha', 'Quidax'],
  stablecoin: 'USDT / USDC; Bank of Ghana piloting eCedi CBDC',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GH'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['GH'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['GH'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['GH'],
  newsOutlets: BRI_NEWS_OUTLETS['GH'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GH'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GH'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GH'],
  rareEarths: BRI_RARE_EARTHS['GH'],
  stockExchange: 'Ghana Stock Exchange (GSE)',
  bondMarkets: BRI_BOND_MARKETS['GH'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GH'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GH'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GH'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['GH'],
}
