import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const oman: IoraCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  capital: 'Muscat',
  coordinates: { latitude: 23.5859, longitude: 58.4059 },
  independence:
    'Sultanate continuity post-British withdrawal; Strait of Hormuz / Arabian Sea Indian Ocean littoral; IORA member GCC overlap — informational',
  topMajorCities: ['Muscat', 'Salalah', 'Seeb', 'Sohar', 'Nizwa'],
  population: 4800000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Swahili communities'],
  currency: 'Omani rial (OMR; USD-pegged de facto)',
  timezone: 'Asia/Muscat',
  foundingLeader: 'Sultan Qaboos modernization reference — informational',
  currentLeader: 'Sultan Haitham bin Tariq — verify',
  cryptocurrencyExchanges: ['CBO licensing evolution narratives — informational'],
  stablecoin: 'OMR dollar peg overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['OM'],
  newsOutlets: IORA_NEWS_OUTLETS['OM'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['OM'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['OM'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['OM'],
  rareEarths: IORA_RARE_EARTHS['OM'],
  stockExchange: 'Muscat Stock Exchange',
  bondMarkets: IORA_BOND_MARKETS['OM'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['OM'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['OM'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['OM'],
}
