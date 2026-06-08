import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { NATO_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { NATO_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { NATO_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const turkey: NatoCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic post-Ottoman; NATO Ally since Feb 1952 (Alliance southern flank pillar — informational)',
  topMajorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  population: 85000000,
  mainLanguages: ['Turkish', 'Kurdish (community)', 'Arabic (border regions)'],
  currency: 'Turkish lira (TRY)',
  timezone: 'Europe/Istanbul',
  foundingLeader: 'Mustafa Kemal Atatürk — informational',
  currentLeader:
    'President Recep Tayyip Erdoğan — verify; Vice President — verify cabinet',
  cryptocurrencyExchanges: ['BtcTurk', 'Paribu', 'MASAK registration — informational'],
  stablecoin: 'TRY volatility; USD-stable informal — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['TR'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['TR'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['TR'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['TR'],
  newsOutlets: NATO_NEWS_OUTLETS['TR'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['TR'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['TR'],
  rareEarths: NATO_RARE_EARTHS['TR'],
  stockExchange: 'Borsa Istanbul (BİST)',
  bondMarkets: NATO_BOND_MARKETS['TR'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['TR'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['TR'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['TR'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['TR'],
}
