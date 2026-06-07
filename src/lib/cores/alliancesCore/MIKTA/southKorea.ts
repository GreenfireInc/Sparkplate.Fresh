import type { MiktaCountry } from './types'
import { MIKTA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MIKTA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { MIKTA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { MIKTA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { MIKTA_NEWS_OUTLETS } from './newsOutletsByIso'
import { MIKTA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MIKTA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MIKTA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MIKTA_RARE_EARTHS } from './rareEarthsByIso'
import { MIKTA_BOND_MARKETS } from './bondMarketsByIso'
import { MIKTA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { MIKTA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { MIKTA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const southKorea: MiktaCountry = {
  name: 'South Korea',
  iso3166Alpha2: 'KR',
  capital: 'Seoul',
  coordinates: { latitude: 37.5665, longitude: 126.978 },
  independence:
    '1945 liberation from Japanese rule; 1948-08-15 Republic of Korea proclaimed; armistice 1953; OECD / G20 advanced economy and MIKTA middle-power voice — informational',
  topMajorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  population: 51700000,
  mainLanguages: ['Korean', 'English (business / education)', 'Japanese / Mandarin (regional trade)'],
  currency: 'South Korean won (KRW)',
  timezone: 'Asia/Seoul',
  foundingLeader:
    'Syngman Rhee (first ROK president); Park Chung-hee industrial-era reference — informational',
  currentLeader: 'President Lee Jae-myung — verify',
  cryptocurrencyExchanges: ['Upbit', 'Bithumb', 'Coinone / Korbit FSC VASP registration regime — informational'],
  stablecoin: 'KRW-pegged issuance constrained by FSC; offshore USDT/USDC liquidity — informational',
  domesticCourierServices: MIKTA_DOMESTIC_COURIERS['KR'],
  domesticPostService: MIKTA_DOMESTIC_POST_SERVICES['KR'],
  nationalBankingInstitutions: MIKTA_NATIONAL_BANKING_INSTITUTIONS['KR'],
  corporationFormationOffice: MIKTA_CORPORATION_FORMATION_OFFICES['KR'],
  newsOutlets: MIKTA_NEWS_OUTLETS['KR'],
  notableUniversities: MIKTA_NOTABLE_UNIVERSITIES['KR'],
  mainExportCommodities: MIKTA_MAIN_EXPORT_COMMODITIES['KR'],
  mainExportedElements: MIKTA_MAIN_EXPORTED_ELEMENTS['KR'],
  rareEarths: MIKTA_RARE_EARTHS['KR'],
  stockExchange: 'Korea Exchange KRX (KOSPI / KOSDAQ)',
  bondMarkets: MIKTA_BOND_MARKETS['KR'],
  mainInternationalAirport: MIKTA_MAIN_INTERNATIONAL_AIRPORTS['KR'],
  mainInternationalSeaport: MIKTA_MAIN_INTERNATIONAL_SEAPORTS['KR'],
  intellectualPropertyDepartments: MIKTA_INTELLECTUAL_PROPERTY_DEPARTMENTS['KR'],
  securitiesExchangeCommission: MIKTA_SECURITIES_EXCHANGE_COMMISSIONS['KR'],
}
