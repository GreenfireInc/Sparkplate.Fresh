import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const turkey: OecdCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  capital: 'Ankara',
  coordinates: { latitude: 39.9334, longitude: 32.8597 },
  independence:
    '1923 Republic post-Ottoman; NATO member; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  population: 85000000,
  mainLanguages: ['Turkish', 'Kurdish (community)', 'Arabic (near-border regions)'],
  currency: 'Turkish lira (TRY inflation episodes — informational)',
  timezone: 'Europe/Istanbul',
  foundingLeader: 'Mustafa Kemal Atatürk (Republic founder — informational)',
  currentLeader:
    'President Recep Tayyip Erdoğan — verify; Vice President / cabinet — verify',
  cryptocurrencyExchanges: ['BtcTurk', 'Paribu', 'MASAK registration environment — informational'],
  stablecoin: 'TRY volatility; USD-stable informal rails — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['TR'],
  newsOutlets: OECD_NEWS_OUTLETS['TR'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['TR'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['TR'],
  rareEarths: OECD_RARE_EARTHS['TR'],
  stockExchange: 'Borsa Istanbul (BİST)',
  bondMarkets: OECD_BOND_MARKETS['TR'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['TR'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['TR'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['TR'],
}
