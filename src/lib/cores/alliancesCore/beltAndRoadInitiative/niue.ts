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
export const niue: BeltAndRoadInitiativeCountry = {
  name: 'Niue',
  iso3166Alpha2: 'NU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Alofi',
  coordinates: { latitude: -19.03333333, longitude: -169.86666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Alofi', 'Niue — city 2 (verify)', 'Niue — city 3 (verify)', 'Niue — city 4 (verify)', 'Niue — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1681,
  mainLanguages: [ 'English', 'Niuean', 'Regional languages' ],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'UTC-11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['NU'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['NU'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['NU'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['NU'],
  newsOutlets: BRI_NEWS_OUTLETS['NU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['NU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['NU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['NU'],
  rareEarths: BRI_RARE_EARTHS['NU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['NU'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['NU'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['NU'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['NU'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['NU'],
}
