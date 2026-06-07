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
export const latvia: BeltAndRoadInitiativeCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Riga',
  coordinates: { latitude: 57, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Riga', 'Latvia — city 2 (verify)', 'Latvia — city 3 (verify)', 'Latvia — city 4 (verify)', 'Latvia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1829000,
  mainLanguages: [ 'Latvian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LV'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['LV'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['LV'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['LV'],
  newsOutlets: BRI_NEWS_OUTLETS['LV'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LV'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LV'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LV'],
  rareEarths: BRI_RARE_EARTHS['LV'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LV'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LV'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LV'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LV'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['LV'],
}
