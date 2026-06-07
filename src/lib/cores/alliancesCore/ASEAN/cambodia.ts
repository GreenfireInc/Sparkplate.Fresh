import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ASEAN_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ASEAN_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ASEAN_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ASEAN_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const cambodia: AseanCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  capital: 'Phnom Penh',
  coordinates: { latitude: 11.5564, longitude: 104.9282 },
  independence:
    '1953 independence from France; UN seat restoration 1990s; ASEAN member since Apr 1999 — informational',
  topMajorCities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Poipet'],
  population: 17200000,
  mainLanguages: ['Khmer', 'Vietnamese (border communities)', 'Cham'],
  currency: 'Cambodian riel (KHR); United States dollar widely circulating — informational',
  timezone: 'Asia/Phnom_Penh',
  foundingLeader: 'Norodom Sihanouk independence-era reference — informational',
  currentLeader: 'King Norodom Sihamoni; Prime Minister Hun Manet — verify',
  cryptocurrencyExchanges: ['NBC licensing evolution; regional P2P informal — informational'],
  stablecoin: 'USD cash economy dominant; KHR digital thin — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['KH'],
  domesticPostService: ASEAN_DOMESTIC_POST_SERVICES['KH'],
  nationalBankingInstitutions: ASEAN_NATIONAL_BANKING_INSTITUTIONS['KH'],
  corporationFormationOffice: ASEAN_CORPORATION_FORMATION_OFFICES['KH'],
  newsOutlets: ASEAN_NEWS_OUTLETS['KH'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['KH'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['KH'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['KH'],
  rareEarths: ASEAN_RARE_EARTHS['KH'],
  stockExchange: 'Cambodia Securities Exchange (CSX Phnom Penh)',
  bondMarkets: ASEAN_BOND_MARKETS['KH'],
  intellectualPropertyDepartments: ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS['KH'],
  securitiesExchangeCommission: ASEAN_SECURITIES_EXCHANGE_COMMISSIONS['KH'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['KH'],
  mainInternationalSeaport: ASEAN_MAIN_INTERNATIONAL_SEAPORTS['KH'],
}
