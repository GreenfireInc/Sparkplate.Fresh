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

export const tanzania: IoraCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence:
    '1964 Tanzania union Tanganyika Zanzibar; Kilwa / Dar Indian Ocean littoral gateways; IORA member — informational',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Sukuma / Nyamwezi regional'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere unity reference — informational',
  currentLeader:
    'President Samia Suluhu Hassan — verify Zanzibar co-sovereignty politics',
  cryptocurrencyExchanges: ['BOT cautious licensing; diaspora OTC — informational'],
  stablecoin: 'USD informal TZS parallel segments — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['TZ'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['TZ'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['TZ'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['TZ'],
  newsOutlets: IORA_NEWS_OUTLETS['TZ'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: IORA_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
  bondMarkets: IORA_BOND_MARKETS['TZ'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['TZ'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['TZ'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['TZ'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['TZ'],
}
