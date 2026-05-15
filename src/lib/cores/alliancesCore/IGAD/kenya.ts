import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kenya: IgadCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2921, longitude: 36.8219 },
  independence:
    '1963-12-12 independence from UK; IGADD founding state Jan 1986; East African Community overlap — informational',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu / Luhya / regional Bantu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (independence); Daniel arap Moi IGADD-era continuity — informational',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['BitPesa / Yellow Card regional; Capital Markets Authority ICO guidance — informational'],
  stablecoin: 'KES-referenced pilots; informal USDT overlays — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['KE'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
}
