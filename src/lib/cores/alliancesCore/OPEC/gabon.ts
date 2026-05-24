import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const gabon: OpecCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence:
    '1960 independence from France; crude-dependent fiscal model; OPEC member (rejoined Jul 2016 after 1995 withdrawal) — informational',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2400000,
  mainLanguages: ['French', 'Fang', 'Myene / regional Bantu'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: "Léon M'ba / Omar Bongo reference (long-ruling continuity — informational)",
  currentLeader: 'President Brice Oligui Nguema — verify (transitional post-2023 cycle)',
  cryptocurrencyExchanges: ['Regional OTC; Gabonese banking USD clearance — informational'],
  stablecoin: 'XAF EUR peg; informal USDT — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['GA'],
  newsOutlets: OPEC_NEWS_OUTLETS['GA'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['GA'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM context sub-regional — informational)',
}
