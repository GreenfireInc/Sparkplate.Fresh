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
export const malta: BeltAndRoadInitiativeCountry = {
  name: 'Malta',
  iso3166Alpha2: 'MT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Valletta',
  coordinates: { latitude: 35.9375, longitude: 14.3754 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Valletta', 'Malta — city 2 (verify)', 'Malta — city 3 (verify)', 'Malta — city 4 (verify)', 'Malta — city 5 (verify)' ] as [string, string, string, string, string],
  population: 574250,
  mainLanguages: [ 'English', 'Maltese', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MT'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['MT'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['MT'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['MT'],
  newsOutlets: BRI_NEWS_OUTLETS['MT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MT'],
  rareEarths: BRI_RARE_EARTHS['MT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['MT'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['MT'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['MT'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['MT'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['MT'],
}
