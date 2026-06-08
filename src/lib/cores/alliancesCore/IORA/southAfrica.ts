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

export const southAfrica: IoraCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); legislative Cape Town; judiciary Bloemfontein — informational',
  coordinates: { latitude: -25.7479, longitude: 28.229 },
  independence:
    '1994 democratic transition post-apartheid republic; Cape Agulhas Indian Ocean access; BRICS crossover; IORA member — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  population: 62000000,
  mainLanguages: ['Zulu', 'English', 'Xhosa / Afrikaans regional'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela unity-government reference — informational',
  currentLeader: 'President Cyril Ramaphosa — verify succession politics',
  cryptocurrencyExchanges: ['Luno RSA onboarding; FSCA crypto-asset licences — informational'],
  stablecoin: 'ZAR thin digital issuance; OTC USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['ZA'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['ZA'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['ZA'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['ZA'],
  newsOutlets: IORA_NEWS_OUTLETS['ZA'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: IORA_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange JSE',
  bondMarkets: IORA_BOND_MARKETS['ZA'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['ZA'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['ZA'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZA'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['ZA'],
}
