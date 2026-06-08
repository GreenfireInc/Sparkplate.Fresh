import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const seychelles: IoraCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  capital: 'Victoria',
  coordinates: { latitude: -4.6796, longitude: 55.492 },
  independence:
    '1976-06-29 independent state; granular Indian Ocean archipelago fiduciary hub; IORA member — informational',
  topMajorCities: ['Victoria', 'Beau Vallon', 'Anse Royale', 'Takamaka', 'Cascade'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'French', 'English'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James R. Mancham / France-Albert René early republic coalition — informational',
  currentLeader: 'President Wavel Ramkalawan — verify',
  cryptocurrencyExchanges: ['Tourism OTC; IFC sandbox licences — informational'],
  stablecoin: 'Informal EUR/USD resort settlement — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SC'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['SC'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['SC'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['SC'],
  newsOutlets: IORA_NEWS_OUTLETS['SC'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['SC'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['SC'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['SC'],
  rareEarths: IORA_RARE_EARTHS['SC'],
  stockExchange: 'Merjex SME market / thin equities — informational',
  bondMarkets: IORA_BOND_MARKETS['SC'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['SC'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['SC'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['SC'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['SC'],
}
