import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const timorLeste: AseanCountry = {
  name: 'Timor-Leste',
  iso3166Alpha2: 'TL',
  capital: 'Dili',
  coordinates: { latitude: -8.5569, longitude: 125.5618 },
  independence:
    '2002 sovereign state UN membership; ASEAN accession roadmap in progress (observer / in-principle decisions — verify against latest Summit communiqués)',
  topMajorCities: ['Dili', 'Maliana', 'Suai', 'Liquiça', 'Baucau'],
  population: 1350000,
  mainLanguages: ['Tetum', 'Portuguese', 'Bahasa Indonesian / English (government / trade)'],
  currency: 'United States dollar (USD official); Timorese escudo coins ceremonial — informational',
  timezone: 'Asia/Dili',
  foundingLeader: 'Xanana Gusmão resistance-to-state continuity — informational',
  currentLeader: 'President José Ramos-Horta — verify; Prime Minister Xanana Gusmão — verify',
  cryptocurrencyExchanges: ['Thin formal licensing; humanitarian remittance OTC — informational'],
  stablecoin: 'USD cash economy predominant; informal digital overlays — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['TL'],
  newsOutlets: ASEAN_NEWS_OUTLETS['TL'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['TL'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['TL'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['TL'],
  rareEarths: ASEAN_RARE_EARTHS['TL'],
  stockExchange: 'No substantive national equities exchange consolidated — informational',
  bondMarkets: ASEAN_BOND_MARKETS['TL'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['TL'],
}
