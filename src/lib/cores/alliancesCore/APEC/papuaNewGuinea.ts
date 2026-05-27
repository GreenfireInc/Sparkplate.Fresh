import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const papuaNewGuinea: ApecCountry = {
  name: 'Papua New Guinea',
  iso3166Alpha2: 'PG',
  capital: 'Port Moresby',
  coordinates: { latitude: -9.478, longitude: 147.1509 },
  independence:
    '1975 sovereignty from Australian administration lineage; LNG / Pacific rim resources APEC frontier economy — informational',
  topMajorCities: ['Port Moresby', 'Lae', 'Madang', 'Mt Hagen', 'Goroka'],
  population: 10200000,
  mainLanguages: ['English', 'Tok Pisin', 'Hiri Motu / ~800 Indigenous languages regional'],
  currency: 'Papua New Guinean kina (PGK)',
  timezone: 'Pacific/Port_Moresby',
  foundingLeader:
    'Michael Somare Chief Minister-to-PM Panguna-era reference — informational',
  currentLeader: 'Prime Minister James Marape — verify',
  cryptocurrencyExchanges: ['Bank Papua New Guinea cautious; informal OTC — informational'],
  stablecoin: 'PGK thin; AUD informal adjacent — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['PG'],
  newsOutlets: APEC_NEWS_OUTLETS['PG'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['PG'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['PG'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['PG'],
  rareEarths: APEC_RARE_EARTHS['PG'],
  stockExchange: 'PNG National Stock Exchange (Port Moresby — thin — informational)',
  bondMarkets: APEC_BOND_MARKETS['PG'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['PG'],
}
