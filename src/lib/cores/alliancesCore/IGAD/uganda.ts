import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const uganda: IgadCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence:
    '1962-10-09 independence from UK protectorate; IGADD founding state Jan 1986; Great Lakes stabilization dialogue host — informational',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Makindye', 'Mbarara'],
  population: 48000000,
  mainLanguages: ['English', 'Swahili', 'Luganda / regional Bantu / Nilotic'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote independence reference; Museveni NRM post-1986 state — informational',
  currentLeader: 'President Yoweri Museveni — verify',
  cryptocurrencyExchanges: ['Binance informal P2P seasonal blocks; Blockchain Association advocacy — informational'],
  stablecoin: 'USDT/USDC informal settlements; Mobile Money predominant — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['UG'],
  newsOutlets: IGAD_NEWS_OUTLETS['UG'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['UG'],
  stockExchange: 'Uganda Securities Exchange (USE, thin listings — informational)',
}
