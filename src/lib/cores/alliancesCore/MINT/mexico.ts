import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { MINT_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { MINT_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { MINT_NEWS_OUTLETS } from './newsOutletsByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MINT_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MINT_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MINT_RARE_EARTHS } from './rareEarthsByIso'
import { MINT_BOND_MARKETS } from './bondMarketsByIso'
import { MINT_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { MINT_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { MINT_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { MINT_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const mexico: MintCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 Mexican independence from Spain consolidated; bicentennial federation; large emerging-consumer market MINT acronym context — informational',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 130000000,
  mainLanguages: ['Spanish', 'Nahuatl / indigenous languages', 'English (near-border business)'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader:
    'Miguel Hidalgo y Costilla insurgency era; Porfirio Díaz / modern state references — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'Mexico CNBV fintech-registration evolution — informational'],
  stablecoin: 'MXN fiat-backed issuance pilots vs informal USDT — informational',
  domesticCourierServices: MINT_DOMESTIC_COURIERS['MX'],
  domesticPostService: MINT_DOMESTIC_POST_SERVICES['MX'],
  nationalBankingInstitutions: MINT_NATIONAL_BANKING_INSTITUTIONS['MX'],
  corporationFormationOffice: MINT_CORPORATION_FORMATION_OFFICES['MX'],
  newsOutlets: MINT_NEWS_OUTLETS['MX'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: MINT_MAIN_EXPORT_COMMODITIES['MX'],
  mainExportedElements: MINT_MAIN_EXPORTED_ELEMENTS['MX'],
  rareEarths: MINT_RARE_EARTHS['MX'],
  stockExchange: 'Mexican Stock Exchange BMV Bolsa Mexicana de Valores',
  bondMarkets: MINT_BOND_MARKETS['MX'],
  mainInternationalAirport: MINT_MAIN_INTERNATIONAL_AIRPORTS['MX'],
  mainInternationalSeaport: MINT_MAIN_INTERNATIONAL_SEAPORTS['MX'],
  intellectualPropertyDepartments: MINT_INTELLECTUAL_PROPERTY_DEPARTMENTS['MX'],
  securitiesExchangeCommission: MINT_SECURITIES_EXCHANGE_COMMISSIONS['MX'],
}
