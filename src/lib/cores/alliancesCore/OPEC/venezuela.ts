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

export const venezuela: OpecCountry = {
  name: 'Venezuela',
  iso3166Alpha2: 'VE',
  capital: 'Caracas',
  coordinates: { latitude: 10.4806, longitude: -66.9036 },
  independence:
    '1811 independence lineage Bolivarian narratives; PDVSA heavy-crude prominence; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'],
  population: 28500000,
  mainLanguages: ['Spanish', 'Indigenous languages (regional)', 'Portuguese (border communities)'],
  currency:
    'Venezuelan bolívar (VES multiple redenominations); informal USD pervasive — informational',
  timezone: 'America/Caracas',
  foundingLeader:
    'Juan Pablo Pérez Alfonzo hydrocarbon nationalism reference — informational',
  currentLeader: 'President Nicolás Maduro — verify international recognition nuances',
  cryptocurrencyExchanges: ['Petro state token controversies; P2P mining informal — informational'],
  stablecoin: 'USD/USDT predominant retail settlement overlays — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['VE'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['VE'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['VE'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['VE'],
  newsOutlets: OPEC_NEWS_OUTLETS['VE'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['VE'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['VE'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['VE'],
  rareEarths: OPEC_RARE_EARTHS['VE'],
  stockExchange: 'Bolsa de Valores de Caracas (thin vs macro distress — informational)',
  bondMarkets: OPEC_BOND_MARKETS['VE'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['VE'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['VE'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['VE'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['VE'],
}
