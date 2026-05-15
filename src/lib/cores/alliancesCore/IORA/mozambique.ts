import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const mozambique: IoraCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence:
    '1975 independence from Portugal; Channel / Southwest Indian Ocean coastline; IORA member — informational',
  topMajorCities: ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio'],
  population: 34000000,
  mainLanguages: ['Portuguese', 'Makhuwa', 'Tsonga / Sena regional'],
  currency: 'Mozambican metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel liberation reference — informational',
  currentLeader: 'President Daniel Chapo — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Informal P2P; banking dollarisation episodes — informational'],
  stablecoin: 'USD informal settlement in extractives corridors — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique (Maputo — informational)',
}
