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
export const elSalvador: BeltAndRoadInitiativeCountry = {
  name: 'El Salvador',
  iso3166Alpha2: 'SV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'San Salvador',
  coordinates: { latitude: 13.83333333, longitude: -88.91666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'San Salvador', 'El Salvador — city 2 (verify)', 'El Salvador — city 3 (verify)', 'El Salvador — city 4 (verify)', 'El Salvador — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6029976,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SV'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['SV'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['SV'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['SV'],
  newsOutlets: BRI_NEWS_OUTLETS['SV'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SV'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SV'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SV'],
  rareEarths: BRI_RARE_EARTHS['SV'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SV'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SV'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SV'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SV'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['SV'],
}
