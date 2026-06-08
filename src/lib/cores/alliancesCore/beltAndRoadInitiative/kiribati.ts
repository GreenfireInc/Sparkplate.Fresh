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
export const kiribati: BeltAndRoadInitiativeCountry = {
  name: 'Kiribati',
  iso3166Alpha2: 'KI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'South Tarawa',
  coordinates: { latitude: 1.41666666, longitude: 173 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'South Tarawa', 'Kiribati — city 2 (verify)', 'Kiribati — city 3 (verify)', 'Kiribati — city 4 (verify)', 'Kiribati — city 5 (verify)' ] as [string, string, string, string, string],
  population: 120740,
  mainLanguages: [ 'English', 'Gilbertese', 'Regional languages' ],
  currency: 'Australian dollar (AUD)',
  timezone: 'UTC+12:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KI'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['KI'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['KI'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['KI'],
  newsOutlets: BRI_NEWS_OUTLETS['KI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KI'],
  rareEarths: BRI_RARE_EARTHS['KI'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['KI'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['KI'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['KI'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['KI'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['KI'],
}
