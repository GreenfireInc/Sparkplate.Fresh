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

export const sriLanka: IoraCountry = {
  name: 'Sri Lanka',
  iso3166Alpha2: 'LK',
  capital: 'Sri Jayewardenepura Kotte (legislative); Colombo commercial/administrative hub',
  coordinates: { latitude: 6.9271, longitude: 79.8612 },
  independence:
    '1948 Dominion to republic lineage; southern Bay of Bengal / Arabian Sea littoral trade; IORA member — informational',
  topMajorCities: ['Colombo', 'Dehiwala-Mount Lavinia', 'Maharagama', 'Jaffna', 'Kandy'],
  population: 22000000,
  mainLanguages: ['Sinhala', 'Tamil', 'English'],
  currency: 'Sri Lankan rupee (LKR; post-2022 macro distress episodes — informational)',
  timezone: 'Asia/Colombo',
  foundingLeader: 'D.S. Senanayake Dominion reference — informational',
  currentLeader: 'President Anura Kumara Dissanayake — verify coalition',
  cryptocurrencyExchanges: ['CB restrictive retail screens; OTC informal diaspora rails — informational'],
  stablecoin: 'USD informal dollarisation overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['LK'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['LK'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['LK'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['LK'],
  newsOutlets: IORA_NEWS_OUTLETS['LK'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['LK'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['LK'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['LK'],
  rareEarths: IORA_RARE_EARTHS['LK'],
  stockExchange: 'Colombo Stock Exchange (CSE)',
  bondMarkets: IORA_BOND_MARKETS['LK'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['LK'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['LK'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['LK'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['LK'],
}
