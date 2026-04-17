import type { BricsCountry } from './types'

export const brazil: BricsCountry = {
  name: 'Brazil',
  iso3166Alpha2: 'BR',
  bricsStatus: 'founding_member',
  capital: 'Brasília',
  coordinates: { latitude: -15.7942, longitude: -47.8822 },
  independence: '1822-09-07',
  topMajorCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  population: 215000000,
  mainLanguages: ['Portuguese', 'Brazilian Sign Language (official recognition)', 'Indigenous languages (co-official in territories)'],
  currency: 'Brazilian real (BRL)',
  timezone: 'America/Sao_Paulo',
  foundingLeader: 'Pedro I (Emperor; independence from Portugal)',
  currentLeader: 'Luiz Inácio Lula da Silva (President)',
  cryptocurrencyExchanges: ['Mercado Bitcoin', 'Foxbit', 'Binance (P2P)', 'Regional OTC'],
  stablecoin: 'BRZ and BRL-pegged tokens on some platforms; USDT/USDC widely used in crypto markets',
  stockExchange: 'B3 — Brasil Bolsa Balcão',
}
