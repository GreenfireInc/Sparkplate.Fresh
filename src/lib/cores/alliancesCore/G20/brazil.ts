import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const brazil: G20Country = {
  name: 'Brazil',
  iso3166Alpha2: 'BR',
  capital: 'Brasília',
  coordinates: { latitude: -15.7939, longitude: -47.8828 },
  independence:
    '1822-09-07 independence from Portugal; 1889 Republic; BRICS / G20 founding member (finance track 1999; 2024 Rio leaders summit host) — informational',
  topMajorCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  population: 215000000,
  mainLanguages: ['Portuguese (Brazilian)', 'English (business)', 'Spanish (border / Mercosul)'],
  currency: 'Brazilian real (BRL)',
  timezone: 'America/Sao_Paulo',
  foundingLeader:
    'Dom Pedro I (independence proclamation); Getúlio Vargas (modern industrial state reference — informational)',
  currentLeader: 'President Luiz Inácio Lula da Silva — verify',
  cryptocurrencyExchanges: ['Mercado Bitcoin', 'Foxbit', 'Bitso BR / CVM-BCB joint VASP framework — informational'],
  stablecoin: 'BRL-pegged BRZ; Drex (Real Digital) BCB-led wholesale CBDC pilots — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['BR'],
  newsOutlets: G20_NEWS_OUTLETS['BR'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['BR'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['BR'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['BR'],
  rareEarths: G20_RARE_EARTHS['BR'],
  stockExchange: 'B3 — Brasil Bolsa Balcão (São Paulo)',
  bondMarkets: G20_BOND_MARKETS['BR'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['BR'],
}
