import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IGAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IGAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IGAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IGAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IGAD_RARE_EARTHS } from './rareEarthsByIso'
import { IGAD_BOND_MARKETS } from './bondMarketsByIso'
import { IGAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IGAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IGAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const somalia: IgadCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence:
    '1960-07-01 Republic formation; IGADD founding state Jan 1986; federal Somalia restoration narrative — informational',
  topMajorCities: ['Mogadishu', 'Bosaso', 'Kismayo', 'Baidoa', 'Garowe'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian legacy / English education'],
  currency: 'Somali shilling (SOS central bank efforts; USD widespread informal — informational)',
  timezone: 'Africa/Mogadishu',
  foundingLeader:
    'Siad Barre–era territorial state / post-2000 transitional-federal roadmap — informational',
  currentLeader: 'President Hassan Sheikh Mohamud — verify; Prime Minister — verify clan-federal bargains',
  cryptocurrencyExchanges: ['Hargeisa OTC informal; Mogadishu mobile-money predominance — informational'],
  stablecoin: 'USD/USDT hawala overlays; SOS thin banknote supply — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['SO'],
  domesticPostService: IGAD_DOMESTIC_POST_SERVICES['SO'],
  nationalBankingInstitutions: IGAD_NATIONAL_BANKING_INSTITUTIONS['SO'],
  corporationFormationOffice: IGAD_CORPORATION_FORMATION_OFFICES['SO'],
  newsOutlets: IGAD_NEWS_OUTLETS['SO'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: IGAD_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: IGAD_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: IGAD_RARE_EARTHS['SO'],
  stockExchange: 'No substantive national equities exchange consolidated (subsidiary regional plans — informational)',
  bondMarkets: IGAD_BOND_MARKETS['SO'],
  mainInternationalAirport: IGAD_MAIN_INTERNATIONAL_AIRPORTS['SO'],
  mainInternationalSeaport: IGAD_MAIN_INTERNATIONAL_SEAPORTS['SO'],
  intellectualPropertyDepartments: IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['SO'],
  securitiesExchangeCommission: IGAD_SECURITIES_EXCHANGE_COMMISSIONS['SO'],
}
