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
export const moldova: BeltAndRoadInitiativeCountry = {
  name: 'Moldova',
  iso3166Alpha2: 'MD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Chișinău',
  coordinates: { latitude: 47, longitude: 29 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Chișinău', 'Moldova — city 2 (verify)', 'Moldova — city 3 (verify)', 'Moldova — city 4 (verify)', 'Moldova — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2749076,
  mainLanguages: [ 'Romanian', 'English', 'Regional languages' ],
  currency: 'Moldovan leu (MDL)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MD'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['MD'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['MD'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['MD'],
  newsOutlets: BRI_NEWS_OUTLETS['MD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MD'],
  rareEarths: BRI_RARE_EARTHS['MD'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['MD'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['MD'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['MD'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['MD'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['MD'],
}
