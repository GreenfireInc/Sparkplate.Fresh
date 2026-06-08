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

export const denmark: OecdCountry = {
  name: 'Denmark',
  iso3166Alpha2: 'DK',
  capital: 'Copenhagen',
  coordinates: { latitude: 55.6761, longitude: 12.5683 },
  independence:
    'Constitutional kingdom continuity; EU since 1973-01-01 (euro opt-out); OECD founding member Sep 1961 — informational',
  topMajorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  population: 6000000,
  mainLanguages: ['Danish', 'English', 'German'],
  currency: 'Danish krone (DKK) — ECB peg regime',
  timezone: 'Europe/Copenhagen',
  foundingLeader: 'Frederik IX-era constitutional continuity — informational',
  currentLeader: 'Monarch Frederik X; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic fintech onboarding; MiCA-aligned EU passport'],
  stablecoin: 'DKK pilots; predominant EUR/USD crypto pairs — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['DK'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['DK'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['DK'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['DK'],
  newsOutlets: OECD_NEWS_OUTLETS['DK'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['DK'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['DK'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['DK'],
  rareEarths: OECD_RARE_EARTHS['DK'],
  stockExchange: 'Nasdaq Copenhagen',
  bondMarkets: OECD_BOND_MARKETS['DK'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['DK'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['DK'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['DK'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['DK'],
}
