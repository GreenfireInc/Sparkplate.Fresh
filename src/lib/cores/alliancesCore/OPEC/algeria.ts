import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OPEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OPEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'
import { OPEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OPEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OPEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const algeria: OpecCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  capital: 'Algiers',
  coordinates: { latitude: 36.7538, longitude: 3.0588 },
  independence:
    '1962 independence from France; SONATRACH-era hydrocarbon sovereignty; OPEC member since 1969 — informational',
  topMajorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'],
  population: 45800000,
  mainLanguages: ['Arabic', 'Tamazight / Berber co-official varieties', 'French'],
  currency: 'Algerian dinar (DZD)',
  timezone: 'Africa/Algiers',
  foundingLeader: 'Ahmed Ben Bella / Houari Boumédiène reference (state-building hydrocarbon era — informational)',
  currentLeader: 'President Abdelmadjid Tebboune — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Official stance historically restrictive; regional OTC narratives — informational'],
  stablecoin: 'DZD informal USD pricing; sanctioned-screening overlays — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['DZ'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['DZ'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['DZ'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['DZ'],
  newsOutlets: OPEC_NEWS_OUTLETS['DZ'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['DZ'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['DZ'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['DZ'],
  rareEarths: OPEC_RARE_EARTHS['DZ'],
  stockExchange: 'Algerian equities segment (regulated bourse liquidity limited — informational)',
  bondMarkets: OPEC_BOND_MARKETS['DZ'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['DZ'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['DZ'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['DZ'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['DZ'],
}
