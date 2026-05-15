import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

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
  stockExchange: 'Madagascar Stock Exchange (thin listings — informational)',
}
