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
export const timorLeste: BeltAndRoadInitiativeCountry = {
  name: 'Timor-Leste',
  iso3166Alpha2: 'TL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dili',
  coordinates: { latitude: -8.83333333, longitude: 125.91666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Dili', 'Timor-Leste — city 2 (verify)', 'Timor-Leste — city 3 (verify)', 'Timor-Leste — city 4 (verify)', 'Timor-Leste — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1391221,
  mainLanguages: [ 'Portuguese', 'Tetum', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC+09:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TL'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['TL'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['TL'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['TL'],
  newsOutlets: BRI_NEWS_OUTLETS['TL'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TL'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TL'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TL'],
  rareEarths: BRI_RARE_EARTHS['TL'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TL'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['TL'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['TL'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TL'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['TL'],
}
