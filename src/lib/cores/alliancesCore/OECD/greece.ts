import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'

export const greece: OecdCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  capital: 'Athens',
  coordinates: { latitude: 37.9838, longitude: 23.7275 },
  independence:
    '1830 Kingdom lineage; EU since 1981; euro participant; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  population: 10400000,
  mainLanguages: ['Greek', 'English (tourism)', 'Albanian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Athens',
  foundingLeader: 'Ioannis Kapodistrias-era modernization reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU gateways; OTC alongside historic capital-control episodes lifted — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['GR'],
  newsOutlets: OECD_NEWS_OUTLETS['GR'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['GR'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['GR'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['GR'],
  rareEarths: OECD_RARE_EARTHS['GR'],
  stockExchange: 'Athens Stock Exchange',
  bondMarkets: OECD_BOND_MARKETS['GR'],
}
