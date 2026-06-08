import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { RCEP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { RCEP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { RCEP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { RCEP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const southKorea: RcepCountry = {
  name: 'South Korea',
  iso3166Alpha2: 'KR',
  capital: 'Seoul',
  coordinates: { latitude: 37.5665, longitude: 126.978 },
  independence:
    '1948 Republic of Korea lineage; RCEP Party (deposit ratification enabling entry Feb 2022 — informational)',
  topMajorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  population: 51700000,
  mainLanguages: ['Korean', 'English education', 'Chinese / Vietnamese (resident communities)'],
  currency: 'South Korean won (KRW)',
  timezone: 'Asia/Seoul',
  foundingLeader: 'Syngman Rhee state-formation reference; Park Chung-hee industrialisation — informational',
  currentLeader:
    'President — verify (Yoon / successor electoral cycle); Prime Minister — verify',
  cryptocurrencyExchanges: ['Upbit', 'Bithumb', 'FSC VASP registrations — informational'],
  stablecoin: 'KRW won-linked experimentation thin; predominant USDT OTC — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['KR'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['KR'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['KR'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['KR'],
  newsOutlets: RCEP_NEWS_OUTLETS['KR'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['KR'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['KR'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['KR'],
  rareEarths: RCEP_RARE_EARTHS['KR'],
  stockExchange: 'Korea Exchange KOSPI/KOSDAQ',
  bondMarkets: RCEP_BOND_MARKETS['KR'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['KR'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['KR'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['KR'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['KR'],
}
