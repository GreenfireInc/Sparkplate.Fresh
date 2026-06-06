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

export const iran: IoraCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  capital: 'Tehran',
  coordinates: { latitude: 35.6892, longitude: 51.389 },
  independence:
    '1979 Islamic Republic continuity; Hormuz Gulf / Arabian Sea littoral stakeholder; IORA member — informational',
  topMajorCities: ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Shiraz'],
  population: 89000000,
  mainLanguages: ['Persian (Farsi)', 'Azerbaijani regional', 'Kurdish regional'],
  currency: 'Iranian rial (IRR parallel FX layers — informational)',
  timezone: 'Asia/Tehran',
  foundingLeader: 'Mossadegh oil-nationalisation narrative reference — informational',
  currentLeader: 'Supreme Leader Ali Khamenei; President — verify',
  cryptocurrencyExchanges: ['Sanction-screened mining / informal trade — informational'],
  stablecoin: 'USD informal parallel rate settlement — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['IR'],
  newsOutlets: IORA_NEWS_OUTLETS['IR'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['IR'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['IR'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['IR'],
  rareEarths: IORA_RARE_EARTHS['IR'],
  stockExchange: 'Tehran Stock Exchange',
  bondMarkets: IORA_BOND_MARKETS['IR'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['IR'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['IR'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['IR'],
}
