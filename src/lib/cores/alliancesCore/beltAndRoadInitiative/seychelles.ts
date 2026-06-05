import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const seychelles: BeltAndRoadInitiativeCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Victoria',
  coordinates: { latitude: -4.6232, longitude: 55.4524 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'] as [string, string, string, string, string],
  population: 122729,
  mainLanguages: [ 'Seychellois Creole', 'English', 'French' ],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'UTC+04:00',
  foundingLeader: 'James Mancham',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Binance (offshore registrations historically)', 'International brokers'],
  stablecoin: 'USDT / USDC; offshore financial services sector',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SC'],
  newsOutlets: BRI_NEWS_OUTLETS['SC'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SC'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SC'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SC'],
  rareEarths: BRI_RARE_EARTHS['SC'],
  stockExchange: 'Merjep (Seychelles Securities Exchange) — niche',
  bondMarkets: BRI_BOND_MARKETS['SC'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SC'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SC'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SC'],
}
