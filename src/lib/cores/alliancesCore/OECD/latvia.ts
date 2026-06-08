import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const latvia: OecdCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  capital: 'Riga',
  coordinates: { latitude: 56.9496, longitude: 24.1052 },
  independence:
    '1991 Restoration; EU 2004; euro participant; OECD member since Jul 2016 — informational',
  topMajorCities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'],
  population: 1870000,
  mainLanguages: ['Latvian', 'Russian', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Riga',
  foundingLeader: 'Vaira Vīķe-Freiberga (Western integration reference)',
  currentLeader: 'President Edgars Rinkēvičs; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nasdaq Baltic context; MiCA supervision — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['LV'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['LV'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['LV'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['LV'],
  newsOutlets: OECD_NEWS_OUTLETS['LV'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['LV'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['LV'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['LV'],
  rareEarths: OECD_RARE_EARTHS['LV'],
  stockExchange: 'Nasdaq Riga',
  bondMarkets: OECD_BOND_MARKETS['LV'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['LV'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['LV'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['LV'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['LV'],
}
