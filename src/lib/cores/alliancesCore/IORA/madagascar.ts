import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'

export const madagascar: IoraCountry = {
  name: 'Madagascar',
  iso3166Alpha2: 'MG',
  capital: 'Antananarivo',
  coordinates: { latitude: -18.8792, longitude: 47.5079 },
  independence:
    '1960 independence from France; southwestern Indian Ocean large island economy; IORA member — informational',
  topMajorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Toliara'],
  population: 31000000,
  mainLanguages: ['Malagasy', 'French', 'English (business minority)'],
  currency: 'Malagasy ariary (MGA)',
  timezone: 'Indian/Antananarivo',
  foundingLeader: 'Philibert Tsiranana autonomy reference — informational',
  currentLeader: 'President Andry Rajoelina — verify',
  cryptocurrencyExchanges: ['Thin OTC; artisanal gemstone economy predominates — informational'],
  stablecoin: 'EUR/USDT diaspora overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MG'],
  newsOutlets: IORA_NEWS_OUTLETS['MG'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MG'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['MG'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['MG'],
  rareEarths: IORA_RARE_EARTHS['MG'],
  stockExchange: 'Madagascar Stock Exchange (thin listings — informational)',
  bondMarkets: IORA_BOND_MARKETS['MG'],
}
